import { Address, Card, Order, SockItem, User } from '../types';
import heroImg from '../assets/images/hero_socks_showcase_1794211143345.jpg';
import sockColourful from '../assets/images/sock_colourful_stripes_1794211144706.jpg';
import sockCatnip from '../assets/images/sock_catnip_cozy_1794211144320.jpg';
import sockFormal from '../assets/images/sock_formal_argyle_1794211144878.jpg';
import sockSport from '../assets/images/sock_sport_crew_1794211145868.jpg';

/** Redesign hero (bundled for deploy). */
export const HERO_IMAGE = heroImg;

/** Redesign product stills (bundled URLs). */
export const NEW_IMG = {
  colourful: sockColourful,
  catnip: sockCatnip,
  formal: sockFormal,
  sport: sockSport,
} as const;

/** Classic Sock Shop photos from frontend/public/img. */
export const LEGACY_IMG = {
  colourful: '/img/colourful_socks.jpg',
  holy: '/img/holy_socks.jpg',
  rugby: '/img/rugby_socks.jpg',
  youtube: '/img/youtube_socks.jpg',
  weave1: '/img/weave1.jpg',
  weave2: '/img/weave2.jpg',
  weave3: '/img/weave3.jpg',
  weave4: '/img/weave4.jpg',
} as const;

/** New-UI collection (redesign copy + new photos). */
export const REDESIGN_SOCKS: SockItem[] = [
  {
    id: 'sock-01',
    name: 'Weave Colourful',
    description:
      'Our iconic flagship pair. High-spirited colorblocking and plush combed cotton weave that brings cheer to every step.',
    price: 18.0,
    count: 38,
    imageUrl: NEW_IMG.colourful,
    tags: ['magic', 'blue', 'green'],
    rating: 4.9,
    reviewCount: 142,
    material: '80% Combed Organic Cotton, 17% Polyamide, 3% Elastane',
    origin: 'Crafted in Porto, Portugal',
    care: 'Machine wash warm (40°C). Air dry recommended.',
  },
  {
    id: 'sock-02',
    name: 'Catnip Comfort',
    description:
      'Earthy heather brown and warm amber yarns spun with a subtle geometric Scandinavian jacquard knit for fireside comfort.',
    price: 15.0,
    count: 24,
    imageUrl: NEW_IMG.catnip,
    tags: ['brown', 'warm'],
    rating: 4.8,
    reviewCount: 96,
    material: '75% Brushed Cotton, 20% Recycled Poly, 5% Spandex',
    origin: 'Crafted in Biella, Italy',
    care: 'Gentle cycle, tumble dry low.',
  },
  {
    id: 'sock-03',
    name: 'Formal Argyle',
    description:
      'A sharp 2026 update to the timeless argyle. Precision diamond knit in deep navy, forest green, and golden ochre.',
    price: 14.0,
    count: 51,
    imageUrl: NEW_IMG.formal,
    tags: ['formal', 'brown', 'green'],
    rating: 4.7,
    reviewCount: 68,
    material: '82% Mercerized Egyptian Cotton, 16% Nylon, 2% Lycra',
    origin: 'Crafted in Milan, Italy',
    care: 'Machine wash cold with like colors.',
  },
  {
    id: 'sock-04',
    name: 'SuperSport Pro Crew',
    description:
      'Engineered performance crew with targeted arch compression, reinforced heel impact zones, and vibrant athletic speed stripes.',
    price: 15.0,
    count: 67,
    imageUrl: NEW_IMG.sport,
    tags: ['sport', 'blue', 'action'],
    rating: 4.9,
    reviewCount: 184,
    material: '65% CoolMax Breathable Yarn, 30% Cotton, 5% Elastane',
    origin: 'Crafted in Guimarães, Portugal',
    care: 'Machine wash warm. Avoid bleach.',
  },
];

/**
 * Classic WeaveSocks catalogue (same IDs/names/prices as catalogue seed),
 * shown in the new UI with local legacy product photos.
 */
export const CLASSIC_SOCKS: SockItem[] = [
  {
    id: 'a0a4f044-b040-410d-8ead-4de0446aec7e',
    name: 'Nerd leg',
    description:
      'For all those leg lovers out there. A perfect example of a swivel chair trained calf. Meticulously trained on a diet of sitting and Pina Coladas. Phwarr...',
    price: 7.99,
    count: 115,
    imageUrl: LEGACY_IMG.weave2,
    tags: ['blue', 'skin', 'geek'],
    rating: 4.4,
    reviewCount: 58,
    material: '',
    origin: 'Sock Shop classic',
    care: '',
  },
  {
    id: '808a2de1-1aaa-4c25-a9b9-6612e8f29a38',
    name: 'Crossed',
    description: 'A mature sock, crossed, with an air of nonchalance.',
    price: 17.32,
    count: 738,
    imageUrl: LEGACY_IMG.weave1,
    tags: ['blue', 'red', 'action', 'formal'],
    rating: 4.6,
    reviewCount: 112,
    material: '',
    origin: 'Sock Shop classic',
    care: '',
  },
  {
    id: '510a0d7e-8e83-4193-b483-e27e09ddc34d',
    name: 'SuperSport XL',
    description:
      'Ready for action. Engineers: be ready to smash that next bug! Be ready, with these super-action-sport-masterpieces.',
    price: 15.0,
    count: 820,
    imageUrl: LEGACY_IMG.rugby,
    tags: ['sport', 'black', 'formal', 'action'],
    rating: 4.8,
    reviewCount: 203,
    material: '',
    origin: 'Sock Shop classic',
    care: '',
  },
  {
    id: '03fef6ac-1896-4ce8-bd69-b798f85c6e0b',
    name: 'Holy',
    description:
      'Socks fit for a Messiah. You too can experience walking in water with these special edition beauties. Each hole is lovingly proggled to leave smooth edges.',
    price: 99.99,
    count: 1,
    imageUrl: LEGACY_IMG.holy,
    tags: ['magic', 'action'],
    rating: 5.0,
    reviewCount: 41,
    material: '',
    origin: 'Sock Shop classic',
    care: '',
  },
  {
    id: 'd3588630-ad8e-49df-bbd7-3167f7efb246',
    name: 'YouTube.sock',
    description: "We were not paid to sell this sock. It's just a bit geeky.",
    price: 10.99,
    count: 801,
    imageUrl: LEGACY_IMG.youtube,
    tags: ['geek', 'formal'],
    rating: 4.5,
    reviewCount: 89,
    material: '',
    origin: 'Sock Shop classic',
    care: '',
  },
  {
    id: '3395a43e-2d88-40de-b95f-e00e1502085b',
    name: 'Colourful',
    description: 'proident occaecat irure et excepteur labore minim nisi amet irure',
    price: 18.0,
    count: 438,
    imageUrl: LEGACY_IMG.colourful,
    tags: ['brown', 'blue'],
    rating: 4.7,
    reviewCount: 156,
    material: '',
    origin: 'Sock Shop classic',
    care: '',
  },
];

/** Mock catalogue = redesign + classic Sock Shop products. */
export const INITIAL_SOCKS: SockItem[] = [...REDESIGN_SOCKS, ...CLASSIC_SOCKS];

export const ALL_TAGS = [
  'all',
  'magic',
  'blue',
  'brown',
  'green',
  'formal',
  'sport',
  'geek',
  'action',
  'red',
  'black',
  'skin',
  'warm',
  'stripes',
];

export const DEMO_USER: User = {
  id: 'cust-weave-001',
  username: 'eve_devops',
  email: 'eve@weavesocks.dev',
  firstName: 'Eve',
  lastName: 'Ops',
  addresses: [
    {
      id: 'addr-01',
      number: '12',
      street: 'Weave Lane',
      city: 'Porto',
      postcode: '4000-001',
      country: 'Portugal',
    },
  ],
  cards: [
    {
      id: 'card-01',
      longNum: '•••• •••• •••• 4242',
      expires: '12/28',
      ccv: '***',
      cardholderName: 'Eve Ops',
      brand: 'visa',
    },
  ],
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    date: '2026-03-12',
    customerId: 'cust-weave-001',
    status: 'Delivered',
    estimatedDelivery: '2026-03-15',
    items: [
      {
        id: 'li-1',
        sockId: REDESIGN_SOCKS[0].id,
        sock: REDESIGN_SOCKS[0],
        quantity: 2,
        unitPrice: 18.0,
      },
      {
        id: 'li-2',
        sockId: CLASSIC_SOCKS[5].id,
        sock: CLASSIC_SOCKS[5],
        quantity: 1,
        unitPrice: 18.0,
      },
    ],
    subtotal: 54.0,
    shipping: 0,
    tax: 4.46,
    total: 58.46,
    address: DEMO_USER.addresses[0],
    card: DEMO_USER.cards[0],
  },
  {
    id: 'ord-1002',
    date: '2026-04-02',
    customerId: 'cust-weave-001',
    status: 'Shipped',
    estimatedDelivery: '2026-04-08',
    items: [
      {
        id: 'li-3',
        sockId: CLASSIC_SOCKS[2].id,
        sock: CLASSIC_SOCKS[2],
        quantity: 1,
        unitPrice: 15.0,
      },
    ],
    subtotal: 15.0,
    shipping: 4.5,
    tax: 1.61,
    total: 21.11,
    address: DEMO_USER.addresses[0],
    card: DEMO_USER.cards[0],
  },
];
