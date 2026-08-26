// ============================================================
// AuthContext — temporary frontend-only authentication
// Stores auth state in localStorage.
// Isolate this file for easy replacement with Spring Boot JWT auth.
// ============================================================

import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('emandi_user');
      const storedToken = localStorage.getItem('emandi_token');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (e) {
      localStorage.removeItem('emandi_user');
      localStorage.removeItem('emandi_token');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const result = await apiLogin(credentials);
    if (result.success) {
      setUser(result.user);
      setToken(result.token);
      localStorage.setItem('emandi_user', JSON.stringify(result.user));
      localStorage.setItem('emandi_token', result.token);
    }
    return result;
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('emandi_user');
    localStorage.removeItem('emandi_token');
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
