import React from 'react';
import { useExpenses } from '@/contexts/ExpenseContext';
import { CATEGORY_LABELS, CATEGORY_ICONS, ExpenseCategory } from '@/types/expense';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS: Record<ExpenseCategory, string> = {
  food: '#f97316',
  transport: '#1a73e8',
  health: '#22c55e',
  studies: '#a855f7',
  other: '#6b7280',
};

const CategoryChart: React.FC = () => {
  const { getTotalByCategory, getTotal } = useExpenses();

  const categories: ExpenseCategory[] = ['food', 'transport', 'health', 'studies', 'other'];
  const total = getTotal();

  const data = categories
    .map(cat => ({
      name: CATEGORY_LABELS[cat],
      value: getTotalByCategory(cat),
      category: cat,
      icon: CATEGORY_ICONS[cat],
    }))
    .filter(d => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Répartition par catégorie</h3>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          Ajoutez des dépenses pour voir la répartition
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Répartition par catégorie</h3>
      
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.category]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value.toLocaleString()} DA`, '']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2">
          {data.map((item) => {
            const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
            return (
              <div key={item.category} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[item.category] }}
                  />
                  <span className="text-sm">
                    {item.icon} {item.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-card-foreground">{item.value.toLocaleString()} DA</span>
                  <span className="text-xs text-muted-foreground ml-2">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
