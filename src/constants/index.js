// ===================================================
// LUMÉRA JEWELRY — App Constants
// src/constants/index.js
// ===================================================

import { ROUTES } from './routes';

export * from './routes';
export * from './orderStatus';

// ---- Категории товаров ----
export const CATEGORY_SLUGS = {
  RINGS:     'rings',
  NECKLACES: 'necklaces',
  EARRINGS:  'earrings',
  BRACELETS: 'bracelets',
  SETS:      'sets',
  PENDANTS:  'pendants',
};

// ---- Сортировка каталога ----
export const SORT_OPTIONS = [
  { value: 'popular',    label: 'По популярности' },
  { value: 'newest',     label: 'Новинки' },
  { value: 'price_asc',  label: 'Цена: по возрастанию' },
  { value: 'price_desc', label: 'Цена: по убыванию' },
  { value: 'discount',   label: 'По скидке' },
];

// ---- Бейджи товаров ----
export const PRODUCT_BADGE = {
  HIT:     'hit',
  NEW:     'new',
  SALE:    'sale',
  LIMITED: 'limited',
};

export const PRODUCT_BADGE_LABELS = {
  [PRODUCT_BADGE.HIT]:     'Хит',
  [PRODUCT_BADGE.NEW]:     'Новинка',
  [PRODUCT_BADGE.SALE]:    'Скидка',
  [PRODUCT_BADGE.LIMITED]: 'Лимит',
};

// ---- Метаданные навигации ----
export const NAV_LINKS = [
  { label: 'Главная',    path: ROUTES.HOME },
  { label: 'Каталог',   path: ROUTES.CATALOG },
  { label: 'Новинки',   path: `${ROUTES.CATALOG}?sort=newest` },
  { label: 'Хиты',      path: `${ROUTES.CATALOG}?sort=popular` },
  { label: 'О нас',     path: ROUTES.ABOUT },
  { label: 'Контакты',  path: ROUTES.CONTACT },
];

// ---- Локальное хранилище — ключи ----
export const STORAGE_KEYS = {
  CART:     'lumera_cart',
  WISHLIST: 'lumera_wishlist',
  CITY:     'lumera_city',
  TOKEN:    'lumera_token',
  USER:     'lumera_user',
};
