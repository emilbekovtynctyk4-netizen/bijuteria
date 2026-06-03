/**
 * Admin Service — операции администратора (товары, категории, заказы)
 */

import { apiClient } from './client';

export const adminService = {
  // ============== Products ==============

  /**
   * Получить список товаров (администратор)
   */
  async listProducts() {
    return apiClient.get('/api/v1/admin/products');
  },

  /**
   * Получить товар (администратор)
   */
  async getProduct(productId) {
    return apiClient.get(`/api/v1/admin/products/${productId}`);
  },

  /**
   * Создать товар
   */
  async createProduct(productData) {
    return apiClient.post('/api/v1/admin/products', {
      name: productData.name,
      slug: productData.slug,
      description: productData.description,
      short_description: productData.shortDescription,
      price: productData.price,
      discount_percent: productData.discountPercent || '0.00',
      status: productData.status || 'active',
      is_new: productData.isNew || false,
      is_on_sale: productData.isOnSale || false,
      stock_quantity: productData.stockQuantity || 0,
      brand: productData.brand,
      sku: productData.sku,
      weight_grams: productData.weightGrams,
      category_id: productData.categoryId,
    });
  },

  /**
   * Обновить товар
   */
  async updateProduct(productId, productData) {
    return apiClient.put(
      `/api/v1/admin/products/${productId}`,
      productData
    );
  },

  /**
   * Удалить товар
   */
  async deleteProduct(productId) {
    return apiClient.delete(`/api/v1/admin/products/${productId}`);
  },

  // ============== Product Images ==============

  /**
   * Загрузить изображение товара
   */
  async uploadImage(productId, file) {
    const formData = new FormData();
    formData.append('file', file);

    const tokens = apiClient.getTokens();
    const headers = {};
    if (tokens?.access_token) {
      headers['Authorization'] = `Bearer ${tokens.access_token}`;
    }

    const response = await fetch(
      `${apiClient.baseURL}/api/v1/admin/products/${productId}/images/upload`,
      {
        method: 'POST',
        headers,
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },

  /**
   * Создать изображение товара
   */
  async createImage(productId, url, altText = '', isMain = false) {
    return apiClient.post(
      `/api/v1/admin/products/${productId}/images`,
      {
        url,
        alt_text: altText,
        is_main: isMain,
      }
    );
  },

  /**
   * Обновить изображение
   */
  async updateImage(imageId, data) {
    return apiClient.put(`/api/v1/admin/images/${imageId}`, data);
  },

  /**
   * Удалить изображение
   */
  async deleteImage(imageId) {
    return apiClient.delete(`/api/v1/admin/images/${imageId}`);
  },

  // ============== Categories ==============

  /**
   * Получить список категорий (администратор)
   */
  async listCategories() {
    return apiClient.get('/api/v1/admin/categories');
  },

  /**
   * Получить категорию (администратор)
   */
  async getCategory(categoryId) {
    return apiClient.get(`/api/v1/admin/categories/${categoryId}`);
  },

  /**
   * Создать категорию
   */
  async createCategory(categoryData) {
    return apiClient.post('/api/v1/admin/categories', categoryData);
  },

  /**
   * Обновить категорию
   */
  async updateCategory(categoryId, categoryData) {
    return apiClient.put(
      `/api/v1/admin/categories/${categoryId}`,
      categoryData
    );
  },

  /**
   * Удалить категорию
   */
  async deleteCategory(categoryId) {
    return apiClient.delete(`/api/v1/admin/categories/${categoryId}`);
  },

  // ============== Orders ==============

  /**
   * Получить список заказов (администратор)
   */
  async listOrders(status = null) {
    const url = status
      ? `/api/v1/admin/orders?status=${status}`
      : '/api/v1/admin/orders';
    return apiClient.get(url);
  },

  /**
   * Получить заказ (администратор)
   */
  async getOrder(orderId) {
    return apiClient.get(`/api/v1/admin/orders/${orderId}`);
  },

  /**
   * Получить историю заказа
   */
  async getOrderHistory(orderId) {
    return apiClient.get(`/api/v1/admin/orders/${orderId}/history`);
  },

  /**
   * Обновить статус заказа
   */
  async updateOrderStatus(orderId, status, adminNote = '') {
    return apiClient.patch(`/api/v1/admin/orders/${orderId}/status`, {
      status,
      admin_note: adminNote,
    });
  },

  // ============== Feedback ==============

  /**
   * Получить список обратной связи (администратор)
   */
  async listFeedback(status = null) {
    const url = status
      ? `/api/v1/admin/feedback?status=${status}`
      : '/api/v1/admin/feedback';
    return apiClient.get(url);
  },

  /**
   * Получить обратную связь
   */
  async getFeedback(feedbackId) {
    return apiClient.get(`/api/v1/admin/feedback/${feedbackId}`);
  },

  /**
   * Обновить обратную связь
   */
  async updateFeedback(feedbackId, status, adminReply = '') {
    return apiClient.patch(`/api/v1/admin/feedback/${feedbackId}`, {
      status,
      admin_reply: adminReply,
    });
  },

  // ============== Users ==============

  /**
   * Получить список пользователей (администратор)
   */
  async listUsers() {
    return apiClient.get('/api/v1/admin/users');
  },

  /**
   * Обновить пользователя (администратор)
   */
  async updateUser(userId, userData) {
    return apiClient.patch(`/api/v1/admin/users/${userId}`, userData);
  },
};
