/**
 * Sock Shop BFF client — same-origin calls to Express (server.js).
 * credentials: 'include' keeps session cookie (logged_in / md.sid).
 */

export type CatalogueSock = {
  id: string;
  name: string;
  description: string;
  price: number;
  count: number;
  imageUrl: string[] | string;
  tag?: string[];
};

export type CartLine = {
  itemId?: string;
  id?: string;
  quantity: number;
  unitPrice: number;
};

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

export async function fetchCatalogue(params?: {
  tags?: string;
  page?: number;
  size?: number;
}): Promise<CatalogueSock[]> {
  const q = new URLSearchParams();
  if (params?.tags && params.tags !== 'all') q.set('tags', params.tags);
  if (params?.page) q.set('page', String(params.page));
  if (params?.size) q.set('size', String(params.size));
  const qs = q.toString();
  const res = await fetch(`/catalogue${qs ? `?${qs}` : ''}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`catalogue ${res.status}`);
  return parseJson<CatalogueSock[]>(res);
}

export async function fetchTags(): Promise<{ tags?: string[] } | string[]> {
  const res = await fetch('/tags', { credentials: 'include' });
  if (!res.ok) throw new Error(`tags ${res.status}`);
  return parseJson(res);
}

export async function fetchSock(id: string): Promise<CatalogueSock> {
  const res = await fetch(`/catalogue/${id}`, { credentials: 'include' });
  if (!res.ok) throw new Error(`sock ${res.status}`);
  return parseJson<CatalogueSock>(res);
}

const CART_MS = 2500;

function cartSignal() {
  return AbortSignal.timeout(CART_MS);
}

export async function fetchCart(): Promise<CartLine[]> {
  const res = await fetch('/cart', { credentials: 'include', signal: cartSignal() });
  if (!res.ok) throw new Error(`cart ${res.status}`);
  const data = await parseJson<CartLine[] | { status_code?: number }>(res);
  return Array.isArray(data) ? data : [];
}

export async function addToCartApi(id: string): Promise<void> {
  const res = await fetch('/cart', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    signal: cartSignal(),
  });
  if (!res.ok) throw new Error(`add cart ${res.status}`);
}

export async function updateCartApi(id: string, quantity: number): Promise<void> {
  const res = await fetch('/cart/update', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, quantity }),
    signal: cartSignal(),
  });
  if (!res.ok) throw new Error(`update cart ${res.status}`);
}

export async function deleteCartItemApi(id: string): Promise<void> {
  const res = await fetch(`/cart/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    signal: cartSignal(),
  });
  if (!res.ok) throw new Error(`delete cart item ${res.status}`);
}

export async function clearCartApi(): Promise<void> {
  const res = await fetch('/cart', {
    method: 'DELETE',
    credentials: 'include',
    signal: cartSignal(),
  });
  if (!res.ok && res.status !== 204) throw new Error(`clear cart ${res.status}`);
}

export async function loginApi(username: string, password: string): Promise<void> {
  const res = await fetch('/login', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });
  if (!res.ok) throw new Error('Invalid login');
}

export async function registerApi(body: {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}): Promise<void> {
  const res = await fetch('/register', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`register ${res.status}`);
}

export function logoutLocal(): void {
  document.cookie = 'logged_in=; Max-Age=0; path=/';
}

export function isLoggedInCookie(): boolean {
  return document.cookie.split(';').some((c) => c.trim().startsWith('logged_in='));
}

export async function placeOrderApi(timeoutMs = 20000): Promise<void> {
  const res = await fetch('/orders', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) {
    let msg = `order ${res.status}`;
    try {
      const body = await parseJson<{ message?: string }>(res);
      if (body?.message) msg = body.message;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
}

export async function fetchOrders(): Promise<unknown[]> {
  const res = await fetch('/orders', { credentials: 'include' });
  if (!res.ok) throw new Error(`orders ${res.status}`);
  const data = await parseJson<unknown[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function postAddress(body: {
  number: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
}): Promise<void> {
  const res = await fetch('/addresses', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`address ${res.status}`);
}

export async function postCard(body: {
  longNum: string;
  expires: string;
  ccv: string;
}): Promise<void> {
  const res = await fetch('/cards', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`card ${res.status}`);
}

export async function fetchAddress(): Promise<Record<string, unknown> | null> {
  const res = await fetch('/address', { credentials: 'include' });
  if (!res.ok) return null;
  const data = await parseJson<Record<string, unknown>>(res);
  if (data.status_code === 500) return null;
  return data;
}

export async function fetchCard(): Promise<{ number?: string } | null> {
  const res = await fetch('/card', { credentials: 'include' });
  if (!res.ok) return null;
  const data = await parseJson<{ number?: string; status_code?: number }>(res);
  if (data.status_code === 500) return null;
  return data;
}

/**
 * Map catalogue image paths (often /catalogue/images/...) to local legacy
 * product photos when the catalogue image host is unavailable.
 */
function resolveSockImage(s: CatalogueSock): string {
  const raw = Array.isArray(s.imageUrl) ? s.imageUrl[0] : s.imageUrl;
  const url = raw ? String(raw) : '';
  const n = (s.name || '').toLowerCase();
  const path = url.toLowerCase();

  if (n.includes('colour') || path.includes('colourful')) return '/img/colourful_socks.jpg';
  if (n.includes('holy') || path.includes('holy')) return '/img/holy_socks.jpg';
  if (n.includes('youtube') || path.includes('youtube')) return '/img/youtube_socks.jpg';
  if (n.includes('supersport') || n.includes('rugby') || path.includes('puma'))
    return '/img/rugby_socks.jpg';
  if (n.includes('crossed') || path.includes('cross')) return '/img/weave1.jpg';
  if (n.includes('nerd') || path.includes('bit_of_leg')) return '/img/weave2.jpg';
  // Skip catalogue items whose seed photos are fashion placeholders (not socks)
  if (
    n.includes('figueroa') ||
    path.includes('wat') ||
    n === 'classic' ||
    path.includes('classic.jpg') ||
    (n.includes('cat') && n.includes('sock')) ||
    path.includes('catsock')
  ) {
    return '';
  }

  // Keep absolute / http URLs from a live catalogue; otherwise local sock fallback
  if (url.startsWith('http') || url.startsWith('/img/')) return url;
  if (url.startsWith('/catalogue/images/')) return '/img/colourful_socks.jpg';
  return url || '/img/colourful_socks.jpg';
}

/** Map catalogue API sock → UI SockItem shape (optional fields filled). */
export function mapCatalogueToSock(s: CatalogueSock) {
  return {
    id: s.id,
    name: s.name,
    description: s.description,
    price: s.price,
    count: s.count,
    imageUrl: resolveSockImage(s),
    tags: s.tag || [],
    rating: 4.5,
    reviewCount: 0,
    material: '',
    origin: '',
    care: '',
  };
}
