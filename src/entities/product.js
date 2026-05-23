// ===================================================
// LUMÉRA JEWELRY — Product Entity / Schema
// src/entities/product.js
// ===================================================

import { PRODUCT_BADGE } from 'constants';
import { calcDiscountedPrice } from 'lib/formatPrice';

/**
 * Нормализует сырой объект товара с API в стандартный формат приложения.
 * @param {Object} raw — сырой объект с API
 * @returns {Product}
 */
export function normalizeProduct(raw) {
  const discount = raw.discount_percent || raw.discountPercent || 0;

  return {
    id:             raw.id,
    slug:           raw.slug || String(raw.id),
    name:           raw.name || raw.title || '',
    description:    raw.description || '',
    price:          Number(raw.price) || 0,
    discountPercent:Number(discount),
    discountedPrice:discount > 0
                      ? calcDiscountedPrice(Number(raw.price), discount)
                      : Number(raw.price),
    images:         normalizeImages(raw.images || raw.image),
    badge:          normalizeBadge(raw),
    categoryId:     raw.category_id || raw.categoryId || null,
    categorySlug:   raw.category_slug || raw.categorySlug || null,
    inStock:        raw.in_stock !== undefined ? Boolean(raw.in_stock) : true,
    stockCount:     Number(raw.stock_count || raw.stockCount || 0),
    material:       raw.material || null,
    weight:         raw.weight ? `${raw.weight} г` : null,
    size:           raw.size || null,
    isNew:          Boolean(raw.is_new || raw.isNew),
    isHit:          Boolean(raw.is_hit || raw.isHit),
    rating:         Number(raw.rating || 0),
    reviewCount:    Number(raw.review_count || raw.reviewCount || 0),
    createdAt:      raw.created_at || raw.createdAt || null,
  };
}

/**
 * Нормализует поле images в массив строк URL.
 * @param {string|string[]|Object|Object[]} images
 * @returns {string[]}
 */
function normalizeImages(images) {
  if (!images) return [];
  if (typeof images === 'string') return [images];
  if (Array.isArray(images)) {
    return images.map((img) =>
      typeof img === 'string' ? img : img?.url || img?.src || ''
    ).filter(Boolean);
  }
  if (typeof images === 'object') {
    return [images.url || images.src || ''].filter(Boolean);
  }
  return [];
}

/**
 * Определяет бейдж товара на основе флагов.
 * @param {Object} raw
 * @returns {string|null}
 */
function normalizeBadge(raw) {
  if (raw.badge) return raw.badge;
  const discount = raw.discount_percent || raw.discountPercent || 0;
  if (discount > 0)           return PRODUCT_BADGE.SALE;
  if (raw.is_hit || raw.isHit) return PRODUCT_BADGE.HIT;
  if (raw.is_new || raw.isNew) return PRODUCT_BADGE.NEW;
  return null;
}

/**
 * Создаёт mock-объект товара для заглушек/разработки.
 * @param {Partial<Product>} overrides
 * @returns {Product}
 */
export function createMockProduct(overrides = {}) {
  return {
    id:             overrides.id || Math.floor(Math.random() * 10000),
    slug:           overrides.slug || 'mock-product',
    name:           overrides.name || 'Золотое кольцо',
    description:    overrides.description || 'Изысканное украшение ручной работы.',
    price:          overrides.price || 1200,
    discountPercent:overrides.discountPercent || 0,
    discountedPrice:overrides.discountedPrice || overrides.price || 1200,
    images:         overrides.images || [],
    badge:          overrides.badge || null,
    categoryId:     overrides.categoryId || null,
    categorySlug:   overrides.categorySlug || null,
    inStock:        overrides.inStock !== undefined ? overrides.inStock : true,
    stockCount:     overrides.stockCount || 10,
    material:       overrides.material || 'Позолота 18К',
    weight:         overrides.weight || '3.5 г',
    size:           overrides.size || null,
    isNew:          overrides.isNew || false,
    isHit:          overrides.isHit || false,
    rating:         overrides.rating || 4.8,
    reviewCount:    overrides.reviewCount || 0,
    createdAt:      overrides.createdAt || new Date().toISOString(),
  };
}
