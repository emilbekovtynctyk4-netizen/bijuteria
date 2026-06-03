/**
 * Auth Service — операции с аутентификацией
 */

import { apiClient } from './client';

export const authService = {
  /**
   * Регистрация нового пользователя
   */
  async register(email, password, fullName = '', phone = '') {
    const response = await apiClient.post('/api/v1/auth/register', {
      email,
      password,
      full_name: fullName,
      phone,
    });
    if (response.access_token) {
      apiClient.setTokens({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      });
    }
    return response;
  },

  /**
   * Вход в аккаунт
   */
  async login(email, password) {
    const response = await apiClient.post('/api/v1/auth/login', {
      email,
      password,
    });
    if (response.access_token) {
      apiClient.setTokens({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      });
    }
    return response;
  },

  /**
   * Получить текущего пользователя
   */
  async me() {
    const user = await apiClient.get('/api/v1/auth/me');
    if (user) {
      apiClient.setUser(user);
    }
    return user;
  },

  /**
   * Выход из аккаунта
   */
  logout() {
    apiClient.clearTokens();
    apiClient.clearUser();
  },

  /**
   * Отправить письмо подтверждения
   */
  async sendConfirmation() {
    return apiClient.post('/api/v1/auth/send-confirmation', {});
  },

  /**
   * Подтвердить email
   */
  async confirmEmail(token) {
    return apiClient.post('/api/v1/auth/confirm-email', { token });
  },

  /**
   * Забыли пароль
   */
  async forgotPassword(email) {
    return apiClient.post('/api/v1/auth/forgot-password', { email });
  },

  /**
   * Сбросить пароль
   */
  async resetPassword(token, newPassword) {
    return apiClient.post('/api/v1/auth/reset-password', {
      token,
      new_password: newPassword,
    });
  },

  /**
   * Проверить, авторизован ли пользователь
   */
  isAuthenticated() {
    return !!apiClient.getTokens()?.access_token;
  },

  /**
   * Получить сохранённого пользователя
   */
  getUser() {
    return apiClient.getUser();
  },
};

// Legacy exports для совместимости
export async function login(credentials) {
  return authService.login(credentials.email, credentials.password);
}

export async function logout() {
  return authService.logout();
}
