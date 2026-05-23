import { useState } from 'react';
import { login as loginRequest, logout as logoutRequest } from '../api/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginRequest(credentials);
      setUser(response?.user || null);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutRequest();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login, logout };
}
