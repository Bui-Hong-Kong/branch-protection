/** Path roots for per-service semver (commit path filter). */
export const SERVICES = {
  carts: { path: "backend/carts/" },
  catalogue: { path: "backend/catalogue/" },
  orders: { path: "backend/orders/" },
  payment: { path: "backend/payment/" },
  shipping: { path: "backend/shipping/" },
  user: { path: "backend/user/" },
  frontend: { path: "frontend/" },
};

export const SERVICE_IDS = Object.keys(SERVICES);
