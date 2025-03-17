
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
import { ArrowUpDown, Eye, FileText } from 'lucide-react';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';
import { ProjectSummary } from '@/types/projects';

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

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'En cours':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">En cours</span>;
      case 'Clôturé':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Clôturé</span>;
      case 'Attribué':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Attribué</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const handleRowClick = (projectId: string) => {
    navigate(`/project-detail/${projectId}`);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Chargement des projets...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center p-8 text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('projectName')}
            >
              <div className="flex items-center">
                Nom du projet
                {sortField === 'projectName' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </div>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('startDate')}
            >
              <div className="flex items-center">
                Date début
                {sortField === 'startDate' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </div>
            </TableHead>
            <TableHead>Budget</TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('progressPercentage')}
            >
              <div className="flex items-center">
                Progression
                {sortField === 'progressPercentage' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </div>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                Aucun projet trouvé
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow 
                key={project.id}
                className="cursor-pointer hover:bg-muted transition-colors"
                onClick={() => handleRowClick(project.id)}
              >
                <TableCell className="font-medium">{project.projectName}</TableCell>
                <TableCell>{project.projectType}</TableCell>
                <TableCell>{project.clientName}</TableCell>
                <TableCell>{renderStatusBadge(project.status)}</TableCell>
                <TableCell>{project.startDate ? formatDate(project.startDate) : '-'}</TableCell>
                <TableCell>{project.budget ? formatBudget(project.budget) : '-'}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 w-full">
                    <Progress value={project.progressPercentage} className="h-2" />
                    <span className="text-xs text-muted-foreground">
                      {project.progressPercentage}% - {project.tendersAssigned}/{project.tendersCount} AO
                    </span>
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project-detail/${project.id}`);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      <span>Détails</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
