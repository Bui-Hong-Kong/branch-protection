package works.weave.socks.cart.configuration;

import org.springframework.context.annotation.Configuration;

/**
 * Previous HTTPMonitoringInterceptor required Spring Data REST {@code JpaHelper}, which is not
 * available for this Mongo-only carts service and blocked startup after the Prometheus fix.
 * Re-enable metrics with a Mongo-safe interceptor if needed later.
 */
@Configuration
public class WebMvcConfig {
}
