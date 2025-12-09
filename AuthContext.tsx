import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, AuthState } from '@/types/expense';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = localStorage.getItem('arak_user');
    if (stored) {
      return { user: JSON.parse(stored), isAuthenticated: true };
    }
    return { user: null, isAuthenticated: false };
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulation d'authentification (à remplacer par API réelle)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = JSON.parse(localStorage.getItem('arak_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const userData: User = { id: user.id, email: user.email, name: user.name };
      localStorage.setItem('arak_user', JSON.stringify(userData));
      setAuthState({ user: userData, isAuthenticated: true });
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = JSON.parse(localStorage.getItem('arak_users') || '[]');
    
    if (users.some((u: any) => u.email === email)) {
      return false;
    }
    
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };
    
    users.push(newUser);
    localStorage.setItem('arak_users', JSON.stringify(users));
    
    const userData: User = { id: newUser.id, email: newUser.email, name: newUser.name };
    localStorage.setItem('arak_user', JSON.stringify(userData));
    setAuthState({ user: userData, isAuthenticated: true });
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('arak_user');
    setAuthState({ user: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
