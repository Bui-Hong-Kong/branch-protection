(function (){
  'use strict';

  var async     = require("async")
    , express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express()

  // Avoid multi-minute hangs when orders/user/carts DNS or TCP fails (common in local/dev).
  var LOOKUP_MS = Number(process.env.ORDER_LOOKUP_TIMEOUT_MS || 3000)
  var CREATE_MS = Number(process.env.ORDER_CREATE_TIMEOUT_MS || 15000)

  function parseJson(body, label) {
    try {
      return typeof body === "string" ? JSON.parse(body) : body
    } catch (e) {
      throw new Error("Invalid JSON from " + label)
    }
  }

  app.get("/orders", function (req, res, next) {
    console.log("Request received with body: " + JSON.stringify(req.body));
    var logged_in = req.cookies.logged_in;
    if (!logged_in) {
      throw new Error("User not logged in.");
      return
    }

    var custId = req.session.customerId;
    request({
      url: endpoints.ordersUrl + "/orders/search/customerId?sort=date&custId=" + custId,
      timeout: LOOKUP_MS
    }, function (error, response, body) {
      if (error) {
        return next(error);
      }
      console.log("Received response: " + JSON.stringify(body));
      if (response.statusCode == 404) {
        console.log("No orders found for user: " + custId);
        return helpers.respondStatusBody(res, 201, JSON.stringify([]));
      }
      try {
        var orders = parseJson(body, "orders")._embedded.customerOrders;
        helpers.respondStatusBody(res, 201, JSON.stringify(orders || []));
      } catch (e) {
        next(e);
      }
    });
  });

  app.get("/orders/*", function (req, res, next) {
    var url = endpoints.ordersUrl + req.url.toString();
    request.get({ url: url, timeout: LOOKUP_MS }).pipe(res);
  });

  /**
   * Place order — optimized path:
   * 1) Parallel GET addresses + cards (skip serial customer round-trip; URLs are known)
   * 2) Fail fast if address/card missing
   * 3) POST orders service (which fans out payment + shipping)
   */
  app.post("/orders", function(req, res, next) {
    console.log("Request received with body: " + JSON.stringify(req.body));
    var logged_in = req.cookies.logged_in;
    if (!logged_in) {
      throw new Error("User not logged in.");
      return
    }

    var custId = req.session.customerId;
    var customerHref = endpoints.customersUrl + "/" + custId
    var addressesUrl = customerHref + "/addresses"
    var cardsUrl = customerHref + "/cards"

    async.parallel({
      address: function (callback) {
        request.get({ url: addressesUrl, timeout: LOOKUP_MS }, function (error, response, body) {
          if (error) return callback(error);
          try {
            var jsonBody = parseJson(body, "addresses");
            if (jsonBody.status_code === 500 || !jsonBody._embedded || !jsonBody._embedded.address || !jsonBody._embedded.address[0]) {
              return callback(new Error("No shipping address on file"));
            }
            callback(null, jsonBody._embedded.address[0]._links.self.href);
          } catch (e) {
            callback(e);
          }
        });
      },
      card: function (callback) {
        request.get({ url: cardsUrl, timeout: LOOKUP_MS }, function (error, response, body) {
          if (error) return callback(error);
          try {
            var jsonBody = parseJson(body, "cards");
            if (jsonBody.status_code === 500 || !jsonBody._embedded || !jsonBody._embedded.card || !jsonBody._embedded.card[0]) {
              return callback(new Error("No payment card on file"));
            }
            callback(null, jsonBody._embedded.card[0]._links.self.href);
          } catch (e) {
            callback(e);
          }
        });
      }
    }, function (err, links) {
      if (err) {
        return next(err);
      }

      var order = {
        customer: customerHref,
        address: links.address,
        card: links.card,
        items: endpoints.cartsUrl + "/" + custId + "/items"
      };

      console.log("Posting Order: " + JSON.stringify(order));
      request({
        uri: endpoints.ordersUrl + "/orders",
        method: "POST",
        json: true,
        body: order,
        timeout: CREATE_MS
      }, function (error, response, body) {
        if (error) {
          return next(error);
        }
        console.log("Order response status: " + response.statusCode);
        helpers.respondStatusBody(res, response.statusCode, JSON.stringify(body));
      });
    });
  });

  module.exports = app;
}());
