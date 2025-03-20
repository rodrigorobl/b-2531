
import React, { useState } from 'react';
import { ProjectTypeFilter } from '@/components/opportunities/filters/ProjectTypeFilter';
import { MissionsFilter } from '@/components/opportunities/filters/MissionsFilter';
import { LocationFilter } from '@/components/opportunities/filters/LocationFilter';
import { BudgetFilter } from '@/components/opportunities/filters/BudgetFilter';
import { MissionBudgetFilter } from '@/components/opportunities/filters/MissionBudgetFilter';
import { ProjectPhaseFilter } from '@/components/opportunities/filters/ProjectPhaseFilter';
import { ClientFilter } from '@/components/opportunities/filters/ClientFilter';
import { DateRangeFilter } from '@/components/opportunities/filters/DateRangeFilter';
import { FilterActions } from '@/components/opportunities/filters/FilterActions';

export default function OpportunitySearchFilters() {
  const [budgetRange, setBudgetRange] = useState([0, 100000000]);
  const [missionBudgetRange, setMissionBudgetRange] = useState([0, 3000000]);
  
  return (
    <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm p-4 mr-4 overflow-auto">
      <h3 className="font-medium mb-4">Filtres avancés</h3>
      
      <div className="space-y-6">
        <ProjectTypeFilter />
        <MissionsFilter />
        <LocationFilter />
        <BudgetFilter budgetRange={budgetRange} setBudgetRange={setBudgetRange} />
        <MissionBudgetFilter budgetRange={missionBudgetRange} setBudgetRange={setMissionBudgetRange} />
        <ProjectPhaseFilter />
        <ClientFilter />
        <DateRangeFilter />
        <FilterActions />
      </div>
    </div>
  );
}
