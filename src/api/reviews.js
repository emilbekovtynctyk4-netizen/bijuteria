/**
 * Reviews Service — операции с отзывами
 */

import { apiClient } from './client';

export const reviewsService = {
  /**
   * Получить отзывы товара
   */
  async getReviews(slug, page = 1, limit = 20) {
    return apiClient.get(
      `/api/v1/products/${slug}/reviews/?page=${page}&limit=${limit}`
    );
  },

  /**
   * Создать отзыв
   */
  async createReview(slug, rating, text = '') {
    return apiClient.post(`/api/v1/products/${slug}/reviews/`, {
      rating,
      text,
    });
  },

  /**
   * Обновить отзыв (только для администратора)
   */
  async updateReview(reviewId, isPublished) {
    return apiClient.patch(`/api/v1/admin/reviews/${reviewId}`, {
      is_published: isPublished,
    });
  },
};
