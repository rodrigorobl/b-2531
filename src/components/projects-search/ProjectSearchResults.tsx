
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Clock, 
  ArrowRight, 
  Send, 
  Building, 
  Eye, 
  CircleDot 
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Project } from '@/pages/ProjectsSearch';

interface ProjectSearchResultsProps {
  projects: Project[];
}

export function ProjectSearchResults({ projects }: ProjectSearchResultsProps) {
  // Helper functions for rendering different statuses
  const getProjectTypeLabel = (type: 'conception' | 'realisation') => {
    switch (type) {
      case 'conception':
        return <Badge variant="outline" className="bg-blue-50">Conception</Badge>;
      case 'realisation':
        return <Badge variant="outline" className="bg-green-50">Réalisation</Badge>;
      default:
        return null;
    }
  };

  const getReferencingStatus = (status: 'in-progress' | 'not-started') => {
    switch (status) {
      case 'in-progress':
        return (
          <div className="flex items-center gap-1 text-amber-600">
            <Clock className="h-4 w-4" />
            <span>En cours</span>
          </div>
        );
      case 'not-started':
        return (
          <div className="flex items-center gap-1 text-slate-500">
            <CircleDot className="h-4 w-4" />
            <span>Non démarré</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getQuoteStatusBadge = (status?: 'to-send' | 'sent' | 'signed') => {
    if (!status) return "-";
    
    switch (status) {
      case 'to-send':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> À réaliser</Badge>;
      case 'sent':
        return <Badge variant="default" className="gap-1"><Send className="h-3 w-3" /> Envoyé</Badge>;
      case 'signed':
        return <Badge variant="default" className="bg-green-600 gap-1"><Check className="h-3 w-3" /> Signé</Badge>;
      default:
        return "-";
    }
  };

  // Generate a fake company ID for links to company details
  const getMockCompanyId = (name: string): string => {
    // Simple hash function to generate pseudo-random but consistent IDs
    return String(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000);
  };

  return (
    <div className="flex-1">
      <Card className="overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">{projects.length} projets trouvés</h2>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projet</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut référencement</TableHead>
                <TableHead>Lots concernés</TableHead>
                <TableHead>Entreprise titulaire</TableHead>
                <TableHead>Statut devis</TableHead>
                <TableHead>Date d'envoi</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Détails</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.name}
                      <div className="text-xs text-muted-foreground mt-1">
                        Client: {project.client}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Lieu: {project.location}
                      </div>
                    </TableCell>
                    <TableCell>{getProjectTypeLabel(project.type)}</TableCell>
                    <TableCell>{getReferencingStatus(project.referencing)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.lots.map((lot, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lot}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {project.contractor ? (
                        <Link 
                          to={`/company/${getMockCompanyId(project.contractor)}`}
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <Building className="h-3 w-3" />
                          <span>{project.contractor}</span>
                        </Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {project.type === 'realisation' ? getQuoteStatusBadge(project.quoteStatus) : "-"}
                    </TableCell>
                    <TableCell>
                      {project.sentDate ? project.sentDate : "-"}
                    </TableCell>
                    <TableCell>
                      {(project.referencing === 'in-progress' || project.referencing === 'not-started') && 
                       project.type === 'realisation' && 
                       project.quoteStatus !== 'signed' && (
                        <Button size="sm" className="whitespace-nowrap">
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer devis
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/project/${project.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    Aucun projet ne correspond à vos critères.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
