package works.weave.socks.cart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Prometheus simpleclient_spring_boot {@code @EnablePrometheusEndpoint} is incompatible with
 * Spring Boot 2 (missing AbstractEndpoint) and prevented the app from starting — so add-to-cart
 * failed with ENOTFOUND carts while the container crash-looped.
 */
@SpringBootApplication
public class CartApplication {
    private static final Logger LOG = LoggerFactory.getLogger(CartApplication.class);

    public static void main(String[] args) {
        LOG.info("Starting Sock Shop carts service");
        SpringApplication.run(CartApplication.class, args);
    }
}
