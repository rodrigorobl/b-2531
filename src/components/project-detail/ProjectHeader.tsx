
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectDetail } from '@/types/projects';

interface ProjectHeaderProps {
  projectDetails: ProjectDetail;
}

export function ProjectHeader({ projectDetails }: ProjectHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate('/project-management')}
        className="mb-4 md:mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Retour
      </Button>

      <h1 className="text-2xl md:text-3xl font-bold mb-2">{projectDetails.projectName}</h1>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge className={`
          ${projectDetails.status === 'En cours' ? 'bg-amber-500' : ''}
          ${projectDetails.status === 'Clôturé' ? 'bg-gray-500' : ''}
          ${projectDetails.status === 'Attribué' ? 'bg-green-600' : ''}
        `}>
          {projectDetails.status}
        </Badge>
        <span className="text-muted-foreground">{projectDetails.projectType}</span>
      </div>
      
      <p className="text-muted-foreground mb-4 md:mb-6">{projectDetails.description}</p>
    </>
  );
}
