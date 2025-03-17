
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import StatusBadge from '@/components/StatusBadge';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  client: string;
  type: string;
  status: 'in-progress' | 'completed' | 'assigned' | 'pending' | 'closed';
  progress: number;
  deadline: string;
}

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium line-clamp-1">{project.name}</h3>
              <p className="text-sm text-muted-foreground">{project.client} - {project.type}</p>
            </div>
            <StatusBadge status={project.status} className="ml-2" />
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progression</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-muted-foreground">Échéance: {project.deadline}</span>
            <Link to={`/projects/${project.id}`} className="text-primary text-sm flex items-center hover:underline">
              <span>Voir la fiche du projet</span>
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      ))}
      
      {projects.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          Aucun projet en cours.
        </div>
      )}
      
      <div className="pt-3 text-center">
        <Link to="/projects" className="text-primary text-sm hover:underline">
          Voir tous les projets
        </Link>
      </div>
    </div>
  );
}
