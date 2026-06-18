export type ProductKind = 'spray' | 'marker' | 'cap' | 'apparel' | 'accessory';

export type Product = {
  id: string;
  name: string;
  /** Short subtitle / line under the title. */
  line: string;
  /** Display price, in CZK, integer Kč. */
  price: number;
  /** Optional original price for the SLEVA badge (struck-through). */
  oldPrice?: number;
  kind: ProductKind;
  /** Hex of the primary visual color of the product — used to tint card glow. */
  hex: string;
  /** MTN color code matched against the wall — null for items without a single color. */
  colorCode?: string;
  /** Family used by the colour filter — null for items that don't belong to a family. */
  family?:
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'neutral';
  /** Path to the photo relative to /public. */
  image: string;
  /** Whether the product is in stock — drives the "Skladem" pill. */
  inStock?: boolean;
  /** Optional badge: NOVÉ, BESTSELLER, OMEZENÉ, SLEVA atd. */
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'mtn-black-400-mandarine',
    name: 'Montana BLACK 400',
    line: 'Mandarine · vysokotlaký',
    price: 189,
    kind: 'spray',
    hex: '#e25a15',
    colorCode: 'MTN-4030',
    family: 'orange',
    image: '/products/cans/black-orange.png',
    inStock: true,
    badge: 'BESTSELLER',
  },
  {
    id: 'mtn-black-400-acid',
    name: 'Montana BLACK 400',
    line: 'Power Green Fluorescent',
    price: 219,
    kind: 'spray',
    hex: '#39d04a',
    colorCode: 'MTN-6080',
    family: 'green',
    image: '/products/cans/black-fluo-green.png',
    inStock: true,
    badge: 'NOVÉ',
  },
  {
    id: 'mtn-gold-400-peach',
    name: 'Montana GOLD 400',
    line: 'Peach · matný',
    price: 199,
    kind: 'spray',
    hex: '#f7a23b',
    colorCode: 'MTN-4060',
    family: 'orange',
    image: '/products/cans/gold-peach.png',
    inStock: true,
  },
  {
    id: 'mtn-chalk-acid',
    name: 'Montana CHALK 400',
    line: 'Acid Green · smývatelný',
    price: 169,
    oldPrice: 199,
    kind: 'spray',
    hex: '#a3d930',
    colorCode: 'MTN-6090',
    family: 'green',
    image: '/products/cans/chalk-green.png',
    inStock: true,
    badge: 'SLEVA',
  },
  {
    id: 'mtn-stencil-black',
    name: 'Montana STENCIL 400',
    line: 'Black · rychle schnoucí',
    price: 159,
    kind: 'spray',
    hex: '#0e0d10',
    colorCode: 'MTN-1010',
    family: 'neutral',
    image: '/products/cans/stencil-black.png',
    inStock: true,
  },
  {
    id: 'mtn-tarblack-500',
    name: 'Montana TARBLACK 500',
    line: 'Low-pressure · XL',
    price: 249,
    kind: 'spray',
    hex: '#1b1a1f',
    colorCode: 'MTN-1020',
    family: 'neutral',
    image: '/products/cans/tarblack.png',
    inStock: true,
  },
  {
    id: 'cap-fat-orange',
    name: 'Fat Cap (10 ks)',
    line: 'Wide pattern · oranžový dot',
    price: 159,
    kind: 'cap',
    hex: '#ff8a2a',
    image: '/products/caps/cap-white-orange.png',
    inStock: true,
    badge: 'PACK',
  },
  {
    id: 'cap-skinny-gold',
    name: 'Skinny Cap (10 ks)',
    line: 'Outline · zlatá řada',
    price: 169,
    kind: 'cap',
    hex: '#c9a23b',
    image: '/products/caps/cap-gold.png',
    inStock: true,
  },
  {
    id: 'cap-universal-lime',
    name: 'Universal Cap (10 ks)',
    line: 'Univerzální tryska',
    price: 149,
    kind: 'cap',
    hex: '#a3d930',
    family: 'green',
    image: '/products/caps/cap-lime.png',
    inStock: true,
  },
  {
    id: 'marker-trio-iris',
    name: 'Acrylic Marker Trio',
    line: '15 mm · Iris / Fuchsia / Cobalt',
    price: 749,
    oldPrice: 879,
    kind: 'marker',
    hex: '#8b46d6',
    colorCode: 'MTN-8040',
    family: 'purple',
    image: '/products/markers/markers-trio-purple-pink.png',
    inStock: true,
    badge: 'SLEVA',
  },
  {
    id: 'marker-trio-pink',
    name: 'Acrylic Marker Trio',
    line: '15 mm · růžový set',
    price: 749,
    kind: 'marker',
    hex: '#ed3a8e',
    colorCode: 'MTN-9030',
    family: 'pink',
    image: '/products/markers/markers-trio-pinks.png',
    inStock: false,
  },
  {
    id: 'marker-black-water',
    name: 'Acrylic Marker 15 mm',
    line: 'Black · water-based',
    price: 289,
    kind: 'marker',
    hex: '#0e0d10',
    family: 'neutral',
    image: '/products/markers/marker-black-water.png',
    inStock: true,
  },
  {
    id: 'marker-pair-red-2',
    name: 'Acrylic Marker 2 mm',
    line: 'Tornado Red · pár',
    price: 369,
    kind: 'marker',
    hex: '#d31a25',
    colorCode: 'MTN-3050',
    family: 'red',
    image: '/products/markers/markers-pair-red.png',
    inStock: true,
  },
  {
    id: 'tshirt-tag-black',
    name: 'Tričko TAG',
    line: 'Heavy 240 gsm · oversize',
    price: 690,
    kind: 'apparel',
    hex: '#1b1a1f',
    family: 'neutral',
    image: '/products/shirts/tshirt-tag-black.png',
    inStock: true,
    badge: 'NOVÉ',
  },
  {
    id: 'hoodie-blackbook',
    name: 'Mikina BLACKBOOK',
    line: '380 gsm · heavy oversize',
    price: 1490,
    kind: 'apparel',
    hex: '#0e0d10',
    family: 'neutral',
    image: '/products/shirts/hoodie-black.png',
    inStock: true,
    badge: 'OMEZENÉ',
  },
  {
    id: 'blackbook-a4',
    name: 'Montana BLACKBOOK A4',
    line: 'Portrait · 144 stran',
    price: 549,
    kind: 'accessory',
    hex: '#1f1d24',
    family: 'neutral',
    image: '/products/accessories/blackbook-a4.png',
    inStock: true,
  },
];
