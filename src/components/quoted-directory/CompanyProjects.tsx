
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import StatusBadge from '@/components/StatusBadge';

interface Project {
  id: string;
  name: string;
  type: string;
  role: string;
  status: 'in-progress' | 'completed' | 'assigned' | 'pending' | 'closed';
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

interface CompanyProjectsProps {
  companyId: string;
}

export default function CompanyProjects({ companyId }: CompanyProjectsProps) {
  // Mock data for company projects
  const projects: Project[] = [
    {
      id: '1',
      name: 'Résidence Les Jardins Verts',
      type: 'Conception',
      role: 'Architecte principal',
      status: 'completed',
      startDate: '2022-03-15',
      endDate: '2023-01-20',
      location: 'Paris',
      description: 'Conception d\'un ensemble résidentiel de 28 logements labellisés BBC.'
    },
    {
      id: '2',
      name: 'Tour Horizon',
      type: 'Conception',
      role: 'Architecte associé',
      status: 'in-progress',
      startDate: '2023-05-10',
      endDate: '2024-06-30',
      location: 'Lyon',
      description: 'Conception d\'une tour de bureaux de 18 étages intégrant des solutions énergétiques innovantes.'
    },
    {
      id: '3',
      name: 'Groupe Scolaire Jean Moulin',
      type: 'Réalisation',
      role: 'Architecte principal',
      status: 'assigned',
      startDate: '2023-09-01',
      endDate: '2024-08-31',
      location: 'Bordeaux',
      description: 'Construction d\'un groupe scolaire comprenant 12 salles de classe, un réfectoire et des installations sportives.'
    },
    {
      id: '4',
      name: 'Éco-quartier La Rivière',
      type: 'Conception',
      role: 'Architecte conseil',
      status: 'completed',
      startDate: '2021-04-15',
      endDate: '2022-11-30',
      location: 'Nantes',
      description: 'Participation à la conception d\'un éco-quartier de 150 logements et 5000m² d\'espaces publics.'
    }
  ];

  // Format date to French format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase size={18} />
          Projets ({projects.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-lg">{project.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="outline">{project.type}</Badge>
                    <Badge variant="outline">{project.role}</Badge>
                    <StatusBadge status={project.status} />
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin size={14} />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                      <Calendar size={14} />
                      <span>
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-sm">{project.description}</p>
                </div>
                
                <div className="flex-shrink-0">
                  <Link to={`/tender/${project.id}`}>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      Voir le projet
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {index < projects.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
          
          {projects.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              Aucun projet associé à cette entreprise
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
