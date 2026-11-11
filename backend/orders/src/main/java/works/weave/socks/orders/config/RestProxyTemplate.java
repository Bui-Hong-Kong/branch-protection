package works.weave.socks.orders.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.net.InetSocketAddress;
import java.net.Proxy;

@Component
public final class RestProxyTemplate {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired RestTemplate restTemplate;

    @Value("${http.connectTimeoutMs:3000}")
    private int connectTimeoutMs;

    @Value("${http.readTimeoutMs:5000}")
    private int readTimeoutMs;

    @Bean
    public RestTemplate restTemplate() {
      SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
      // Without these, hung user/carts/payment/shipping calls stall Place Order for a long time.
      factory.setConnectTimeout(connectTimeoutMs);
      factory.setReadTimeout(readTimeoutMs);
      return new RestTemplate(factory);
    }

    @Value("${proxy.host:}")
    private String host;

    @Value("${proxy.port:}")
    private String port;

    @PostConstruct
    public void init() {
        if (host.isEmpty() || port.isEmpty()) {
            return;
        }
        int portNr = -1;
        try {
            portNr = Integer.parseInt(port);
        } catch (NumberFormatException e) {
            logger.error("Unable to parse the proxy port number");
        }
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        InetSocketAddress address = new InetSocketAddress(host, portNr);
        Proxy proxy = new Proxy(Proxy.Type.HTTP, address);
        factory.setProxy(proxy);
        factory.setConnectTimeout(connectTimeoutMs);
        factory.setReadTimeout(readTimeoutMs);

        restTemplate.setRequestFactory(factory);
    }

    public RestTemplate getRestTemplate() {
        return restTemplate;
    }
}
