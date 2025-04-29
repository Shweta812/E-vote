import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupRequest, loginRequest } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const { data } = await loginRequest(credentials);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/dashboard');
  };

  const signup = async (info) => {
    const { data } = await signupRequest(info);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <p>Loading auth...</p>;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};