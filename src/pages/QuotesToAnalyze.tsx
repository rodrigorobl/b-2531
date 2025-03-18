
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { 
  ArrowUpDown, 
  Calendar, 
  FileText, 
  User, 
  Building, 
  Clock, 
  Check, 
  X, 
  DollarSign, 
  Filter, 
  Share,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for quotes to analyze
const MOCK_QUOTES = [
  {
    id: 'q1',
    projectId: 'p1',
    projectName: 'Résidence Les Ormes',
    lotId: 'l1',
    lotName: 'Gros œuvre',
    companyId: 'c1',
    companyName: 'Entreprise Durand Construction',
    submissionDate: '2024-05-10',
    amount: 125000,
    status: 'to-analyze' as const,
    dueDate: '2024-05-25', // Added due date
    urgency: 'high' as const
  },
  {
    id: 'q2',
    projectId: 'p1',
    projectName: 'Résidence Les Ormes',
    lotId: 'l2',
    lotName: 'Électricité',
    companyId: 'c2',
    companyName: 'Électricité Moderne',
    submissionDate: '2024-05-11',
    amount: 45000,
    status: 'in-progress' as const,
    dueDate: '2024-05-30', // Added due date
    urgency: 'medium' as const
  },
  {
    id: 'q3',
    projectId: 'p2',
    projectName: 'Immeuble de Bureaux Horizon',
    lotId: 'l3',
    lotName: 'Plomberie',
    companyId: 'c3',
    companyName: 'Plomberie Martin',
    submissionDate: '2024-05-09',
    amount: 32500,
    status: 'compliant' as const,
    dueDate: '2024-05-20', // Added due date
    urgency: 'low' as const
  },
  {
    id: 'q4',
    projectId: 'p2',
    projectName: 'Immeuble de Bureaux Horizon',
    lotId: 'l4',
    lotName: 'Menuiserie',
    companyId: 'c4',
    companyName: 'Menuiserie Dubois',
    submissionDate: '2024-05-08',
    amount: 58200,
    status: 'non-compliant' as const,
    dueDate: '2024-05-15', // Added due date
    urgency: 'high' as const
  },
  {
    id: 'q5',
    projectId: 'p3',
    projectName: 'Centre Commercial Étoile',
    lotId: 'l5',
    lotName: 'Peinture',
    companyId: 'c5',
    companyName: 'Peintures Leroy',
    submissionDate: '2024-05-12',
    amount: 18700,
    status: 'to-analyze' as const,
    dueDate: '2024-05-27', // Added due date
    urgency: 'medium' as const
  },
  {
    id: 'q6',
    projectId: 'p3',
    projectName: 'Centre Commercial Étoile',
    lotId: 'l6',
    lotName: 'Revêtement de sols',
    companyId: 'c6',
    companyName: 'Carrelages & Sols Pro',
    submissionDate: '2024-05-07',
    amount: 42000,
    status: 'to-analyze' as const,
    dueDate: '2024-05-14', // Added due date
    urgency: 'high' as const
  },
];

type QuoteStatus = 'to-analyze' | 'in-progress' | 'compliant' | 'non-compliant';
type UrgencyLevel = 'low' | 'medium' | 'high';

interface Quote {
  id: string;
  projectId: string;
  projectName: string;
  lotId: string;
  lotName: string;
  companyId: string;
  companyName: string;
  submissionDate: string;
  amount: number;
  status: QuoteStatus;
  dueDate: string;
  urgency: UrgencyLevel;
}

export default function QuotesToAnalyze() {
  const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES);
  const [sortField, setSortField] = useState<string>('submissionDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<QuoteStatus | 'all'>('all');
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterLot, setFilterLot] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<UrgencyLevel | 'all'>('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [classificationComment, setClassificationComment] = useState<string>('');
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);

  // Get unique projects and lots for filtering
  const projectOptions = Array.from(new Set(quotes.map(quote => quote.projectName)));
  const lotOptions = Array.from(new Set(quotes.map(quote => quote.lotName)));

  // Sort quotes based on current sort configuration
  const sortedQuotes = [...quotes].sort((a, b) => {
    if (sortField === 'submissionDate') {
      const dateA = new Date(a.submissionDate).getTime();
      const dateB = new Date(b.submissionDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'dueDate') {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'amount') {
      return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortField === 'projectName') {
      return sortDirection === 'asc' 
        ? a.projectName.localeCompare(b.projectName) 
        : b.projectName.localeCompare(a.projectName);
    } else if (sortField === 'urgency') {
      const urgencyValues = { 'low': 0, 'medium': 1, 'high': 2 };
      return sortDirection === 'asc' 
        ? urgencyValues[a.urgency] - urgencyValues[b.urgency] 
        : urgencyValues[b.urgency] - urgencyValues[a.urgency];
    }
    return 0;
  });

  // Filter quotes based on all criteria
  const filteredQuotes = sortedQuotes.filter(quote => {
    const statusMatch = filter === 'all' || quote.status === filter;
    const projectMatch = filterProject === 'all' || quote.projectName === filterProject;
    const lotMatch = filterLot === 'all' || quote.lotName === filterLot;
    const urgencyMatch = filterUrgency === 'all' || quote.urgency === filterUrgency;
    
    return statusMatch && projectMatch && lotMatch && urgencyMatch;
  });

  // Handle sort toggle
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format date string to French locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Format amount to French locale with Euro currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  // Update quote status
  const updateQuoteStatus = (quoteId: string, newStatus: QuoteStatus) => {
    setQuotes(prevQuotes => 
      prevQuotes.map(quote => 
        quote.id === quoteId 
          ? { ...quote, status: newStatus } 
          : quote
      )
    );
    setSelectedQuote(null);
    setClassificationComment('');
  };

  // Reset all filters
  const resetFilters = () => {
    setFilter('all');
    setFilterProject('all');
    setFilterLot('all');
    setFilterUrgency('all');
  };

  // Share quote analysis (mock function)
  const shareQuoteAnalysis = (quoteId: string) => {
    alert(`Partage de l'analyse du devis ${quoteId}`);
  };

  // Render status badge based on quote status
  const renderStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'to-analyze':
        return (
          <Badge className="bg-amber-500 flex items-center gap-1">
            <Clock size={12} /> À analyser
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-blue-500 flex items-center gap-1">
            <User size={12} /> Analyse en cours
          </Badge>
        );
      case 'compliant':
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <Check size={12} /> Conforme
          </Badge>
        );
      case 'non-compliant':
        return (
          <Badge className="bg-red-500 flex items-center gap-1">
            <X size={12} /> Non conforme
          </Badge>
        );
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  // Render urgency badge
  const renderUrgencyBadge = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'high':
        return (
          <Badge className="bg-red-500">Urgente</Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-amber-500">Moyenne</Badge>
        );
      case 'low':
        return (
          <Badge className="bg-green-500">Basse</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-2" asChild>
            <Link to="/dashboard-bet">
              <ArrowLeft size={18} />
              <span className="ml-1">Retour</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Devis à analyser</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              onClick={() => setFilter('all')}
              size="sm"
            >
              Tous
            </Button>
            <Button 
              variant={filter === 'to-analyze' ? 'default' : 'outline'} 
              onClick={() => setFilter('to-analyze')}
              size="sm"
            >
              À analyser
            </Button>
            <Button 
              variant={filter === 'in-progress' ? 'default' : 'outline'} 
              onClick={() => setFilter('in-progress')}
              size="sm"
            >
              En cours
            </Button>
            <Button 
              variant={filter === 'compliant' ? 'default' : 'outline'} 
              onClick={() => setFilter('compliant')}
              size="sm"
            >
              Conformes
            </Button>
            <Button 
              variant={filter === 'non-compliant' ? 'default' : 'outline'} 
              onClick={() => setFilter('non-compliant')}
              size="sm"
            >
              Non conformes
            </Button>
          </div>
          
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter size={16} />
                  Filtres avancés
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Filtres avancés</AlertDialogTitle>
                  <AlertDialogDescription>
                    Affinez votre recherche de devis selon ces critères.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="project-filter" className="text-sm font-medium">
                      Projet
                    </label>
                    <Select 
                      value={filterProject} 
                      onValueChange={setFilterProject}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les projets" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les projets</SelectItem>
                        {projectOptions.map(project => (
                          <SelectItem key={project} value={project}>{project}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="lot-filter" className="text-sm font-medium">
                      Lot
                    </label>
                    <Select 
                      value={filterLot} 
                      onValueChange={setFilterLot}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les lots" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les lots</SelectItem>
                        {lotOptions.map(lot => (
                          <SelectItem key={lot} value={lot}>{lot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="urgency-filter" className="text-sm font-medium">
                      Urgence
                    </label>
                    <Select 
                      value={filterUrgency} 
                      onValueChange={(value) => setFilterUrgency(value as UrgencyLevel | 'all')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les urgences" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les urgences</SelectItem>
                        <SelectItem value="high">Urgente</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="low">Basse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={resetFilters}>Réinitialiser</AlertDialogCancel>
                  <AlertDialogAction>Appliquer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Liste des devis</span>
              <span className="text-sm font-normal">
                {filteredQuotes.length} {filteredQuotes.length > 1 ? 'devis trouvés' : 'devis trouvé'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('projectName')}>
                    <div className="flex items-center gap-1">
                      Projet
                      {sortField === 'projectName' && (
                        <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Lot</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Building size={14} className="mr-1" />
                      Entreprise
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('submissionDate')}>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="mr-1" />
                      Date du devis
                      {sortField === 'submissionDate' && (
                        <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('dueDate')}>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="mr-1" />
                      Échéance
                      {sortField === 'dueDate' && (
                        <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('amount')}>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="mr-1" />
                      Montant
                      {sortField === 'amount' && (
                        <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('urgency')}>
                    <div className="flex items-center gap-1">
                      Urgence
                      {sortField === 'urgency' && (
                        <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      Aucun devis ne correspond à vos critères
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuotes.map((quote) => (
                    <TableRow key={quote.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">{quote.projectName}</div>
                      </TableCell>
                      <TableCell>{quote.lotName}</TableCell>
                      <TableCell>{quote.companyName}</TableCell>
                      <TableCell>{formatDate(quote.submissionDate)}</TableCell>
                      <TableCell>{formatDate(quote.dueDate)}</TableCell>
                      <TableCell className="font-medium">{formatAmount(quote.amount)}</TableCell>
                      <TableCell>{renderStatusBadge(quote.status)}</TableCell>
                      <TableCell>{renderUrgencyBadge(quote.urgency)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/quote/${quote.id}`}>
                              <FileText size={14} className="mr-1" />
                              Voir
                            </Link>
                          </Button>
                          
                          {(quote.status === 'to-analyze' || quote.status === 'in-progress') && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="default" size="sm">
                                  <Check size={14} className="mr-1" />
                                  Classifier
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Classifier le devis</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Veuillez choisir le statut du devis et ajouter un commentaire si nécessaire.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="flex gap-4">
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="flex-1" 
                                      onClick={() => updateQuoteStatus(quote.id, 'compliant')}
                                    >
                                      <Check size={14} className="mr-1" />
                                      Conforme
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="flex-1" 
                                      onClick={() => updateQuoteStatus(quote.id, 'non-compliant')}
                                    >
                                      <X size={14} className="mr-1" />
                                      Non conforme
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="flex-1" 
                                      onClick={() => updateQuoteStatus(quote.id, 'in-progress')}
                                    >
                                      <Clock size={14} className="mr-1" />
                                      En cours
                                    </Button>
                                  </div>
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          
                          <Button variant="ghost" size="sm" onClick={() => shareQuoteAnalysis(quote.id)}>
                            <Share size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
