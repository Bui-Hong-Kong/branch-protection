# WeaveSocks UI redesign — Google Studio prompt

Copy the block below into Google Studio (or similar) to generate a new storefront UI.

---

## Prompt (English)

**Project:** Redesign the UI for **WeaveSocks** (Sock Shop) — a demo microservices e-commerce store that sells socks.

**Goal:** Produce a modern, clean storefront UI for a **React SPA**. Visual redesign only; keep the same user journeys and information architecture as today’s app. Backend APIs stay unchanged.

**Product vibe:** Friendly, playful sock brand — not luxury fashion, not enterprise SaaS. Clear CTAs, readable product cards, trustworthy checkout. Mobile-first, then desktop.

**Tech context for the designer (do not invent new APIs):**  
Frontend will be React (likely Tailwind). Screens should map cleanly to routes. Data shown: sock name, description, price, stock count, images, tags; cart line items; orders; address; credit card last digits / form fields.

### Primary user flows (must support)

1. **Browse**  
   Home → Catalogue (optional tag filters) → Product detail

2. **Auth**  
   Login / Register as modal or dedicated screens (username, password; register also: email, first name, last name). Logout from header.

3. **Cart**  
   Add to cart from catalogue or detail → Cart page (quantity update, totals)

4. **Checkout (single cart/checkout experience — do NOT design a 4-step Bootstrap template wizard)**  
   On cart/checkout: view items → add/select shipping address → add/select payment card → Place order (requires logged-in user). Success → Orders list.

5. **Account**  
   Orders history → Order detail

### Screens to design (complete set)

| Screen | Key UI |
|--------|--------|
| **Home** | Hero, value props, featured socks grid/carousel, header with logo, Catalogue, Account, Cart badge, Login/Register |
| **Catalogue** | Filter by tags (e.g. blue, brown, green, formal, magic…), product grid, pagination / page size |
| **Product detail** | Images, name, price, description, stock, Add to cart, link to cart, related items optional |
| **Cart / Checkout** | Line items, qty controls, subtotal, address block (+ add address form/modal), card block (+ add card form/modal), Place order CTA, empty-cart state, error/success alerts (e.g. must be logged in) |
| **Orders list** | Table/cards of past orders, View detail |
| **Order detail** | Order id, items, totals, shipping/payment summary |
| **Login** | Username, password, errors |
| **Register** | Username, email, password, first/last name, errors |

Also design: **header/nav**, **footer**, **empty states**, **loading**, **toast/alert** patterns.

### Layout & components

- Sticky top nav: logo → Home, Catalogue (dropdown tags optional), Account, Cart with item count, auth actions
- Product card: image, name, price, “View” / “Add to cart”
- Consistent spacing, 8pt grid, accessible contrast
- Forms: clear labels, validation error style

### Visual direction

- Modern e-commerce (2024–2026), not Bootstrap 3 look
- Soft brand color (socks/fun) + neutral surfaces; avoid generic purple-on-white AI cliché if possible
- Prefer one strong accent; plenty of whitespace; high-quality sock imagery placeholders
- Desktop + mobile mockups for Home, Catalogue, Product, Cart

### Out of scope

- Blog, contact, wishlist, FAQ, multi-step checkout1–4 template pages
- Admin/dashboard, inventing new microservices
- Changing API contracts

### Deliverables

1. Desktop + mobile mockups for every screen above
2. Simple user-flow diagram matching the journeys
3. Component notes (nav, product card, cart row, modals)
4. Suggested React route map, e.g. `/`, `/catalogue`, `/product/:id`, `/cart`, `/orders`, `/orders/:id`, `/login`, `/register`
5. Color tokens + typography suggestions suitable for Tailwind

**Tone:** Demo shop for a DevOps/microservices lab — polished enough to look real, simple enough to implement in React quickly.

---

## Reference: current live pages (legacy)

| Page | Role |
|------|------|
| `index.html` | Home |
| `category.html` | Catalogue (+ `?tags=&page=&size=`) |
| `detail.html?id=` | Product detail |
| `basket.html` | Cart + address/card + place order |
| `customer-orders.html` | Orders list |
| `customer-order.html?order=` | Order detail |
| Topbar modals | Login / Register |

Legacy template pages such as `checkout1.html`–`checkout4.html` are **not** part of the real happy path.
