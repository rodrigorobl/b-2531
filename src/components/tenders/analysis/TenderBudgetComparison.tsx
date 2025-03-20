
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface TenderBudgetComparisonProps {
  tenderId: string;
}

// Mock data for demonstration
const mockBudgetData = {
  plannedBudget: 2400000,
  simulatedBudget: 2320000,
  difference: 80000,
  differencePercentage: 3.33
};

const TenderBudgetComparison: React.FC<TenderBudgetComparisonProps> = ({ tenderId }) => {
  const [data, setData] = useState({
    plannedBudget: 0,
    simulatedBudget: 0,
    difference: 0,
    differencePercentage: 0
  });

  useEffect(() => {
    console.log("Loading budget comparison for tender:", tenderId);
    // In a real app, we would fetch budget data based on tenderId
    // For now, use mock data
    setData(mockBudgetData);
  }, [tenderId]);

  const { plannedBudget, simulatedBudget, difference, differencePercentage } = data;
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
