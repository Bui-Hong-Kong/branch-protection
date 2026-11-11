# Sock Shop frontend (deploy)

Express **BFF** + React SPA. Built for cluster deploy (same-origin APIs to `catalogue`, `carts`, `user`, `orders`, …).

| Path | Role |
|------|------|
| `server.js`, `api/` | BFF proxies to microservices |
| `web/` | React storefront (Vite + Tailwind) |
| `web/dist/` | SPA build output (required in production) |
| `public/img/` | Sock product images (`/img/...`) |

**Runtime:** Node **22**, Express **4.21.x**

## Container

```bash
docker build -f Dockerfile.ci -t sockshop-frontend .
```

Multi-stage: builds `web/` → copies `web/dist` → `npm start` on `:8079`.

## CI

`npm run build:web` then Docker build (`02-pre-merge`).

## Cluster

Helm/Argo: frontend Service DNS names must match BFF endpoints (`catalogue`, `carts`, `orders`, `user`, `payment`, `shipping`). See `deploy/README.md`.

Cart / checkout / orders require those services — the UI does **not** use local mock fallbacks in deploy builds.
