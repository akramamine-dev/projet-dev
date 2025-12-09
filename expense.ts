export type ExpenseCategory = 'food' | 'transport' | 'health' | 'studies' | 'other';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: 'Nourriture',
  transport: 'Transport',
  health: 'Santé',
  studies: 'Études',
  other: 'Autres',
};

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  food: '🍽️',
  transport: '🚗',
  health: '🏥',
  studies: '📚',
  other: '📦',
};
