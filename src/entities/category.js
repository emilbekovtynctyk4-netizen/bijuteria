// ===================================================
// LUMÉRA JEWELRY — Category Entity / Schema
// src/entities/category.js
// ===================================================

/**
 * Нормализует объект категории с API.
 * @param {Object} raw
 * @returns {Category}
 */
export function normalizeCategory(raw) {
  return {
    id:          raw.id,
    slug:        raw.slug || String(raw.id),
    name:        raw.name || raw.title || '',
    description: raw.description || '',
    image:       raw.image || raw.thumbnail || null,
    icon:        raw.icon || null,
    productCount:Number(raw.product_count || raw.productCount || 0),
    parentId:    raw.parent_id || raw.parentId || null,
    order:       Number(raw.order || raw.sort_order || 0),
  };
}

/**
 * Статичные данные категорий для главной страницы.
 * Используются как fallback до загрузки с API.
 */
export const HOMEPAGE_CATEGORIES = [
  {
    id:           1,
    slug:         'rings',
    name:         'Кольца',
    productCount: 120,
    image:        null,
    icon:         'ring',
  },
  {
    id:           2,
    slug:         'necklaces',
    name:         'Колье и цепи',
    productCount:  85,
    image:        null,
    icon:         'necklace',
  },
  {
    id:           3,
    slug:         'earrings',
    name:         'Серьги',
    productCount: 200,
    image:        null,
    icon:         'earring',
  },
  {
    id:           4,
    slug:         'bracelets',
    name:         'Браслеты',
    productCount:  64,
    image:        null,
    icon:         'bracelet',
  },
  {
    id:           5,
    slug:         'sets',
    name:         'Наборы',
    productCount:  38,
    image:        null,
    icon:         'set',
  },
  {
    id:           6,
    slug:         'pendants',
    name:         'Подвески',
    productCount:  92,
    image:        null,
    icon:         'pendant',
  },
];
