
import React from 'react';
import { Eye, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';
import { ProjectData, TenderData, QuoteData } from '@/types/projectDetail';

interface ProjectOverviewTabProps {
  project: ProjectData;
  tenders: TenderData[];
  quotes: { [key: string]: QuoteData[] };
  setActiveTab: (tab: string) => void;
  setSelectedTenderId: (id: string) => void;
}

export function ProjectOverviewTab({ 
  project, 
  tenders, 
  quotes, 
  setActiveTab,
  setSelectedTenderId
}: ProjectOverviewTabProps) {
  // Helper to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'En cours':
      case 'Ouvert':
        return <Badge className="bg-blue-500">En cours</Badge>;
      case 'Clôturé':
        return <Badge className="bg-amber-500">Clôturé</Badge>;
      case 'Attribué':
        return <Badge className="bg-green-600">Attribué</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Budget indicator
  const getBudgetIndicator = () => {
    // This would normally be calculated based on quotes vs budget
    // For demo purposes we'll use random data
    const variation = Math.random() * 30 - 15; // Random between -15% and +15%
    
    if (variation < -5) {
      return <Badge className="bg-green-600">En dessous du budget (-{Math.abs(variation).toFixed(1)}%)</Badge>;
    } else if (variation > 5) {
      return <Badge className="bg-red-500">Au dessus du budget (+{variation.toFixed(1)}%)</Badge>;
    } else {
      return <Badge className="bg-blue-500">Dans le budget</Badge>;
    }
  };
  
  // Timeline indicator
  const getTimelineIndicator = () => {
    // This would normally be calculated based on project dates
    // For demo purposes we'll use random data
    const onTime = Math.random() > 0.3;
    
    if (onTime) {
      return <Badge className="bg-green-600">Dans les délais</Badge>;
    } else {
      return <Badge className="bg-red-500">Retard</Badge>;
    }
  };
  
  return (
    <>
      {/* Project Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description du projet</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{project.description}</p>
        </CardContent>
      </Card>
      
      {/* Project KPIs and Budget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Budget estimé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.budget_estime 
                ? formatBudget(project.budget_estime) 
                : 'Non défini'}
            </div>
            <div className="mt-2">
              {getBudgetIndicator()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Progression globale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.progress_percentage || 0}%
            </div>
            <Progress 
              className="mt-2" 
              value={project.progress_percentage || 0} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Respect des délais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              {getTimelineIndicator()}
            </div>
            <div className="text-sm mt-2 text-muted-foreground">
              {project.date_fin 
                ? `Date de fin prévue: ${formatDate(project.date_fin)}`
                : 'Date de fin non définie'}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Project Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques des appels d'offres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold">{tenders.length}</div>
              <div className="text-sm text-muted-foreground">Total AO</div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold">
                {tenders.filter(t => t.statut === 'Ouvert').length}
              </div>
              <div className="text-sm text-muted-foreground">AO en cours</div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold">
                {tenders.filter(t => t.statut === 'Attribué').length}
              </div>
              <div className="text-sm text-muted-foreground">AO attribués</div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold">
                {Object.values(quotes).reduce((sum, quoteArr) => sum + quoteArr.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Devis reçus</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Tenders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Appels d'offres récents</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveTab('tenders')}
          >
            Voir tous
          </Button>
        </CardHeader>
        <CardContent>
          {tenders.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              Aucun appel d'offres pour ce projet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lot</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date limite</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenders.slice(0, 3).map(tender => (
                  <TableRow key={tender.id}>
                    <TableCell className="font-medium">{tender.lot}</TableCell>
                    <TableCell>{tender.type_appel_offre}</TableCell>
                    <TableCell>{renderStatusBadge(tender.statut)}</TableCell>
                    <TableCell>{formatDate(tender.date_limite)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedTenderId(tender.id);
                          setActiveTab('tenders');
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
