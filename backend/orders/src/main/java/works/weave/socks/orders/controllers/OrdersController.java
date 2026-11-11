package works.weave.socks.orders.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.TypeReferences;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import works.weave.socks.orders.config.OrdersConfigurationProperties;
import works.weave.socks.orders.entities.*;
import works.weave.socks.orders.repositories.CustomerOrderRepository;
import works.weave.socks.orders.resources.NewOrderResource;
import works.weave.socks.orders.services.AsyncGetService;
import works.weave.socks.orders.values.PaymentRequest;
import works.weave.socks.orders.values.PaymentResponse;

import java.io.IOException;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@RepositoryRestController
public class OrdersController {
    private final Logger LOG = LoggerFactory.getLogger(getClass());

    @Autowired
    private OrdersConfigurationProperties config;

    @Autowired
    private AsyncGetService asyncGetService;

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Value(value = "${http.timeout:5}")
    private long timeout;

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/orders", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public
    @ResponseBody
    CustomerOrder newOrder(@RequestBody NewOrderResource item) {
        try {
            if (item.address == null || item.customer == null || item.card == null || item.items == null) {
                throw new InvalidOrderException("Invalid order request. Order requires customer, address, card and items.");
            }

            // Fan-out: user address/customer/card + cart items in parallel
            Future<Resource<Address>> addressFuture = asyncGetService.getResource(item.address, new TypeReferences
                    .ResourceType<Address>() {
            });
            Future<Resource<Customer>> customerFuture = asyncGetService.getResource(item.customer, new TypeReferences
                    .ResourceType<Customer>() {
            });
            Future<Resource<Card>> cardFuture = asyncGetService.getResource(item.card, new TypeReferences
                    .ResourceType<Card>() {
            });
            Future<List<Item>> itemsFuture = asyncGetService.getDataList(item.items, new
                    ParameterizedTypeReference<List<Item>>() {
            });

            // Resolve once — wall clock ≈ max(downstream), not sum
            Resource<Address> addressResource = addressFuture.get(timeout, TimeUnit.SECONDS);
            Resource<Customer> customerResource = customerFuture.get(timeout, TimeUnit.SECONDS);
            Resource<Card> cardResource = cardFuture.get(timeout, TimeUnit.SECONDS);
            List<Item> orderItems = itemsFuture.get(timeout, TimeUnit.SECONDS);

            if (orderItems == null || orderItems.isEmpty()) {
                throw new InvalidOrderException("Cannot create order from an empty cart.");
            }

            Address address = addressResource.getContent();
            Customer customer = customerResource.getContent();
            Card card = cardResource.getContent();
            float amount = calculateTotal(orderItems);

            // Payment must succeed before shipping
            PaymentRequest paymentRequest = new PaymentRequest(address, card, customer, amount);
            LOG.info("Sending payment request: " + paymentRequest);
            PaymentResponse paymentResponse = asyncGetService.postResource(
                    config.getPaymentUri(),
                    paymentRequest,
                    new ParameterizedTypeReference<PaymentResponse>() {
                    }).get(timeout, TimeUnit.SECONDS);
            LOG.info("Received payment response: " + paymentResponse);

            if (paymentResponse == null) {
                throw new PaymentDeclinedException("Unable to parse authorisation packet");
            }
            if (!paymentResponse.isAuthorised()) {
                throw new PaymentDeclinedException(paymentResponse.getMessage());
            }

            String customerId = customer != null && customer.getId() != null && !customer.getId().isEmpty()
                    ? customer.getId()
                    : parseId(customerResource.getId().getHref());

            Shipment shipment = asyncGetService.postResource(
                    config.getShippingUri(),
                    new Shipment(customerId),
                    new ParameterizedTypeReference<Shipment>() {
                    }).get(timeout, TimeUnit.SECONDS);

            CustomerOrder order = new CustomerOrder(
                    null,
                    customerId,
                    customer,
                    address,
                    card,
                    orderItems,
                    shipment,
                    Calendar.getInstance().getTime(),
                    amount);
            LOG.debug("Received data: " + order.toString());

            CustomerOrder savedOrder = customerOrderRepository.save(order);
            LOG.debug("Saved order: " + savedOrder);

            return savedOrder;
        } catch (TimeoutException e) {
            throw new IllegalStateException("Unable to create order due to timeout from one of the services.", e);
        } catch (InterruptedException | IOException | ExecutionException e) {
            throw new IllegalStateException("Unable to create order due to unspecified IO error.", e);
        }
    }

    private String parseId(String href) {
        Pattern idPattern = Pattern.compile("[\\w-]+$");
        Matcher matcher = idPattern.matcher(href);
        if (!matcher.find()) {
            throw new IllegalStateException("Could not parse user ID from: " + href);
        }
        return matcher.group(0);
    }

    private float calculateTotal(List<Item> items) {
        float amount = 0F;
        float shipping = 4.99F;
        amount += items.stream().mapToDouble(i -> i.getQuantity() * i.getUnitPrice()).sum();
        amount += shipping;
        return amount;
    }

    @ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
    public class PaymentDeclinedException extends IllegalStateException {
        public PaymentDeclinedException(String s) {
            super(s);
        }
    }

    @ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
    public class InvalidOrderException extends IllegalStateException {
        public InvalidOrderException(String s) {
            super(s);
        }
    }
}
