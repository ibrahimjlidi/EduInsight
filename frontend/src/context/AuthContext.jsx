import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from './api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const persistedUser = localStorage.getItem('eduUser');
    if (persistedUser) {
      try {
        const parsed = JSON.parse(persistedUser);
        setUser(parsed.user || null);
      } catch {
        localStorage.removeItem('eduUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setAuthError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      const payload = response.data;
      localStorage.setItem('eduUser', JSON.stringify(payload));
      setUser(payload.user);
      return payload;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setAuthError(message);
      throw error;
    }
  };

  const register = async (formData) => {
    setAuthError('');
    try {
      const response = await api.post('/auth/register', formData);
      const payload = response.data;
      localStorage.setItem('eduUser', JSON.stringify(payload));
      setUser(payload.user);
      return payload;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      setAuthError(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('eduUser');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, authError, login, register, logout }),
    [user, loading, authError]
  );

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
