# WeaveSocks storefront (React)

SPA served by the Express BFF in production (`web/dist`).

```bash
npm install
npm run build    # css + tsc + vite → dist/
```

Deploy: parent `Dockerfile.ci` runs this build. APIs are same-origin (`/catalogue`, `/cart`, `/orders`, …).
