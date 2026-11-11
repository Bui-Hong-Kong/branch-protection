export interface SockItem {
  id: string;
  name: string;
  description: string;
  price: number;
  count: number; // stock count
  imageUrl: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  material: string;
  origin: string;
  care: string;
}

export interface CartItem {
  id: string;
  sockId: string;
  sock: SockItem;
  quantity: number;
  unitPrice: number;
}

export interface Address {
  id: string;
  street: string;
  number: string;
  city: string;
  postcode: string;
  country: string;
  isDefault?: boolean;
}

export interface Card {
  id: string;
  longNum: string; // e.g. "•••• •••• •••• 4242"
  expires: string; // "08/28"
  ccv: string;
  cardholderName: string;
  brand?: 'visa' | 'mastercard' | 'amex';
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  customerId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  address: Address;
  card: Card;
  status: 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
  cards: Card[];
}

export type ViewportMode = 'responsive' | 'desktop' | 'mobile';
