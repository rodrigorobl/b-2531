
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProjectDetail } from '@/types/projects';

interface ProjectProgressCardProps {
  projectDetails: ProjectDetail;
}

export function ProjectProgressCard({ projectDetails }: ProjectProgressCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4 md:p-6">
        <h3 className="font-semibold mb-4">Avancement du projet</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Progression globale</span>
              <span className="text-sm font-medium">{projectDetails.progressPercentage}%</span>
            </div>
            <Progress value={projectDetails.progressPercentage} className="h-2" />
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm">
              <span>Lots attribués:</span>
              <span className="font-medium">{projectDetails.tendersAssigned}/{projectDetails.tendersCount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
