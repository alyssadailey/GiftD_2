import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  // For demo purposes: replace with backend authentication later
  const validUsers = [
    { username: "test@example.com", password: "123456" },
    { username: "admin@example.com", password: "adminpass" },
  ];

  const login = (username: string, password: string): boolean => {
    const foundUser = validUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(username);
      localStorage.setItem("user", username);
      return true; // success
    }
    return false; // failed login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};