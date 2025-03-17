
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowUpDown, 
  Eye, 
  Loader2, 
  AlertCircle
} from 'lucide-react';
import { ProjectSummary } from '@/types/projects';
import { formatBudget } from '@/utils/tenderFormatUtils';
import { Badge } from '@/components/ui/badge';

interface ProjectManagementTableProps {
  projects: ProjectSummary[];
  isLoading: boolean;
  error: string | null;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: string) => void;
}

export default function ProjectManagementTable({
  projects,
  isLoading,
  error,
  sortField,
  sortDirection,
  handleSort
}: ProjectManagementTableProps) {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En cours':
        return <Badge className="bg-amber-500">En cours</Badge>;
      case 'Clôturé':
        return <Badge className="bg-gray-500">Clôturé</Badge>;
      case 'Attribué':
        return <Badge className="bg-green-600">Attribué</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <AlertCircle className="mx-auto h-8 w-8 text-destructive mb-2" />
        <p>Une erreur est survenue lors du chargement des projets.</p>
        <p className="text-xs text-destructive mt-1">{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
          Aucun projet correspondant à vos critères
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">
            <div 
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleSort('projectName')}
            >
              Projet 
              <ArrowUpDown size={14} />
            </div>
          </TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>
            <div 
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleSort('startDate')}
            >
              Début 
              <ArrowUpDown size={14} />
            </div>
          </TableHead>
          <TableHead>Localisation</TableHead>
          <TableHead>
            <div 
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleSort('progressPercentage')}
            >
              Avancement 
              <ArrowUpDown size={14} />
            </div>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>
              <div className="font-medium">{project.projectName}</div>
              <div className="text-xs text-muted-foreground">Budget: {formatBudget(project.budget)}</div>
            </TableCell>
            <TableCell>{project.projectType}</TableCell>
            <TableCell>{getStatusBadge(project.status)}</TableCell>
            <TableCell>{project.clientName}</TableCell>
            <TableCell>{project.startDate ? new Date(project.startDate).toLocaleDateString('fr-FR') : 'Non défini'}</TableCell>
            <TableCell>{project.location}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <Progress value={project.progressPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {project.tendersAssigned}/{project.tendersCount} lots ({project.progressPercentage}%)
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button 
                size="sm" 
                variant="default" 
                className="gap-1"
                onClick={() => navigate(`/project-detail/${project.id}`)}
              >
                <Eye size={14} />
                <span>Détails</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
