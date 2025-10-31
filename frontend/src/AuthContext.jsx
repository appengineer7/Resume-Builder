
// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/current-user`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        const freshUser = data.user;
        setUser(freshUser);
        setIsLoggedIn(true);
        localStorage.setItem("currentUser", JSON.stringify(freshUser));
      } else {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("currentUser");
      }
    } catch (e) {
      console.error(e);
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("currentUser");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/current-user`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsLoggedIn(true);
        // Save to localStorage so PaymentSuccess can update it
        localStorage.setItem("currentUser", JSON.stringify(data.user));
      } else {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("currentUser");
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("currentUser");
    } finally {
      setLoading(false);
    }
  };

  // Load from localStorage first (fast UI)
  const cached = localStorage.getItem("currentUser");
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      setUser(parsed);
      setIsLoggedIn(true);
    } catch {}
  }

  checkAuth();
}, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}; 