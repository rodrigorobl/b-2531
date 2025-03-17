
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMyTenders } from '@/hooks/useMyTenders';
import MyTendersTable from '@/components/tenders/MyTendersTable';
import MyTendersFilters from '@/components/tenders/MyTendersFilters';

export default function MyTenders() {
  const { 
    projects, 
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter 
  } = useMyTenders();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Mes appels d'offres</h1>
          <p className="text-muted-foreground">
            Consultez les appels d'offres pour lesquels vous avez soumis un devis.
          </p>
        </div>
        
        <MyTendersFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Appels d'offres participés</CardTitle>
          </CardHeader>
          <CardContent>
            <MyTendersTable 
              projects={projects}
              isLoading={isLoading}
              error={error}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
