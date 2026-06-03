/**
 * Auth Context — контекст для управления аутентификацией
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../api/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Инициализировать пользователя из localStorage при загрузке
  useEffect(() => {
    const initUser = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = await authService.me();
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        setError(err?.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      await authService.login(email, password);
      const currentUser = await authService.me();
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      setError(err?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (email, password, fullName = '', phone = '') => {
      try {
        setLoading(true);
        setError(null);
        await authService.register(email, password, fullName, phone);
        const currentUser = await authService.me();
        setUser(currentUser);
        return currentUser;
      } catch (err) {
        setError(err?.message || 'Registration failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook для использования контекста аутентификации
 */
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
