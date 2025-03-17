
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import CompanyDirectoryHeader from '@/components/directory/CompanyDirectoryHeader';
import CompanyFilters from '@/components/directory/CompanyFilters';
import CompanyList from '@/components/directory/CompanyList';
import CompanyMap from '@/components/directory/CompanyMap';
import { ViewMode, CompanyCategory, Company } from '@/types/directory';
import { toast } from 'sonner';

export default function CompanyDirectory() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
  // We don't need to directly fetch companies here, as the child components
  // (CompanyList and CompanyMap) will handle their own data fetching
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CompanyDirectoryHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Filtres (colonne gauche) */}
          <div className="w-64 border-r border-border overflow-y-auto">
            <CompanyFilters 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          
          {/* Contenu principal (colonne centrale + droite) */}
          <div className="flex-1 flex overflow-hidden">
            {/* Liste des entreprises (colonne centrale) */}
            <div className={`${viewMode === 'map' ? 'w-1/2' : 'w-full'} overflow-y-auto`}>
              <CompanyList 
                companies={[]} // Pass empty array as we'll fetch directly in the component
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            </div>
            
            {/* Carte (colonne droite) - visible uniquement en mode carte */}
            {viewMode === 'map' && (
              <div className="w-1/2 border-l border-border overflow-hidden">
                <CompanyMap 
                  companies={[]} // Pass empty array as we'll fetch directly in the component
                  selectedCompany={selectedCompany}
                  setSelectedCompany={setSelectedCompany}
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
