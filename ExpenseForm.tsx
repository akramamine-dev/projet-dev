import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExpenseCategory, CATEGORY_LABELS, CATEGORY_ICONS } from '@/types/expense';
import { useExpenses } from '@/contexts/ExpenseContext';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenses();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('other');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Erreur",
        description: "Le montant doit être un nombre positif",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    addExpense({
      description: description.trim(),
      amount: amountNum,
      category,
      date: new Date().toISOString(),
    });

    toast({
      title: "Dépense ajoutée",
      description: `${amountNum.toLocaleString()} DA - ${description}`,
    });

    setDescription('');
    setAmount('');
    setCategory('other');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-lg border border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-accent" />
        Nouvelle Dépense
      </h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="description" className="text-sm font-medium">Description</Label>
          <Input
            id="description"
            placeholder="Ex: Déjeuner au restaurant"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount" className="text-sm font-medium">Montant (DA)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              min="0"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium">Catégorie</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as ExpenseCategory)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(CATEGORY_LABELS) as ExpenseCategory[]).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    <span className="flex items-center gap-2">
                      {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" variant="dashboard" className="w-full" disabled={isLoading}>
          {isLoading ? 'Ajout...' : 'Ajouter la dépense'}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
