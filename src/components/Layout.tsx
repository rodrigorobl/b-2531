
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Check if current route is one of the full-width pages
  const isFullWidthPage = [
    '/dashboard-industry',
    '/product-reference',
    '/product-prescription',
    '/projects-search'
  ].includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className={`flex-1 overflow-auto ${isFullWidthPage ? 'p-0' : 'bg-muted/30'}`}>
        {children}
      </main>
    </div>
  );
};
