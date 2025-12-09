import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ExpenseProvider } from '@/contexts/ExpenseContext';
import StatsCards from '@/components/StatsCards';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import CategoryChart from '@/components/CategoryChart';
import { Button } from '@/components/ui/button';
import { LogOut, Wallet } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-dashboard text-accent-foreground sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-foreground/20 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ARAK</h1>
                <p className="text-xs text-accent-foreground/80">Daily Expenses Tracker</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm hidden sm:block">
                Bonjour, <span className="font-medium">{user?.name}</span>
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-accent-foreground hover:bg-accent-foreground/20">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats */}
          <section>
            <StatsCards />
          </section>

          {/* Form & Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpenseForm />
            <CategoryChart />
          </div>

          {/* Expense List */}
          <section>
            <ExpenseList />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 ARAK Daily Expenses Tracker</p>
          <p className="text-xs mt-1">Équipe DevOps: Akram · Reda · Achraf · Khaled</p>
        </div>
      </footer>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <ExpenseProvider>
      <DashboardContent />
    </ExpenseProvider>
  );
};

export default Dashboard;
