# One-shot Flyway migrate against catalogue MySQL / RDS.
# Build from this directory: docker build -t sockshop-catalogue-flyway .
FROM flyway/flyway:10-alpine

COPY sql /flyway/sql
COPY conf/flyway.toml.example /flyway/conf/flyway.toml.example

# Runtime: set FLYWAY_URL, FLYWAY_USER, FLYWAY_PASSWORD (or mount conf).
ENTRYPOINT ["flyway"]
CMD ["-connectRetries=10", "migrate"]
