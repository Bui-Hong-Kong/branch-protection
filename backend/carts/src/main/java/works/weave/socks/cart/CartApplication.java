package works.weave.socks.cart;

import io.prometheus.client.spring.boot.EnablePrometheusEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnablePrometheusEndpoint
public class CartApplication {
    private static final Logger LOG = LoggerFactory.getLogger(CartApplication.class);

    public static void main(String[] args) {
        LOG.info("Starting Sock Shop carts service");
        SpringApplication.run(CartApplication.class, args);
    }
}
