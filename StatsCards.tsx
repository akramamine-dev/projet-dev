import React from 'react';
import { useExpenses } from '@/contexts/ExpenseContext';
import { CATEGORY_LABELS, CATEGORY_ICONS, ExpenseCategory } from '@/types/expense';
import { TrendingUp, Calendar, Wallet } from 'lucide-react';

const StatsCards: React.FC = () => {
  const { getTotal, getMonthlyTotal, getTotalByCategory, expenses } = useExpenses();

  const total = getTotal();
  const monthlyTotal = getMonthlyTotal();

  const categories: ExpenseCategory[] = ['food', 'transport', 'health', 'studies', 'other'];
  const categoryTotals = categories.map(cat => ({
    category: cat,
    total: getTotalByCategory(cat),
  })).sort((a, b) => b.total - a.total);

  const topCategory = categoryTotals[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border animate-slide-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg gradient-dashboard flex items-center justify-center">
            <Wallet className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Total Général</span>
        </div>
        <p className="text-3xl font-bold text-card-foreground">
          {total.toLocaleString()} <span className="text-lg text-muted-foreground">DA</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">{expenses.length} dépenses</p>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-lg border border-border animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Ce Mois</span>
        </div>
        <p className="text-3xl font-bold text-card-foreground">
          {monthlyTotal.toLocaleString()} <span className="text-lg text-muted-foreground">DA</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-lg border border-border animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Top Catégorie</span>
        </div>
        {topCategory && topCategory.total > 0 ? (
          <>
            <p className="text-xl font-bold text-card-foreground flex items-center gap-2">
              {CATEGORY_ICONS[topCategory.category]} {CATEGORY_LABELS[topCategory.category]}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {topCategory.total.toLocaleString()} DA
            </p>
          </>
        ) : (
          <p className="text-muted-foreground">Aucune donnée</p>
        )}
      </div>
    </div>
  );
};

export default StatsCards;
