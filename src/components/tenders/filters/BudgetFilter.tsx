
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
      label="Budget estimé"
      value={budgetRange}
      min={0}
      max={10000000}
      step={100000}
      onChange={setBudgetRange}
      formatValue={formatBudget}
    />
  );
}
