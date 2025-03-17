
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Sidebar from '@/components/Sidebar';
import { 
  Calendar, 
  MapPin, 
  Building, 
  ArrowLeft, 
  Eye, 
  Clock,
  FileText,
  BarChart2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';
import { useToast } from '@/hooks/use-toast';

// Define types for project and tender data
interface ProjectData {
  id: string;
  nom: string;
  description: string;
  type_projet: string;
  localisation: string | null;
  budget_estime: number | null;
  statut: 'En cours' | 'Clôturé' | 'Attribué';
  date_debut: string | null;
  date_fin: string | null;
  maitre_ouvrage_id: string;
  maitre_ouvrage_nom?: string;
  progress_percentage?: number;
}

interface TenderData {
  id: string;
  lot: string;
  description: string;
  type_appel_offre: string;
  statut: 'Ouvert' | 'Clôturé' | 'Attribué';
  date_limite: string;
  budget: number | null;
  quotes_received: number | null;
  progress: number | null;
  lots_total: number | null;
  lots_assigned: number | null;
}

interface QuoteData {
  id: string;
  montant: number;
  date_soumission: string | null;
  statut: string | null;
  entreprise_id: string;
  entreprise_nom?: string;
  document_url: string | null;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [project, setProject] = useState<ProjectData | null>(null);
  const [tenders, setTenders] = useState<TenderData[]>([]);
  const [quotes, setQuotes] = useState<{ [key: string]: QuoteData[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Check if user is promoter
  useEffect(() => {
    const activeProfile = localStorage.getItem('btp-connect-active-profile');
    if (activeProfile !== 'promoteur') {
      navigate('/dashboard-promoteur');
      toast({
        title: "Accès limité",
        description: "Cette page est accessible uniquement pour le profil promoteur",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);
  
  // Fetch project data
  useEffect(() => {
    async function fetchProjectData() {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Fetch project details
        const { data: projectData, error: projectError } = await supabase
          .from('projets')
          .select(`
            *,
            entreprises:maitre_ouvrage_id(nom)
          `)
          .eq('id', id)
          .single();
        
        if (projectError) throw projectError;
        
        // Fetch tenders for this project
        const { data: tendersData, error: tendersError } = await supabase
          .from('appels_offres')
          .select('*')
          .eq('projet_id', id);
        
        if (tendersError) throw tendersError;
          
        // Calculate overall project progress
        const projectProgress = calculateProjectProgress(tendersData);
        
        // Update state with fetched data
        setProject({
          ...projectData,
          maitre_ouvrage_nom: projectData.entreprises?.nom,
          progress_percentage: projectProgress
        });
        setTenders(tendersData);
        
        // Fetch quotes for all tenders
        if (tendersData.length > 0) {
          const tendersWithQuotes: { [key: string]: QuoteData[] } = {};
          
          for (const tender of tendersData) {
            const { data: quotesData, error: quotesError } = await supabase
              .from('devis')
              .select(`
                *,
                entreprises:entreprise_id(nom)
              `)
              .eq('appel_offre_id', tender.id);
            
            if (!quotesError && quotesData) {
              tendersWithQuotes[tender.id] = quotesData.map(quote => ({
                ...quote,
                entreprise_nom: quote.entreprises?.nom
              }));
            }
          }
          
          setQuotes(tendersWithQuotes);
          
          // Select the first tender by default
          if (tendersData.length > 0 && !selectedTenderId) {
            setSelectedTenderId(tendersData[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du projet",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProjectData();
  }, [id, toast]);
  
  // Calculate project progress based on tenders
  const calculateProjectProgress = (tenders: TenderData[]): number => {
    if (tenders.length === 0) return 0;
    
    const totalProgress = tenders.reduce((sum, tender) => {
      return sum + (tender.progress || 0);
    }, 0);
    
    return Math.round(totalProgress / tenders.length);
  };
  
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
  
  if (isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement des données du projet...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Projet non trouvé</h2>
            <p className="text-muted-foreground mb-4">Le projet que vous recherchez n'existe pas ou vous n'avez pas les permissions nécessaires.</p>
            <Button onClick={() => navigate('/project-management')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la liste des projets
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Project Header */}
          <div className="mb-6">
            <div className="flex items-center mb-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2"
                onClick={() => navigate('/project-management')}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour
              </Button>
              {renderStatusBadge(project.statut)}
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold">{project.nom}</h1>
              
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab('tenders')}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Voir les appels d'offres
                </Button>
                
                <Button>
                  <Eye className="h-4 w-4 mr-1" />
                  Lancer un nouvel AO
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-1" />
                <span>{project.type_projet}</span>
              </div>
              
              {project.localisation && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{project.localisation}</span>
                </div>
              )}
              
              {project.date_debut && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Début: {formatDate(project.date_debut)}</span>
                </div>
              )}
              
              {project.date_fin && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Fin: {formatDate(project.date_fin)}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-2 md:w-[400px]">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="tenders">Appels d'offres</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
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
            </TabsContent>
            
            {/* Tenders Tab */}
            <TabsContent value="tenders" className="space-y-6">
              {/* All Tenders */}
              <Card>
                <CardHeader>
                  <CardTitle>Tous les appels d'offres</CardTitle>
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
                          <TableHead>Budget</TableHead>
                          <TableHead>Devis reçus</TableHead>
                          <TableHead>Progression</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tenders.map(tender => (
                          <TableRow 
                            key={tender.id}
                            className={selectedTenderId === tender.id ? "bg-muted" : ""}
                          >
                            <TableCell className="font-medium">{tender.lot}</TableCell>
                            <TableCell>{tender.type_appel_offre}</TableCell>
                            <TableCell>{renderStatusBadge(tender.statut)}</TableCell>
                            <TableCell>{formatDate(tender.date_limite)}</TableCell>
                            <TableCell>
                              {tender.budget ? formatBudget(tender.budget) : '-'}
                            </TableCell>
                            <TableCell>
                              {(quotes[tender.id]?.length || 0)} devis
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <Progress value={tender.progress || 0} className="h-2" />
                                <div className="text-xs text-muted-foreground">
                                  {tender.progress || 0}%
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedTenderId(tender.id)}
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
              
              {/* Selected Tender Details */}
              {selectedTenderId && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Détails de l'appel d'offres - {tenders.find(t => t.id === selectedTenderId)?.lot}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Tender Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <h3 className="font-semibold mb-1">Description</h3>
                        <p className="text-sm text-muted-foreground">
                          {tenders.find(t => t.id === selectedTenderId)?.description || 'Aucune description'}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-1">Budget alloué</h3>
                        <p className="text-sm">
                          {tenders.find(t => t.id === selectedTenderId)?.budget 
                            ? formatBudget(tenders.find(t => t.id === selectedTenderId)?.budget || 0) 
                            : 'Non défini'}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-1">Date limite</h3>
                        <p className="text-sm">
                          {formatDate(tenders.find(t => t.id === selectedTenderId)?.date_limite || '')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Quotes for this tender */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Devis reçus</h3>
                      
                      {!quotes[selectedTenderId] || quotes[selectedTenderId].length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground border rounded-md">
                          Aucun devis reçu pour cet appel d'offres
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Entreprise</TableHead>
                              <TableHead>Montant</TableHead>
                              <TableHead>Date soumission</TableHead>
                              <TableHead>Statut</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {quotes[selectedTenderId].map(quote => (
                              <TableRow key={quote.id}>
                                <TableCell className="font-medium">
                                  {quote.entreprise_nom || 'Entreprise inconnue'}
                                </TableCell>
                                <TableCell>
                                  {formatBudget(quote.montant)}
                                </TableCell>
                                <TableCell>
                                  {quote.date_soumission 
                                    ? formatDate(quote.date_soumission)
                                    : 'Date inconnue'}
                                </TableCell>
                                <TableCell>
                                  {quote.statut === 'Accepté' && (
                                    <Badge className="bg-green-600">Accepté</Badge>
                                  )}
                                  {quote.statut === 'Refusé' && (
                                    <Badge className="bg-red-500">Refusé</Badge>
                                  )}
                                  {quote.statut === 'Soumis' && (
                                    <Badge className="bg-blue-500">Soumis</Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    {quote.document_url && (
                                      <Button size="sm" variant="outline">
                                        <FileText className="h-4 w-4 mr-1" />
                                        Document
                                      </Button>
                                    )}
                                    
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4 mr-1" />
                                      Détails
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
