/** Path roots for per-service semver (commit path filter). */
export const SERVICES = {
  carts: { path: "backend/carts/" },
  catalogue: {
    path: "backend/catalogue/",
    exclude: ["backend/catalogue/docker/catalogue-db/"],
  },
  "catalogue-db": { path: "backend/catalogue/docker/catalogue-db/" },
  orders: { path: "backend/orders/" },
  payment: { path: "backend/payment/" },
  shipping: { path: "backend/shipping/" },
  user: {
    path: "backend/user/",
    exclude: ["backend/user/docker/user-db/"],
  },
  "user-db": { path: "backend/user/docker/user-db/" },
  frontend: { path: "frontend/" },
};

export const SERVICE_IDS = Object.keys(SERVICES);
