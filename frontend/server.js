var express = require("express")
  , path = require("path")
  , fs = require("fs")
  , morgan = require("morgan")
  , bodyParser = require("body-parser")
  , cookieParser = require("cookie-parser")
  , session = require("express-session")
  , config = require("./config")
  , helpers = require("./helpers")
  , cart = require("./api/cart")
  , catalogue = require("./api/catalogue")
  , orders = require("./api/orders")
  , user = require("./api/user")
  , metrics = require("./api/metrics")
  , app = express()

var isProd = process.env.NODE_ENV === "production"
var webDist = path.join(__dirname, "web", "dist")
var hasWebDist = fs.existsSync(path.join(webDist, "index.html"))

if (isProd && !hasWebDist) {
  console.error("FATAL: web/dist missing — image must run multi-stage SPA build")
  process.exit(1)
}

app.use(helpers.rewriteSlash)
app.use(metrics)

if (process.env.SESSION_REDIS) {
  console.log("Using the redis based session manager")
  app.use(session(config.session_redis))
} else {
  console.log("Using local session manager")
  app.use(session(config.session))
}

app.use(bodyParser.json())
app.use(cookieParser())
app.use(helpers.sessionMiddleware)
app.use(morgan(isProd ? "combined" : "dev", {}))

var domain = ""
process.argv.forEach(function (val) {
  var arg = val.split("=")
  if (arg.length > 1) {
    if (arg[0] == "--domain") {
      domain = arg[1]
      console.log("Setting domain to:", domain)
    }
  }
})

/* BFF → microservices (catalogue, carts, user, orders, …) */
app.use(cart)
app.use(catalogue)
app.use(orders)
app.use(user)

/* Product images from legacy Sock Shop assets */
var legacyPublic = path.join(__dirname, "public")
if (fs.existsSync(legacyPublic)) {
  app.use("/img", express.static(path.join(legacyPublic, "img"), { maxAge: isProd ? "7d" : 0 }))
  app.get("/favicon.png", function (_req, res) {
    res.sendFile(path.join(legacyPublic, "favicon.png"))
  })
}

/* React SPA */
if (hasWebDist) {
  app.use(express.static(webDist, { maxAge: isProd ? "1d" : 0, index: false }))
  app.get("*", function (req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next()
    if (req.path.indexOf(".") !== -1) return next()
    res.sendFile(path.join(webDist, "index.html"))
  })
} else {
  console.warn("web/dist missing — run: npm run build:web")
  app.get("/", function (_req, res) {
    res.status(503).send("Storefront not built")
  })
}

app.use(helpers.errorHandler)

var server = app.listen(process.env.PORT || 8079, function () {
  var port = server.address().port
  console.log("Frontend listening on port %d env=%s spa=%s", port, app.get("env"), hasWebDist)
})
