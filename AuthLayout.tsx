import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen gradient-auth flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm mb-4">
            <span className="text-3xl">💰</span>
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            ARAK
          </h1>
          <p className="text-primary-foreground/80 text-sm">
            Daily Expenses Tracker
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-card-foreground">{title}</h2>
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          </div>
          {children}
        </div>

        <p className="text-center text-primary-foreground/60 text-xs mt-6">
          © 2024 ARAK - Équipe DevOps
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
