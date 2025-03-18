
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, Calendar, Shield, HelpCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface FinancialsCardProps {
  solvabilityScore: number;
  administrativeScore: number;
  lastUpdated: string;
}

export function FinancialsCard({ solvabilityScore, administrativeScore, lastUpdated }: FinancialsCardProps) {
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
        <CardTitle className="flex items-center gap-2 text-xl">
          <BadgeDollarSign size={18} />
          Scoring financier et administratif
        </CardTitle>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          Mis à jour le {lastUpdated}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1">
                <BadgeDollarSign size={16} className="text-muted-foreground" />
                <span className="text-sm">Score de solvabilité</span>
                <HelpCircle size={14} className="text-muted-foreground" />
              </div>
              <span className={`font-bold text-lg ${getScoreColor(solvabilityScore)}`}>
                {solvabilityScore}/100
              </span>
            </div>
            <Progress 
              value={solvabilityScore} 
              className="h-2" 
              style={{ backgroundColor: "#e5e7eb" }} 
            >
              <div 
                className="h-full rounded-full transition-all" 
                style={{ 
                  width: `${solvabilityScore}%`, 
                  backgroundColor: getProgressColor(solvabilityScore).replace('bg-', '') 
                }} 
              />
            </Progress>
            <div className="mt-1 text-xs text-right text-muted-foreground">
              Source: InfoLégale
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1">
                <Shield size={16} className="text-muted-foreground" />
                <span className="text-sm">Score administratif</span>
                <HelpCircle size={14} className="text-muted-foreground" />
              </div>
              <span className={`font-bold text-lg ${getScoreColor(administrativeScore)}`}>
                {administrativeScore}/100
              </span>
            </div>
            <Progress 
              value={administrativeScore} 
              className="h-2" 
              style={{ backgroundColor: "#e5e7eb" }} 
            >
              <div 
                className="h-full rounded-full transition-all" 
                style={{ 
                  width: `${administrativeScore}%`, 
                  backgroundColor: getProgressColor(administrativeScore).replace('bg-', '') 
                }} 
              />
            </Progress>
            <div className="mt-1 text-xs text-right text-muted-foreground">
              Source: E-Attestations
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-2">
            Voir le rapport complet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
