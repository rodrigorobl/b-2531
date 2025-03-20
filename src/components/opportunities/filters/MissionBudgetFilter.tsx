
import React from 'react';
import { Wallet } from 'lucide-react';
import { RangeSliderFilter } from './RangeSliderFilter';

interface MissionBudgetFilterProps {
  budgetRange: number[];
  setBudgetRange: (value: number[]) => void;
}

export function MissionBudgetFilter({ budgetRange, setBudgetRange }: MissionBudgetFilterProps) {
  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <RangeSliderFilter
      icon={Wallet}
      label="Budget de la mission"
      value={budgetRange}
      min={0}
      max={3000000}
      step={50000}
      onChange={setBudgetRange}
      formatValue={formatBudget}
    />
  );
}
