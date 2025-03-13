
import React from 'react';
import StatusBadge from './StatusBadge';
import { Calendar, MapPin, Building, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProjectMap from './ProjectMap';

interface ProjectHeaderProps {
  project: {
    id: string;
    name: string;
    owner: {
      name: string;
      logo: string;
    };
    type: string;
    status: 'in-progress' | 'completed' | 'assigned' | 'pending' | 'closed';
    location: {
      address: string;
      lat: number;
      lng: number;
    };
    deadline: string;
  }
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const [showMap, setShowMap] = React.useState(false);
  
  return (
    <div className="glass-panel rounded-lg p-5 mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium text-muted-foreground px-2.5 py-0.5 bg-muted rounded mr-2">
              ID: {project.id}
            </span>
            <StatusBadge status={project.status} />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{project.name}</h1>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
            <div className="flex items-center">
              <Building size={16} className="mr-1" />
              <span>{project.type}</span>
            </div>
            
            <div className="flex items-center cursor-pointer hover:text-primary transition-colors"
              onClick={() => setShowMap(!showMap)}>
              <MapPin size={16} className="mr-1" />
              <span>{project.location.address}</span>
            </div>
            
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>Limite: {project.deadline}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3">
            <div className="text-sm font-medium">Maître d'ouvrage</div>
            <div className="text-base font-semibold">{project.owner.name}</div>
          </div>
          <div className="w-12 h-12 rounded overflow-hidden border border-muted flex items-center justify-center bg-white">
            {project.owner.logo ? (
              <img src={project.owner.logo} alt={project.owner.name} className="w-full h-full object-contain" />
            ) : (
              <Building className="text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
      
      {showMap && (
        <div className="mt-4 animate-slide-in">
          <ProjectMap location={project.location} />
        </div>
      )}
    </div>
  );
}
