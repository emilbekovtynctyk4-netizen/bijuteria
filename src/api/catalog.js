/**
 * Catalog Service — операции с каталогом и товарами
 */

import { apiClient } from './client';

export const catalogService = {
  /**
   * Получить список категорий
   */
  async getCategories() {
    return apiClient.get('/api/v1/catalog/categories');
  },

  /**
   * Получить категорию по слагу
   */
  async getCategory(slug) {
    return apiClient.get(`/api/v1/catalog/categories/${slug}`);
  },

  /**
   * Получить популярные категории
   */
  async getPopularCategories(limit = 10) {
    return apiClient.get(`/api/v1/catalog/popular-categories?limit=${limit}`);
  },

  /**
   * Получить список товаров с фильтрацией
   */
  async getProducts(options = {}) {
    const params = new URLSearchParams();
    
    if (options.category) params.append('category', options.category);
    if (options.isNew !== undefined) params.append('is_new', options.isNew);
    if (options.isHit !== undefined) params.append('is_hit', options.isHit);
    if (options.isOnSale !== undefined) params.append('is_on_sale', options.isOnSale);
    if (options.brand) params.append('brand', options.brand);
    if (options.search) params.append('q', options.search);
    if (options.sort) params.append('sort', options.sort || '-created_at');
    if (options.page) params.append('page', options.page || 1);
    if (options.limit) params.append('limit', options.limit || 20);

    return apiClient.get(`/api/v1/catalog/products?${params.toString()}`);
  },

  /**
   * Получить товар по слагу
   */
  async getProduct(slug) {
    return apiClient.get(`/api/v1/catalog/products/${slug}`);
  },

  /**
   * Получить список брендов
   */
  async getBrands() {
    return apiClient.get('/api/v1/catalog/brands');
  },

  /**
   * Получить комментарии к товару
   */
  async getComments(slug) {
    return apiClient.get(`/api/v1/catalog/products/${slug}/comments`);
  },

  /**
   * Создать комментарий
   */
  async createComment(slug, text) {
    return apiClient.post(`/api/v1/products/${slug}/comments/`, { text });
  },

  /**
   * Обновить комментарий
   */
  async updateComment(slug, commentId, text) {
    return apiClient.put(
      `/api/v1/products/${slug}/comments/${commentId}`,
      { text }
    );
  },

  /**
   * Удалить комментарий
   */
  async deleteComment(slug, commentId) {
    return apiClient.delete(
      `/api/v1/products/${slug}/comments/${commentId}`
    );
  },
};

// Legacy exports для совместимости
export async function fetchCatalog() {
  return catalogService.getProducts();
}

export async function fetchProduct(id) {
  return catalogService.getProduct(id);
}
