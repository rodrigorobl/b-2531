
import React, { useState } from 'react';
import { ProjectTypeFilter } from './filters/ProjectTypeFilter';
import { LocationFilter } from './filters/LocationFilter';
import { BudgetFilter } from './filters/BudgetFilter';
import { SurfaceFilter } from './filters/SurfaceFilter';
import { BatchFilter } from './filters/BatchFilter';
import { DateRangeFilter } from './filters/DateRangeFilter';
import { ClientSearchFilter } from './filters/ClientSearchFilter';
import { FavoritesFilter } from './filters/FavoritesFilter';
import { FilterActions } from './filters/FilterActions';
import { DceKeywordsFilter } from './filters/DceKeywordsFilter';

export default function TenderSearchFilters() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [budgetRange, setBudgetRange] = useState([0, 10000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 30000]);
  
  return (
    <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm p-4 mr-4 overflow-auto">
      <h3 className="font-medium mb-4">Filtres avancés</h3>
      
      <div className="space-y-6">
        <ProjectTypeFilter />
        <LocationFilter />
        <BudgetFilter budgetRange={budgetRange} setBudgetRange={setBudgetRange} />
        <SurfaceFilter surfaceRange={surfaceRange} setSurfaceRange={setSurfaceRange} />
        <BatchFilter />
        <DceKeywordsFilter />
        <DateRangeFilter />
        <ClientSearchFilter />
        <FavoritesFilter showFavorites={showFavorites} setShowFavorites={setShowFavorites} />
        <FilterActions />
      </div>
    </div>
  );
}
