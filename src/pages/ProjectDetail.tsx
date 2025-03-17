
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  MapPin, 
  Briefcase, 
  Euro, 
  Eye,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import { ProjectDetail } from '@/types/projects';
import { formatBudget } from '@/utils/tenderFormatUtils';
import { getStatusBadge } from '@/components/tenders/TenderHelpers';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchProjectDetails } = useProjectManagement();
  const [projectDetails, setProjectDetails] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProjectDetails = async () => {
      if (!id) {
        setError('ID du projet non fourni');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const details = await fetchProjectDetails(id);
        if (details) {
          setProjectDetails(details);
          setError(null);
        } else {
          setError('Impossible de charger les détails du projet');
        }
      } catch (err: any) {
        console.error('Error loading project details:', err);
        setError(err.message || 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectDetails();
  }, [id, fetchProjectDetails]);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !projectDetails) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 p-8 flex flex-col items-center justify-center">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Erreur</h2>
          <p className="text-muted-foreground">{error || "Projet non trouvé"}</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => navigate('/project-management')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste des projets
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/project-management')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour
          </Button>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-2">{projectDetails.projectName}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge className={`
                  ${projectDetails.status === 'En cours' ? 'bg-amber-500' : ''}
                  ${projectDetails.status === 'Clôturé' ? 'bg-gray-500' : ''}
                  ${projectDetails.status === 'Attribué' ? 'bg-green-600' : ''}
                `}>
                  {projectDetails.status}
                </Badge>
                <span className="text-muted-foreground">{projectDetails.projectType}</span>
              </div>
              
              <p className="text-muted-foreground mb-6">{projectDetails.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <Building className="h-5 w-5 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Client</span>
                    <span className="font-medium">{projectDetails.clientName}</span>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <Euro className="h-5 w-5 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Budget</span>
                    <span className="font-medium">{formatBudget(projectDetails.budget)}</span>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Début</span>
                    <span className="font-medium">
                      {projectDetails.startDate 
                        ? new Date(projectDetails.startDate).toLocaleDateString('fr-FR')
                        : 'Non défini'}
                    </span>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <MapPin className="h-5 w-5 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Localisation</span>
                    <span className="font-medium">{projectDetails.location}</span>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Avancement du projet</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Progression globale</span>
                        <span className="text-sm font-medium">{projectDetails.progressPercentage}%</span>
                      </div>
                      <Progress value={projectDetails.progressPercentage} className="h-2" />
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex justify-between text-sm">
                        <span>Lots attribués:</span>
                        <span className="font-medium">{projectDetails.tendersAssigned}/{projectDetails.tendersCount}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Tabs defaultValue="tenders" className="w-full">
            <TabsList>
              <TabsTrigger value="tenders" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Appels d'offres
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tenders" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lot</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date limite</TableHead>
                      <TableHead>Devis reçus</TableHead>
                      <TableHead>Progression</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectDetails.tenders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                          Aucun appel d'offres pour ce projet
                        </TableCell>
                      </TableRow>
                    ) : (
                      projectDetails.tenders.map((tender) => (
                        <TableRow key={tender.id}>
                          <TableCell>
                            <div className="font-medium">{tender.name}</div>
                          </TableCell>
                          <TableCell>{tender.type}</TableCell>
                          <TableCell>{getStatusBadge(tender.status)}</TableCell>
                          <TableCell>{tender.deadline}</TableCell>
                          <TableCell>{tender.quotesReceived}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <Progress value={tender.progress} className="h-2" />
                              <div className="text-xs text-muted-foreground">
                                {tender.lotsAssigned}/{tender.lotsTotal} lots ({tender.progress}%)
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant="default" 
                              className="gap-1"
                              onClick={() => navigate(`/tender-detail/${tender.id}`)}
                            >
                              <Eye size={14} />
                              <span>Détails</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
