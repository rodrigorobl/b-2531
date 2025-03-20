
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface MatchingProgressProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function MatchingProgress({ 
  score, 
  showLabel = true,
  size = 'md'
}: MatchingProgressProps) {
  // Determine color based on score
  const getColorClass = () => {
    if (score < 40) return 'bg-red-500';
    if (score < 70) return 'bg-orange-500';
    return 'bg-green-500';
  };
  
  // Determine size based on prop
  const getHeightClass = () => {
    switch(size) {
      case 'sm': return 'h-1.5';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Correspondance</span>
          <span className={cn(
            "font-medium",
            score < 40 ? "text-red-500" : 
            score < 70 ? "text-orange-500" : 
            "text-green-500"
          )}>
            {score}/100
          </span>
        </div>
      )}
      <Progress 
        value={score} 
        className={cn("w-full bg-gray-100", getHeightClass())}
        indicatorClassName={getColorClass()}
      />
    </div>
  );
}
