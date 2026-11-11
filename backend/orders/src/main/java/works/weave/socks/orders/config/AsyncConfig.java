package works.weave.socks.orders.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

/**
 * Bounded pool for parallel downstream calls (user/carts/payment/shipping)
 * during Place Order — default SimpleAsyncTaskExecutor creates unbounded threads.
 */
@Configuration
public class AsyncConfig extends AsyncConfigurerSupport {

    @Bean(name = "ordersAsyncExecutor")
    public Executor ordersAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(8);
        executor.setMaxPoolSize(32);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("orders-async-");
        executor.initialize();
        return executor;
    }

    @Override
    public Executor getAsyncExecutor() {
        return ordersAsyncExecutor();
    }
}
