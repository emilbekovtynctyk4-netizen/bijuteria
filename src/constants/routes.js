export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  CATEGORY: '/catalog/:slug',
  PRODUCT: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  ORDERS: '/profile/orders',
  WISHLIST: '/wishlist',
  ABOUT: '/about',
  QUALITY: '/quality',
  CONTACT: '/contact',
  NOT_FOUND: '*',
};

export const NAV_LINKS = [
  { label: 'Главная', path: ROUTES.HOME },
  { label: 'О нас', path: ROUTES.ABOUT },
  { label: 'Качество', path: ROUTES.QUALITY },
  { label: 'Каталог', path: ROUTES.CATALOG },
  { label: 'Контакты', path: ROUTES.CONTACT },
];
