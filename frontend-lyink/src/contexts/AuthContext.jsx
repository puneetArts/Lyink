import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${stored}` }
      }).then(res => setUser({ ...res.data, token: stored }))
    .catch(() => setUser(null));
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    const res = await axios.get("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser({ ...res.data, token });
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
