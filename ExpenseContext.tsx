import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Expense, ExpenseCategory } from '@/types/expense';
import { useAuth } from './AuthContext';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'userId'>) => void;
  deleteExpense: (id: string) => void;
  getTotalByCategory: (category: ExpenseCategory) => number;
  getTotal: () => number;
  getMonthlyTotal: () => number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`arak_expenses_${user.id}`);
      if (stored) {
        setExpenses(JSON.parse(stored));
      } else {
        setExpenses([]);
      }
    } else {
      setExpenses([]);
    }
  }, [user]);

  const saveExpenses = useCallback((newExpenses: Expense[]) => {
    if (user) {
      localStorage.setItem(`arak_expenses_${user.id}`, JSON.stringify(newExpenses));
    }
  }, [user]);

  const addExpense = useCallback((expense: Omit<Expense, 'id' | 'userId'>) => {
    if (!user) return;
    
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      userId: user.id,
    };
    
    setExpenses(prev => {
      const updated = [newExpense, ...prev];
      saveExpenses(updated);
      return updated;
    });
  }, [user, saveExpenses]);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => {
      const updated = prev.filter(e => e.id !== id);
      saveExpenses(updated);
      return updated;
    });
  }, [saveExpenses]);

  const getTotalByCategory = useCallback((category: ExpenseCategory) => {
    return expenses
      .filter(e => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const getTotal = useCallback(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const getMonthlyTotal = useCallback(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return expenses
      .filter(e => new Date(e.date) >= startOfMonth)
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  return (
    <ExpenseContext.Provider value={{
      expenses,
      addExpense,
      deleteExpense,
      getTotalByCategory,
      getTotal,
      getMonthlyTotal,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
