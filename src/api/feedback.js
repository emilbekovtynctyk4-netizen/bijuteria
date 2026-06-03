/**
 * Feedback Service — операции с обратной связью
 */

import { apiClient } from './client';

export const feedbackService = {
  /**
   * Создать обратную связь
   */
  async createFeedback(name, email, message, phone = '', subject = '') {
    return apiClient.post('/api/v1/feedback/', {
      name,
      email,
      phone,
      subject,
      message,
    });
  },
};
