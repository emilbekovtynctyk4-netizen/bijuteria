/**
 * Orders Service — операции с заказами
 */

import { apiClient } from './client';

export const ordersService = {
  /**
   * Получить список заказов текущего пользователя
   */
  async getOrders(page = 1, limit = 20) {
    return apiClient.get(
      `/api/v1/orders/?page=${page}&limit=${limit}`
    );
  },

  /**
   * Получить заказ по ID
   */
  async getOrder(orderId) {
    return apiClient.get(`/api/v1/orders/${orderId}`);
  },

  /**
   * Создать новый заказ
   */
  async createOrder(orderData) {
    return apiClient.post('/api/v1/orders/', {
      contact_full_name: orderData.fullName,
      contact_phone: orderData.phone,
      contact_address: orderData.address,
      contact_comment: orderData.comment || '',
    });
  },
};
