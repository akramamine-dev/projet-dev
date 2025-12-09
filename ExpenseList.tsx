import React from 'react';
import { useExpenses } from '@/contexts/ExpenseContext';
import { CATEGORY_LABELS, CATEGORY_ICONS, ExpenseCategory } from '@/types/expense';
import { Button } from '@/components/ui/button';
import { Trash2, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const categoryColorClasses: Record<ExpenseCategory, string> = {
  food: 'bg-category-food/10 text-category-food border-category-food/20',
  transport: 'bg-category-transport/10 text-category-transport border-category-transport/20',
  health: 'bg-category-health/10 text-category-health border-category-health/20',
  studies: 'bg-category-studies/10 text-category-studies border-category-studies/20',
  other: 'bg-category-other/10 text-category-other border-category-other/20',
};

const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense } = useExpenses();

  if (expenses.length === 0) {
    return (
      <div className="bg-card rounded-xl p-8 shadow-lg border border-border text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Receipt className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-card-foreground mb-2">Aucune dépense</h3>
        <p className="text-muted-foreground text-sm">
          Commencez à ajouter vos dépenses pour les suivre
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <Receipt className="w-5 h-5 text-accent" />
          Historique ({expenses.length})
        </h3>
      </div>
      
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {expenses.map((expense, index) => (
          <div
            key={expense.id}
            className="p-4 hover:bg-muted/50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${categoryColorClasses[expense.category]}`}>
                  {CATEGORY_ICONS[expense.category]} {CATEGORY_LABELS[expense.category]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-card-foreground truncate">{expense.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(expense.date), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="font-bold text-accent whitespace-nowrap">
                  {expense.amount.toLocaleString()} DA
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteExpense(expense.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
