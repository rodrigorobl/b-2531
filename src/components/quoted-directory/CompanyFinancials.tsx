
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  TrendingUp, 
  Shield, 
  HelpCircle, 
  Calendar 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface FinancialsData {
  solvabilityScore: number;
  administrativeScore: number;
  lastUpdated: string;
}

interface CompanyFinancialsProps {
  financials: FinancialsData;
}

export default function CompanyFinancials({ financials }: CompanyFinancialsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp size={16} />
          Indicateurs
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Calendar size={12} />
          Mis à jour le {financials.lastUpdated}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1">
              <TrendingUp size={16} className="text-muted-foreground" />
              <span className="text-sm">Score de solvabilité</span>
              <HelpCircle size={14} className="text-muted-foreground" />
            </div>
            <span className={`font-bold text-lg ${getScoreColor(financials.solvabilityScore)}`}>
              {financials.solvabilityScore}/100
            </span>
          </div>
          <Progress 
            value={financials.solvabilityScore} 
            className="h-2" 
            indicatorClassName={getProgressColor(financials.solvabilityScore)} 
          />
          <div className="mt-1 text-xs text-right text-muted-foreground">
            Source: InfoLégale
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1">
              <Shield size={16} className="text-muted-foreground" />
              <span className="text-sm">Score administratif</span>
              <HelpCircle size={14} className="text-muted-foreground" />
            </div>
            <span className={`font-bold text-lg ${getScoreColor(financials.administrativeScore)}`}>
              {financials.administrativeScore}/100
            </span>
          </div>
          <Progress 
            value={financials.administrativeScore} 
            className="h-2" 
            indicatorClassName={getProgressColor(financials.administrativeScore)} 
          />
          <div className="mt-1 text-xs text-right text-muted-foreground">
            Source: E-Attestations
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-2">
          Voir le rapport complet
        </Button>
      </CardContent>
    </Card>
  );
}
