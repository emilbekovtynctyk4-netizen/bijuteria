/**
 * Cart Service — операции с корзиной
 */

import { apiClient } from './client';

export const cartService = {
  /**
   * Получить корзину
   */
  async getCart() {
    return apiClient.get('/api/v1/cart/');
  },

  /**
   * Добавить товар в корзину
   */
  async addToCart(productId, quantity = 1) {
    return apiClient.post('/api/v1/cart/', {
      product_id: productId,
      quantity,
    });
  },

  /**
   * Обновить количество товара в корзине
   */
  async updateCartItem(itemId, quantity) {
    return apiClient.put(`/api/v1/cart/${itemId}`, { quantity });
  },

  /**
   * Удалить товар из корзины
   */
  async removeFromCart(itemId) {
    return apiClient.delete(`/api/v1/cart/${itemId}`);
  },

  /**
   * Очистить корзину
   */
  async clearCart() {
    return apiClient.delete('/api/v1/cart/');
  },
};
