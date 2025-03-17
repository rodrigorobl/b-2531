
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';
import { ProjectData } from '@/types/projectDetail';

interface ProjectKPICardsProps {
  project: ProjectData;
}

export function ProjectKPICards({ project }: ProjectKPICardsProps) {
  // Budget indicator
  const getBudgetIndicator = () => {
    // This would normally be calculated based on quotes vs budget
    // For demo purposes we'll use random data
    const variation = Math.random() * 30 - 15; // Random between -15% and +15%
    
    if (variation < -5) {
      return <Badge className="bg-green-600">En dessous du budget (-{Math.abs(variation).toFixed(1)}%)</Badge>;
    } else if (variation > 5) {
      return <Badge className="bg-red-500">Au dessus du budget (+{variation.toFixed(1)}%)</Badge>;
    } else {
      return <Badge className="bg-blue-500">Dans le budget</Badge>;
    }
  };
  
  // Timeline indicator
  const getTimelineIndicator = () => {
    // This would normally be calculated based on project dates
    // For demo purposes we'll use random data
    const onTime = Math.random() > 0.3;
    
    if (onTime) {
      return <Badge className="bg-green-600">Dans les délais</Badge>;
    } else {
      return <Badge className="bg-red-500">Retard</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Budget estimé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {project.budget_estime 
              ? formatBudget(project.budget_estime) 
              : 'Non défini'}
          </div>
          <div className="mt-2">
            {getBudgetIndicator()}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Progression globale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {project.progress_percentage || 0}%
          </div>
          <Progress 
            className="mt-2" 
            value={project.progress_percentage || 0} 
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Respect des délais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            {getTimelineIndicator()}
          </div>
          <div className="text-sm mt-2 text-muted-foreground">
            {project.date_fin 
              ? `Date de fin prévue: ${formatDate(project.date_fin)}`
              : 'Date de fin non définie'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
