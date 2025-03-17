
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LotAnalysisChart } from '@/components/lots/LotAnalysisChart';
import { LotBidDetails } from '@/components/lots/LotBidDetails';
import { LotMessages } from '@/components/lots/LotMessages';
import { FileText, Download, Filter, Check, CheckCircle, XCircle, AlertTriangle, MessageSquare, 
         ChevronLeft, ChevronRight, Info, DownloadCloud, ExternalLink } from 'lucide-react';

// Types for the lot analysis page
interface Bid {
  id: string;
  companyId: string;
  companyName: string;
  amount: number;
  submissionDate: string;
  compliant: boolean;
  complianceNotes: string;
  solvencyScore: 'excellent' | 'average' | 'at-risk';
  administrativeScore: number;
  selected: boolean;
}

interface Lot {
  id: string;
  name: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  projectId: string;
  projectName: string;
  estimatedBudget: number;
  bids: Bid[];
}

export default function LotAnalysis() {
  const { lotId, projectId } = useParams<{ lotId: string, projectId: string }>();
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const [lot, setLot] = useState<Lot>({
    id: lotId || '1-2',
    name: 'Électricité',
    status: 'pending',
    projectId: projectId || '1',
    projectName: 'Centre Commercial Riviera',
    estimatedBudget: 180000,
    bids: [
      {
        id: '1',
        companyId: 'c1',
        companyName: 'ElectroPro SARL',
        amount: 178500,
        submissionDate: '2023-05-10',
        compliant: true,
        complianceNotes: 'Conforme aux spécifications techniques. Délais respectés.',
        solvencyScore: 'excellent',
        administrativeScore: 98,
        selected: false
      },
      {
        id: '2',
        companyId: 'c2',
        companyName: 'Électricité Générale France',
        amount: 162000,
        submissionDate: '2023-05-12',
        compliant: true,
        complianceNotes: 'Conforme aux spécifications, mais délai d\'exécution un peu long.',
        solvencyScore: 'average',
        administrativeScore: 85,
        selected: false
      },
      {
        id: '3',
        companyId: 'c3',
        companyName: 'ElectroSystems',
        amount: 195000,
        submissionDate: '2023-05-08',
        compliant: false,
        complianceNotes: 'Non conforme: certaines spécifications techniques ne sont pas respectées.',
        solvencyScore: 'at-risk',
        administrativeScore: 72,
        selected: false
      },
      {
        id: '4',
        companyId: 'c4',
        companyName: 'Entreprise Bouygues Électricité',
        amount: 181200,
        submissionDate: '2023-05-15',
        compliant: true,
        complianceNotes: 'Conforme à toutes les spécifications. Excellente méthodologie.',
        solvencyScore: 'excellent',
        administrativeScore: 100,
        selected: false
      }
    ]
  });
  
  const [selectedBids, setSelectedBids] = useState<string[]>([]);
  const [filterCompliant, setFilterCompliant] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [commentBidId, setCommentBidId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  
  // Filter and sort the bids
  const filteredBids = lot.bids.filter(bid => {
    if (filterCompliant === 'compliant') return bid.compliant;
    if (filterCompliant === 'non-compliant') return !bid.compliant;
    return true;
  });
  
  const sortedBids = [...filteredBids].sort((a, b) => {
    if (sortBy === 'amount-asc') return a.amount - b.amount;
    if (sortBy === 'amount-desc') return b.amount - a.amount;
    if (sortBy === 'date-asc') return new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime();
    if (sortBy === 'date-desc') return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
    if (sortBy === 'solvency') {
      const scoreMap = { 'excellent': 3, 'average': 2, 'at-risk': 1 };
      return scoreMap[b.solvencyScore] - scoreMap[a.solvencyScore];
    }
    if (sortBy === 'administrative') return b.administrativeScore - a.administrativeScore;
    return 0;
  });
  
  const toggleBidSelection = (bidId: string) => {
    if (selectedBids.includes(bidId)) {
      setSelectedBids(selectedBids.filter(id => id !== bidId));
    } else {
      setSelectedBids([...selectedBids, bidId]);
    }
  };
  
  const selectWinningBid = (bidId: string) => {
    setLot(prevLot => ({
      ...prevLot,
      status: 'assigned',
      bids: prevLot.bids.map(bid => ({
        ...bid,
        selected: bid.id === bidId
      }))
    }));
    
    toast.success('Lot attribué avec succès', {
      description: 'Le lot a été attribué à l\'entreprise sélectionnée.'
    });
  };
  
  const addComment = () => {
    // In a real app, this would save the comment to the database
    toast.success('Commentaire ajouté', {
      description: 'Votre commentaire a été enregistré avec succès.'
    });
    setShowCommentDialog(false);
    setCommentText('');
  };
  
  const downloadSummary = (format: 'pdf' | 'excel') => {
    toast.success(`Téléchargement en cours (${format.toUpperCase()})`, {
      description: 'Le récapitulatif des offres sera téléchargé dans quelques instants.'
    });
  };
  
  const getSolvencyBadge = (score: 'excellent' | 'average' | 'at-risk') => {
    switch (score) {
      case 'excellent':
        return <Badge className="bg-green-500">Excellent</Badge>;
      case 'average':
        return <Badge className="bg-amber-500">Moyen</Badge>;
      case 'at-risk':
        return <Badge className="bg-red-500">À risque</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };
  
  const getAdministrativeScoreBadge = (score: number) => {
    let bgColor = '';
    if (score >= 90) bgColor = 'bg-green-500';
    else if (score >= 75) bgColor = 'bg-amber-500';
    else bgColor = 'bg-red-500';
    
    return <Badge className={bgColor}>{score}%</Badge>;
  };
  
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate(`/tender/${lot.projectId}`)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{lot.name}</h1>
              <div className="text-muted-foreground flex items-center gap-1">
                Projet: <Link to={`/tender/${lot.projectId}`} className="hover:underline">{lot.projectName}</Link>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => downloadSummary('excel')}>
              <DownloadCloud className="mr-2 h-4 w-4" />
              Excel
            </Button>
            <Button variant="outline" onClick={() => downloadSummary('pdf')}>
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Budget estimé</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(lot.estimatedBudget)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Devis reçus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {lot.bids.length}
              </div>
              <div className="text-sm text-muted-foreground">
                {lot.bids.filter(bid => bid.compliant).length} conformes
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Statut du lot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {lot.status === 'pending' ? 'En attente' :
                 lot.status === 'assigned' ? 'Attribué' :
                 lot.status === 'in-progress' ? 'En cours' : 'Terminé'}
              </div>
              {lot.status === 'assigned' && (
                <div className="text-sm text-muted-foreground">
                  Attribué à {lot.bids.find(bid => bid.selected)?.companyName}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="table" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="table">Tableau</TabsTrigger>
              <TabsTrigger value="chart">Graphique</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Select value={filterCompliant || ''} onValueChange={setFilterCompliant}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par conformité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les devis</SelectItem>
                  <SelectItem value="compliant">Conformes</SelectItem>
                  <SelectItem value="non-compliant">Non conformes</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy || ''} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount-asc">Prix croissant</SelectItem>
                  <SelectItem value="amount-desc">Prix décroissant</SelectItem>
                  <SelectItem value="date-asc">Date (plus ancien)</SelectItem>
                  <SelectItem value="date-desc">Date (plus récent)</SelectItem>
                  <SelectItem value="solvency">Solvabilité</SelectItem>
                  <SelectItem value="administrative">Score administratif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="table" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>Entreprise</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Conformité</TableHead>
                      <TableHead>Solvabilité</TableHead>
                      <TableHead>Score Admin.</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedBids.map((bid) => (
                      <TableRow key={bid.id} className={bid.selected ? "bg-primary/5" : ""}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedBids.includes(bid.id)} 
                            onCheckedChange={() => toggleBidSelection(bid.id)}
                            disabled={lot.status === 'assigned'}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{bid.companyName}</TableCell>
                        <TableCell>{formatPrice(bid.amount)}</TableCell>
                        <TableCell>{formatDate(bid.submissionDate)}</TableCell>
                        <TableCell>
                          {bid.compliant ? (
                            <Badge className="bg-green-500 flex items-center gap-1 w-fit">
                              <CheckCircle className="h-3 w-3" /> Conforme
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500 flex items-center gap-1 w-fit">
                              <XCircle className="h-3 w-3" /> Non conforme
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{getSolvencyBadge(bid.solvencyScore)}</TableCell>
                        <TableCell>{getAdministrativeScoreBadge(bid.administrativeScore)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>Détails du devis - {bid.companyName}</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                  <LotBidDetails bid={bid} />
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setCommentBidId(bid.id);
                                setShowCommentDialog(true);
                              }}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            
                            {lot.status !== 'assigned' && bid.compliant && (
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => selectWinningBid(bid.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            
                            {bid.selected && (
                              <Badge className="bg-green-600">Sélectionné</Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {sortedBids.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          Aucun devis trouvé avec les critères actuels.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {selectedBids.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Comparaison des devis sélectionnés</CardTitle>
                  <CardDescription>
                    Comparaison de {selectedBids.length} devis sur des critères clés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Prix</h3>
                      <div className="space-y-2">
                        {selectedBids.map(bidId => {
                          const bid = lot.bids.find(b => b.id === bidId);
                          if (!bid) return null;
                          const diff = ((bid.amount - lot.estimatedBudget) / lot.estimatedBudget * 100).toFixed(1);
                          const diffClass = bid.amount < lot.estimatedBudget ? "text-green-600" : "text-red-500";
                          
                          return (
                            <div key={bid.id} className="flex items-center justify-between">
                              <span>{bid.companyName}:</span>
                              <div className="flex items-center">
                                <span className="font-medium">{formatPrice(bid.amount)}</span>
                                <span className={`ml-2 text-sm ${diffClass}`}>
                                  ({diff}% {bid.amount < lot.estimatedBudget ? 'en dessous' : 'au dessus'} du budget estimé)
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Solvabilité</h3>
                        <div className="space-y-2">
                          {selectedBids.map(bidId => {
                            const bid = lot.bids.find(b => b.id === bidId);
                            if (!bid) return null;
                            
                            return (
                              <div key={bid.id} className="flex items-center justify-between">
                                <span>{bid.companyName}:</span>
                                <div>{getSolvencyBadge(bid.solvencyScore)}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Score administratif</h3>
                        <div className="space-y-2">
                          {selectedBids.map(bidId => {
                            const bid = lot.bids.find(b => b.id === bidId);
                            if (!bid) return null;
                            
                            return (
                              <div key={bid.id} className="flex items-center justify-between">
                                <span>{bid.companyName}:</span>
                                <div>{getAdministrativeScoreBadge(bid.administrativeScore)}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle>Analyse comparative des prix</CardTitle>
                <CardDescription>
                  Visualisation des montants proposés par les entreprises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LotAnalysisChart lot={lot} estimatedBudget={lot.estimatedBudget} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages concernant ce lot</CardTitle>
                <CardDescription>
                  Échanges avec les BET et soumissionnaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LotMessages lotId={lot.id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Comment Dialog */}
      <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un commentaire</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Entreprise: {lot.bids.find(bid => bid.id === commentBidId)?.companyName}
            </p>
            <Textarea
              placeholder="Votre commentaire..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end mt-4">
              <Button onClick={addComment}>Enregistrer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
