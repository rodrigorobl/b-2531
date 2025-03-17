
import React from 'react';
import { Building, Calendar, Euro, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectDetail } from '@/types/projects';
import { formatBudget } from '@/utils/tenderFormatUtils';

interface ProjectInfoCardsProps {
  projectDetails: ProjectDetail;
}

export function ProjectInfoCards({ projectDetails }: ProjectInfoCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4 md:mb-6">
      <Card>
        <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center">
          <Building className="h-5 w-5 text-muted-foreground mb-2" />
          <span className="text-xs md:text-sm text-muted-foreground">Client</span>
          <span className="font-medium text-sm md:text-base">{projectDetails.clientName}</span>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center">
          <Euro className="h-5 w-5 text-muted-foreground mb-2" />
          <span className="text-xs md:text-sm text-muted-foreground">Budget</span>
          <span className="font-medium text-sm md:text-base">{formatBudget(projectDetails.budget)}</span>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center">
          <Calendar className="h-5 w-5 text-muted-foreground mb-2" />
          <span className="text-xs md:text-sm text-muted-foreground">Début</span>
          <span className="font-medium text-sm md:text-base">
            {projectDetails.startDate 
              ? new Date(projectDetails.startDate).toLocaleDateString('fr-FR')
              : 'Non défini'}
          </span>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center">
          <MapPin className="h-5 w-5 text-muted-foreground mb-2" />
          <span className="text-xs md:text-sm text-muted-foreground">Localisation</span>
          <span className="font-medium text-sm md:text-base">{projectDetails.location}</span>
        </CardContent>
      </Card>
    </div>
  );
}
