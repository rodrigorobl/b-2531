
import React from 'react';
import { Euro } from 'lucide-react';
import { RangeSliderFilter } from './RangeSliderFilter';

interface BudgetFilterProps {
  budgetRange: number[];
  setBudgetRange: (value: number[]) => void;
}

export function BudgetFilter({ budgetRange, setBudgetRange }: BudgetFilterProps) {
  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <RangeSliderFilter
      icon={Euro}
      label="Budget du projet"
      value={budgetRange}
      min={0}
      max={100000000}
      step={1000000}
      onChange={setBudgetRange}
      formatValue={formatBudget}
    />
  );
}
