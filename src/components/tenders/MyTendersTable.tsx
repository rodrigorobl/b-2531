
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
import { Badge } from '@/components/ui/badge';
import { Eye, FileEdit, XCircle } from 'lucide-react';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';
import { MyTenderProject } from '@/hooks/useMyTenders';

interface MyTendersTableProps {
  projects: MyTenderProject[];
  isLoading: boolean;
  error: string | null;
}

export default function MyTendersTable({
  projects,
  isLoading,
  error
}: MyTendersTableProps) {
  const navigate = useNavigate();

  const renderQuoteStatus = (status: string | null) => {
    switch (status) {
      case 'Accepté':
        return <Badge className="bg-green-600">Accepté</Badge>;
      case 'Refusé':
        return <Badge className="bg-red-500">Refusé</Badge>;
      case 'Soumis':
      default:
        return <Badge className="bg-blue-500">Soumis</Badge>;
    }
  };

  const renderProjectStatus = (status: string) => {
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

  const handleViewDetails = (project: MyTenderProject) => {
    navigate(`/tender-detail/${project.appel_offre_id}`);
  };

  const canUpdateQuote = (project: MyTenderProject) => {
    // Vérifier si l'appel d'offres est encore ouvert
    if (project.projectStatus === 'Clôturé' || project.projectStatus === 'Attribué') {
      return false;
    }
    
    // Vérifier si la date limite est dépassée
    if (project.tenderDeadline) {
      const deadline = new Date(project.tenderDeadline);
      const today = new Date();
      return deadline > today;
    }
    
    return true;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Chargement de vos appels d'offres...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center p-8 text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Projet</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Statut du projet</TableHead>
            <TableHead>Date limite</TableHead>
            <TableHead>Statut du devis</TableHead>
            <TableHead>Montant proposé</TableHead>
            <TableHead>Date de soumission</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8">
                Aucun appel d'offres trouvé
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow 
                key={project.id}
                className="hover:bg-muted transition-colors"
              >
                <TableCell className="font-medium">{project.projectName}</TableCell>
                <TableCell>{project.projectType}</TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell>{renderProjectStatus(project.projectStatus)}</TableCell>
                <TableCell>{project.tenderDeadline ? formatDate(project.tenderDeadline) : '-'}</TableCell>
                <TableCell>{renderQuoteStatus(project.quoteStatus)}</TableCell>
                <TableCell>{formatBudget(project.quoteAmount)}</TableCell>
                <TableCell>{project.submissionDate ? formatDate(project.submissionDate) : '-'}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(project)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      <span>Détails</span>
                    </Button>
                    
                    {canUpdateQuote(project) && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <FileEdit className="h-4 w-4 mr-1" />
                          <span>Modifier</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          <span>Retirer</span>
                        </Button>
                      </>
                    )}
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
