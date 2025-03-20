
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface TenderBudgetComparisonProps {
  plannedBudget: number;
  simulatedBudget: number;
  difference: number;
  differencePercentage: number;
}

const TenderBudgetComparison: React.FC<TenderBudgetComparisonProps> = ({
  plannedBudget,
  simulatedBudget,
  difference,
  differencePercentage
}) => {
  const isPositiveDifference = difference > 0;
  const formattedPlannedBudget = plannedBudget.toLocaleString() + ' €';
  const formattedSimulatedBudget = simulatedBudget.toLocaleString() + ' €';
  const formattedDifference = Math.abs(difference).toLocaleString() + ' €';
  const formattedPercentage = Math.abs(differencePercentage).toFixed(1) + '%';
  
  // Calculate progress percentage for the bar, capped between 0 and 100
  const progressPercentage = Math.min(100, Math.max(0, simulatedBudget / plannedBudget * 100));
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Budget prévu</span>
          <span className="text-sm font-medium">{formattedPlannedBudget}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Budget simulé</span>
          <span className="text-sm font-medium">{formattedSimulatedBudget}</span>
        </div>
      </div>
      
      <div className="pt-2">
        <Progress 
          value={progressPercentage} 
          className="h-4" 
          indicatorClassName={isPositiveDifference ? "bg-green-500" : "bg-red-500"}
        />
      </div>
      
      <div className={`flex items-center gap-2 ${isPositiveDifference ? 'text-green-600' : 'text-red-500'}`}>
        {isPositiveDifference ? (
          <ArrowDown className="h-4 w-4" />
        ) : (
          <ArrowUp className="h-4 w-4" />
        )}
        <div>
          <span className="font-medium">{formattedDifference}</span>
          <span className="text-sm ml-1">({formattedPercentage})</span>
          <p className="text-sm">
            {isPositiveDifference 
              ? "Économie réalisée" 
              : "Dépassement budgétaire"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TenderBudgetComparison;
