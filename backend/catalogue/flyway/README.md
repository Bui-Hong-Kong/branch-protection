# Catalogue Flyway (MySQL / RDS)

Versioned schema + seed for the **catalogue** database (`socksdb`).  
Mongo (carts / orders / user) is out of scope.

## Layout

```text
flyway/
├── sql/
│   ├── V1__create_catalogue_schema.sql
│   └── V2__seed_socks.sql
├── conf/flyway.toml.example
├── Dockerfile                 # optional one-shot image
├── docker-compose.migrate.yml
└── README.md
```

## Prerequisites

1. RDS (or local MySQL) with database **`socksdb`** already created.
2. App user that can DDL/DML on `socksdb` (lab often uses `catalogue_user`).
3. Network path: laptop VPN/SG or EC2 in the same VPC as RDS.

## Migrate (Docker — recommended)

From this directory:

```bash
export FLYWAY_URL='jdbc:mysql://<RDS_ENDPOINT>:3306/socksdb?allowPublicKeyRetrieval=true&useSSL=true'
export FLYWAY_USER='<CATALOGUE_DB_USER>'
export FLYWAY_PASSWORD='<CATALOGUE_DB_PASSWORD>'

docker compose -f docker-compose.migrate.yml run --rm flyway
```

Do not commit real passwords. Prefer env vars or a secrets manager on EC2.

### JDBC tips (RDS)

- `allowPublicKeyRetrieval=true` — avoids MySQL 8 RSA public-key errors from some clients.
- From Docker Desktop to a DB on the host, use `host.docker.internal` instead of `localhost`.

## Migrate (Flyway CLI)

```bash
flyway \
  -url="$FLYWAY_URL" \
  -user="$FLYWAY_USER" \
  -password="$FLYWAY_PASSWORD" \
  -locations=filesystem:sql \
  migrate
```

## When to run

| Moment | Action |
|--------|--------|
| New RDS / empty `socksdb` | `migrate` once |
| After adding `V3__...sql` | `migrate` again (CI or EC2 bootstrap) |
| App deploy only | No need if schema already current |

Catalogue pods/containers only **read** the DB; they do not run Flyway.

## Security check

| Question | Answer |
|----------|--------|
| Where is the DB password stored? | Env / Secrets Manager / SSM — **not** in git |
| Who can access? | IAM + RDS security group (EC2/CIDR that runs Flyway) |
| Rotation | Rotate RDS user password; update secret; re-run not required for Flyway history |
| Committed to git? | **No** real secrets — only `.example` and SQL |

## Related

- Catalogue service DSN: Helm secret `catalogue-db` / flag `-DSN=...`
- Lab diagram: `docs/ec2-rds-lab-architecture.html`
