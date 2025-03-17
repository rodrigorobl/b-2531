
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, 
  MapPin, 
  Calendar, 
  Building, 
  Clock, 
  MessageSquare, 
  Download, 
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  Users,
  ArrowDownUp,
  X
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import ProjectMap from '@/components/ProjectMap';
import Sidebar from '@/components/Sidebar';

// Types
interface Tender {
  id: string;
  name: string;
  description: string;
  status: 'open' | 'closed' | 'assigned';
  createdAt: string;
  deadline: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  projectType: string;
  tenderType: 'conception' | 'realisation' | 'services';
  budget: number;
  categories: Category[];
  messages: Message[];
  documents: Document[];
}

interface Category {
  id: string;
  name: string;
  quotes: Quote[];
}

interface Quote {
  id: string;
  companyName: string;
  submissionDate: string;
  isCompliant: boolean;
  price: number;
  comments: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Message {
  id: string;
  sender: string;
  senderType: 'promoteur' | 'entreprise' | 'bet';
  content: string;
  timestamp: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

// Mock data for demonstration
const mockTender: Tender = {
  id: 'tender-001',
  name: 'Résidence Les Cerisiers - Construction',
  description: 'Projet de construction d\'une résidence de 40 logements sur 4 étages avec parking souterrain. Le projet vise une certification environnementale RT2020.',
  status: 'open',
  createdAt: '15/04/2024',
  deadline: '30/06/2024',
  location: {
    address: '12 Rue des Fleurs, 75001 Paris',
    lat: 48.856614,
    lng: 2.3522219
  },
  projectType: 'Résidentiel',
  tenderType: 'realisation',
  budget: 3500000,
  categories: [
    {
      id: 'cat-001',
      name: 'Gros Œuvre',
      quotes: [
        {
          id: 'quote-001',
          companyName: 'BTP Construction',
          submissionDate: '01/05/2024',
          isCompliant: true,
          price: 850000,
          comments: 'Proposition incluant fondations spéciales pour terrain argileux',
          status: 'pending'
        },
        {
          id: 'quote-002',
          companyName: 'Constructions Martin',
          submissionDate: '05/05/2024',
          isCompliant: true,
          price: 920000,
          comments: 'Option pour béton haute performance et livraison anticipée',
          status: 'pending'
        },
        {
          id: 'quote-003',
          companyName: 'Bouygues Bâtiment',
          submissionDate: '10/05/2024',
          isCompliant: false,
          price: 780000,
          comments: 'Hors fondations spéciales mentionnées dans le cahier des charges',
          status: 'pending'
        },
        {
          id: 'quote-004',
          companyName: 'Vinci Construction',
          submissionDate: '12/05/2024',
          isCompliant: true,
          price: 890000,
          comments: 'Inclut garantie décennale étendue et suivi de chantier renforcé',
          status: 'pending'
        }
      ]
    },
    {
      id: 'cat-002',
      name: 'Charpente',
      quotes: [
        {
          id: 'quote-005',
          companyName: 'Charpentes Bernard',
          submissionDate: '03/05/2024',
          isCompliant: true,
          price: 320000,
          comments: 'Utilisation de bois locaux certifiés PEFC',
          status: 'pending'
        },
        {
          id: 'quote-006',
          companyName: 'Structures Bois',
          submissionDate: '08/05/2024',
          isCompliant: true,
          price: 350000,
          comments: 'Traitement anti-insectes et ignifuge inclus',
          status: 'pending'
        }
      ]
    },
    {
      id: 'cat-003',
      name: 'Électricité',
      quotes: []
    },
    {
      id: 'cat-004',
      name: 'Plomberie',
      quotes: [
        {
          id: 'quote-007',
          companyName: 'Plomberie Générale',
          submissionDate: '05/05/2024',
          isCompliant: true,
          price: 280000,
          comments: 'Système d\'économie d\'eau et récupération d\'eau de pluie',
          status: 'pending'
        }
      ]
    },
    {
      id: 'cat-005',
      name: 'Menuiseries',
      quotes: [
        {
          id: 'quote-008',
          companyName: 'Menuiseries Durables',
          submissionDate: '02/05/2024',
          isCompliant: true,
          price: 420000,
          comments: 'Fenêtres triple vitrage et menuiseries extérieures aluminium',
          status: 'pending'
        },
        {
          id: 'quote-009',
          companyName: 'Art du Bois',
          submissionDate: '07/05/2024',
          isCompliant: false,
          price: 390000,
          comments: 'Ne respecte pas les normes d\'isolation thermique requises',
          status: 'pending'
        },
        {
          id: 'quote-010',
          companyName: 'Fenêtres & Portes',
          submissionDate: '11/05/2024',
          isCompliant: true,
          price: 405000,
          comments: 'Options supplémentaires pour portes sécurisées',
          status: 'pending'
        },
        {
          id: 'quote-011',
          companyName: 'Menuiseries Modernes',
          submissionDate: '15/05/2024',
          isCompliant: true,
          price: 410000,
          comments: 'Inclut domotique pour ouvertures automatisées',
          status: 'pending'
        }
      ]
    }
  ],
  messages: [
    {
      id: 'msg-001',
      sender: 'Jean Dupont',
      senderType: 'promoteur',
      content: 'Bonjour, pourriez-vous préciser les délais d\'exécution pour le lot Gros Œuvre ?',
      timestamp: '20/04/2024 10:45'
    },
    {
      id: 'msg-002',
      sender: 'BTP Construction',
      senderType: 'entreprise',
      content: 'Bonjour, nous estimons un délai de 6 mois pour la réalisation complète du gros œuvre, avec possibilité d\'optimisation selon les conditions météorologiques.',
      timestamp: '21/04/2024 09:30'
    },
    {
      id: 'msg-003',
      sender: 'Cabinet d\'études Structura',
      senderType: 'bet',
      content: 'Après analyse des propositions, nous recommandons de clarifier les spécifications des fondations avec tous les soumissionnaires pour assurer la comparabilité des offres.',
      timestamp: '22/04/2024 14:15'
    }
  ],
  documents: [
    {
      id: 'doc-001',
      name: 'DCE - Dossier Complet',
      type: 'pdf',
      size: '15.2 MB',
      url: '#'
    },
    {
      id: 'doc-002',
      name: 'DPGF - Lots Techniques',
      type: 'xlsx',
      size: '2.8 MB',
      url: '#'
    },
    {
      id: 'doc-003',
      name: 'Plans Architecte',
      type: 'pdf',
      size: '8.5 MB',
      url: '#'
    },
    {
      id: 'doc-004',
      name: 'Étude de Sol',
      type: 'pdf',
      size: '4.3 MB',
      url: '#'
    },
    {
      id: 'doc-005',
      name: 'Calendrier Prévisionnel',
      type: 'pdf',
      size: '1.2 MB',
      url: '#'
    }
  ]
};

export default function TenderDetail() {
  const { tenderId } = useParams<{ tenderId: string }>();
  const [tender, setTender] = useState<Tender | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'} | null>(null);

  // Fetch tender data
  useEffect(() => {
    // In a real app, we would fetch the data based on tenderId
    // For now, use mock data
    setTender(mockTender);
    if (mockTender.categories.length > 0) {
      setSelectedCategory(mockTender.categories[0].id);
    }
  }, [tenderId]);

  if (!tender) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <p>Chargement de l'appel d'offres...</p>
          </div>
        </main>
      </div>
    );
  }

  // Calculate project progress
  const totalCategories = tender.categories.length;
  const assignedCategories = tender.categories.filter(cat => 
    cat.quotes.some(quote => quote.status === 'approved')
  ).length;
  const progressPercentage = totalCategories > 0 
    ? Math.round((assignedCategories / totalCategories) * 100) 
    : 0;

  // Calculate budget indicators
  const totalQuotesAmount = tender.categories.reduce((total, category) => {
    const lowestQuoteForCategory = category.quotes.length > 0 
      ? Math.min(...category.quotes.filter(q => q.isCompliant).map(q => q.price))
      : 0;
    return total + lowestQuoteForCategory;
  }, 0);
  
  const budgetStatus = totalQuotesAmount > tender.budget ? 'exceeded' : 'respected';
  const budgetDifference = Math.abs(tender.budget - totalQuotesAmount);
  const budgetDifferencePercentage = tender.budget > 0 
    ? Math.round((budgetDifference / tender.budget) * 100) 
    : 0;

  // Get selected category data
  const selectedCategoryData = tender.categories.find(cat => cat.id === selectedCategory);

  // Sort quotes if sort config is set
  const getSortedQuotes = (quotes: Quote[]) => {
    if (!sortConfig) return quotes;
    
    return [...quotes].sort((a, b) => {
      if (sortConfig.key === 'price') {
        return sortConfig.direction === 'asc' 
          ? a.price - b.price 
          : b.price - a.price;
      }
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime() 
          : new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      }
      return 0;
    });
  };

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get evaluation based on number of quotes
  const getCategoryEvaluation = (quotesCount: number) => {
    if (quotesCount >= 4) return { label: 'Bon', color: 'bg-green-500' };
    if (quotesCount >= 2) return { label: 'Moyen', color: 'bg-amber-500' };
    return { label: 'Mauvais', color: 'bg-red-500' };
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        {/* Back navigation */}
        <div className="mb-6">
          <Link to="/tenders" className="flex items-center text-sm text-muted-foreground hover:text-primary">
            <ChevronLeft size={16} className="mr-1" />
            Retour aux appels d'offres
          </Link>
        </div>

        {/* Header with tender name and status */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{tender.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge 
                className={
                  tender.status === 'open' ? 'bg-amber-500' :
                  tender.status === 'assigned' ? 'bg-green-600' :
                  'bg-gray-500'
                }
              >
                {tender.status === 'open' ? 'En cours' : 
                 tender.status === 'assigned' ? 'Attribué' : 'Clôturé'}
              </Badge>
              <span className="flex items-center text-sm text-muted-foreground">
                <Calendar size={14} className="mr-1.5" />
                Échéance: {tender.deadline}
              </span>
              <span className="flex items-center text-sm text-muted-foreground">
                <Building size={14} className="mr-1.5" />
                {tender.projectType}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-1.5" />
              Exporter
            </Button>
            <Button size="sm">
              <MessageSquare size={16} className="mr-1.5" />
              Contacter
            </Button>
          </div>
        </div>

        {/* Main content with tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="quotes">Devis ({tender.categories.reduce((total, cat) => total + cat.quotes.length, 0)})</TabsTrigger>
            <TabsTrigger value="messages">Messages ({tender.messages.length})</TabsTrigger>
            <TabsTrigger value="documents">Documents ({tender.documents.length})</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations du projet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">{tender.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Type d'appel d'offres</p>
                      <p className="text-sm">
                        {tender.tenderType === 'conception' ? 'Conception' : 
                         tender.tenderType === 'realisation' ? 'Réalisation' : 'Services'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Date de création</p>
                      <p className="text-sm">{tender.createdAt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MapPin size={16} className="mr-2" />
                    Localisation
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-48">
                  <p className="text-sm mb-2">{tender.location.address}</p>
                  <ProjectMap location={tender.location} />
                </CardContent>
              </Card>

              {/* Budget status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statut du budget</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Budget initial:</span>
                    <span className="font-semibold">{tender.budget.toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Devis les moins chers:</span>
                    <span className="font-semibold">{totalQuotesAmount.toLocaleString()} €</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Différence:</span>
                    <span className={`font-semibold ${budgetStatus === 'exceeded' ? 'text-red-500' : 'text-green-600'}`}>
                      {budgetStatus === 'exceeded' ? '+' : '-'}{budgetDifference.toLocaleString()} € 
                      ({budgetDifferencePercentage}%)
                    </span>
                  </div>
                  <div className="pt-2">
                    <div className={`w-full rounded-full h-2 ${budgetStatus === 'exceeded' ? 'bg-red-100' : 'bg-green-100'}`}>
                      <div 
                        className={`h-2 rounded-full ${budgetStatus === 'exceeded' ? 'bg-red-500' : 'bg-green-600'}`}
                        style={{ width: `${Math.min(100, budgetStatus === 'exceeded' ? 100 : 100 - budgetDifferencePercentage)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">0 €</span>
                      <span className="text-xs text-muted-foreground">{tender.budget.toLocaleString()} €</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Avancement du projet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{assignedCategories} lots attribués sur {totalCategories}</span>
                      <span className="font-medium">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    {tender.categories.map(category => {
                      const evaluation = getCategoryEvaluation(category.quotes.length);
                      return (
                        <div key={category.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${evaluation.color} mr-2`}></div>
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">{category.quotes.length} devis</span>
                            <Badge variant="outline" className={`text-xs ${evaluation.color} bg-opacity-10`}>
                              {evaluation.label}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Categories overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vue d'ensemble des lots</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lot</TableHead>
                      <TableHead>Devis reçus</TableHead>
                      <TableHead>Meilleur prix</TableHead>
                      <TableHead>Évaluation</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tender.categories.map(category => {
                      const quotesCount = category.quotes.length;
                      const evaluation = getCategoryEvaluation(quotesCount);
                      const lowestQuote = category.quotes.length > 0
                        ? Math.min(...category.quotes.filter(q => q.isCompliant).map(q => q.price))
                        : null;
                      const approvedQuote = category.quotes.find(q => q.status === 'approved');
                      
                      return (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>{quotesCount}</TableCell>
                          <TableCell>
                            {lowestQuote 
                              ? `${lowestQuote.toLocaleString()} €`
                              : '-'}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${evaluation.color}`}>
                              {evaluation.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {approvedQuote
                              ? <Badge className="bg-green-600">Attribué</Badge>
                              : quotesCount > 0
                                ? <Badge className="bg-amber-500">En attente</Badge>
                                : <Badge className="bg-red-500">Non démarré</Badge>
                            }
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent value="quotes">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Categories sidebar */}
              <div className="space-y-1">
                {tender.categories.map(category => {
                  const evaluation = getCategoryEvaluation(category.quotes.length);
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
                        selectedCategory === category.id 
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <span>{category.name}</span>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">{category.quotes.length}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          selectedCategory === category.id 
                            ? 'bg-white'
                            : evaluation.color
                        }`}></div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quotes list */}
              <div className="md:col-span-3">
                {selectedCategoryData ? (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>Devis pour {selectedCategoryData.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {selectedCategoryData.quotes.length} devis
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedCategoryData.quotes.length > 0 ? (
                        <div>
                          <div className="flex justify-end mb-3 gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => requestSort('date')}
                              className="flex items-center"
                            >
                              <Clock size={14} className="mr-1" />
                              Date
                              {sortConfig?.key === 'date' && (
                                <ArrowDownUp size={14} className="ml-1" />
                              )}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => requestSort('price')}
                              className="flex items-center"
                            >
                              <Clock size={14} className="mr-1" />
                              Prix
                              {sortConfig?.key === 'price' && (
                                <ArrowDownUp size={14} className="ml-1" />
                              )}
                            </Button>
                          </div>
                          <div className="space-y-4">
                            {getSortedQuotes(selectedCategoryData.quotes).map(quote => (
                              <Card key={quote.id} className="overflow-hidden">
                                <div className={`h-1 w-full ${quote.isCompliant ? 'bg-green-500' : 'bg-red-500'}`} />
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium">{quote.companyName}</h3>
                                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                                        <Calendar size={14} className="mr-1" />
                                        <span>Soumis le {quote.submissionDate}</span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-bold text-lg">{quote.price.toLocaleString()} €</div>
                                      <Badge variant="outline" className={`mt-1 ${quote.isCompliant ? 'text-green-600' : 'text-red-500'}`}>
                                        {quote.isCompliant ? (
                                          <><CheckCircle size={12} className="mr-1" /> Conforme</>
                                        ) : (
                                          <><AlertTriangle size={12} className="mr-1" /> Non conforme</>
                                        )}
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  {quote.comments && (
                                    <div className="mt-3 text-sm bg-muted p-3 rounded-md">
                                      <p className="font-medium mb-1">Commentaires:</p>
                                      <p>{quote.comments}</p>
                                    </div>
                                  )}
                                  
                                  <div className="mt-4 flex justify-end gap-2">
                                    <Button variant="outline" size="sm">
                                      <FileText size={14} className="mr-1" />
                                      Voir le devis
                                    </Button>
                                    {quote.status === 'pending' && (
                                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle size={14} className="mr-1" />
                                        Accepter
                                      </Button>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="py-12 text-center">
                          <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-3" />
                          <h3 className="font-medium text-lg mb-1">Aucun devis reçu</h3>
                          <p className="text-muted-foreground">
                            Il n'y a pas encore de devis pour cette catégorie.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p>Sélectionnez une catégorie</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Historique des échanges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tender.messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`p-4 rounded-lg border ${
                        message.senderType === 'promoteur' 
                          ? 'bg-primary/10 ml-12' 
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <span className="font-medium">{message.sender}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {message.senderType === 'promoteur' ? 'MOA' : 
                             message.senderType === 'bet' ? 'BET' : 'Entreprise'}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button className="w-full">
                    <MessageSquare size={16} className="mr-1.5" />
                    Envoyer un nouveau message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Documents de l'appel d'offres</span>
                  <Button size="sm">
                    <Download size={16} className="mr-1.5" />
                    Tout télécharger
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Taille</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tender.documents.map(doc => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.type.toUpperCase()}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Tableau comparatif des devis</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lot</TableHead>
                      <TableHead>Entreprises</TableHead>
                      <TableHead>Prix min</TableHead>
                      <TableHead>Prix max</TableHead>
                      <TableHead>Écart</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tender.categories
                      .filter(cat => cat.quotes.length > 0)
                      .map(category => {
                        const compliantQuotes = category.quotes.filter(q => q.isCompliant);
                        const minPrice = compliantQuotes.length > 0 
                          ? Math.min(...compliantQuotes.map(q => q.price))
                          : null;
                        const maxPrice = compliantQuotes.length > 0 
                          ? Math.max(...compliantQuotes.map(q => q.price))
                          : null;
                        const priceDifference = minPrice && maxPrice ? maxPrice - minPrice : null;
                        const priceDifferencePercentage = minPrice && priceDifference
                          ? Math.round((priceDifference / minPrice) * 100)
                          : null;

                        return (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>{category.quotes.map(q => q.companyName).join(', ')}</TableCell>
                            <TableCell>{minPrice ? `${minPrice.toLocaleString()} €` : '-'}</TableCell>
                            <TableCell>{maxPrice ? `${maxPrice.toLocaleString()} €` : '-'}</TableCell>
                            <TableCell>
                              {priceDifferencePercentage 
                                ? <span className={priceDifferencePercentage > 20 ? 'text-red-500' : 'text-muted-foreground'}>
                                    {priceDifferencePercentage}%
                                  </span>
                                : '-'
                              }
                            </TableCell>
                            <TableCell>
                              {category.quotes.some(q => q.status === 'approved')
                                ? <Badge className="bg-green-600">Attribué</Badge>
                                : <Badge className="bg-amber-500">En attente</Badge>
                              }
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
