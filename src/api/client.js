/**
 * API Client — базовый HTTP клиент для всех запросов
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Получить токены из localStorage
   */
  getTokens() {
    const tokens = localStorage.getItem('tokens');
    return tokens ? JSON.parse(tokens) : null;
  }

  /**
   * Сохранить токены в localStorage
   */
  setTokens(tokens) {
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }

  /**
   * Удалить токены
   */
  clearTokens() {
    localStorage.removeItem('tokens');
  }

  /**
   * Получить текущего пользователя из localStorage
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Сохранить текущего пользователя
   */
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удалить текущего пользователя
   */
  clearUser() {
    localStorage.removeItem('user');
  }

  /**
   * Основной метод для HTTP запросов
   */
  async request(method, url, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Добавить токен авторизации если есть
    const tokens = this.getTokens();
    if (tokens?.access_token) {
      headers['Authorization'] = `Bearer ${tokens.access_token}`;
    }

    const config = {
      method,
      headers,
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${url}`, config);

      // Обработать 401 — токен истёк
      if (response.status === 401 && tokens?.refresh_token) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Повторить оригинальный запрос с новым токеном
          return this.request(method, url, options);
        }
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const err = new Error(error.detail || 'API Error');
        err.status = response.status;
        err.data = error;
        throw err;
      }

      // Пустой ответ (204 No Content)
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`[${method}] ${url}`, error);
      throw error;
    }
  }

  /**
   * GET запрос
   */
  get(url, options = {}) {
    return this.request('GET', url, options);
  }

  /**
   * POST запрос
   */
  post(url, data, options = {}) {
    return this.request('POST', url, {
      ...options,
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT запрос
   */
  put(url, data, options = {}) {
    return this.request('PUT', url, {
      ...options,
      body: JSON.stringify(data),
    });
  }

  /**
   * PATCH запрос
   */
  patch(url, data, options = {}) {
    return this.request('PATCH', url, {
      ...options,
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE запрос
   */
  delete(url, options = {}) {
    return this.request('DELETE', url, options);
  }

  /**
   * Обновить токен доступа
   */
  async refreshToken() {
    const tokens = this.getTokens();
    if (!tokens?.refresh_token) {
      this.clearTokens();
      return false;
    }

    try {
      const response = await fetch(`${this.baseURL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: tokens.refresh_token }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          this.setTokens({
            access_token: data.access_token,
            refresh_token: data.refresh_token || tokens.refresh_token,
          });
          return true;
        }
      }

      this.clearTokens();
      return false;
    } catch (error) {
      console.error('Refresh token failed:', error);
      this.clearTokens();
      return false;
    }
  }
}

export const apiClient = new APIClient();
