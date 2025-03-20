import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

// Components
import { LotAnalysisHeader } from '@/components/lots/LotAnalysisHeader';
import { LotAnalysisStats } from '@/components/lots/LotAnalysisStats';
import { LotAnalysisTable } from '@/components/lots/LotAnalysisTable';
import { LotComparisonCard } from '@/components/lots/LotComparisonCard';
import { LotAnalysisChartView } from '@/components/lots/LotAnalysisChartView';
import { LotMessages } from '@/components/lots/LotMessages';

// Types
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
  const {
    lotId,
    tenderId
  } = useParams<{
    lotId: string;
    tenderId: string;
  }>();
  const navigate = useNavigate();

  // Mock data for demonstration
  const [lot, setLot] = useState<Lot>({
    id: lotId || '1-2',
    name: 'Électricité',
    status: 'pending',
    projectId: tenderId || '1',
    projectName: 'Centre Commercial Riviera',
    estimatedBudget: 180000,
    bids: [{
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
    }, {
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
    }, {
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
    }, {
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
    }]
  });
  const [selectedBids, setSelectedBids] = useState<string[]>([]);
  const [filterCompliant, setFilterCompliant] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [commentBidId, setCommentBidId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [bidToAssign, setBidToAssign] = useState<string | null>(null);

  useEffect(() => {
    // Log parameters for debugging
    console.log("Route params:", { tenderId, lotId });
    
    // Here you would typically fetch the lot data from an API
    // For now, we're just using the mock data and updating it with the route params
    setLot(prevLot => ({
      ...prevLot,
      id: lotId || prevLot.id,
      projectId: tenderId || prevLot.projectId
    }));
  }, [tenderId, lotId]);

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
      const scoreMap = {
        'excellent': 3,
        'average': 2,
        'at-risk': 1
      };
      return scoreMap[b.solvencyScore] - scoreMap[a.solvencyScore];
    }
    if (sortBy === 'administrative') return b.administrativeScore - a.administrativeScore;
    return 0;
  });

  // Utility functions
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
    setShowAssignDialog(false);
  };
  const openAssignDialog = (bidId: string) => {
    setBidToAssign(bidId);
    setShowAssignDialog(true);
  };
  const openCommentDialog = (bidId: string) => {
    setCommentBidId(bidId);
    setShowCommentDialog(true);
  };
  const addComment = () => {
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
    if (score >= 90) bgColor = 'bg-green-500';else if (score >= 75) bgColor = 'bg-amber-500';else bgColor = 'bg-red-500';
    return <Badge className={bgColor}>{score}%</Badge>;
  };
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };
  const goBack = () => {
    navigate(-1);
  };
  const selectedBidsData = selectedBids.map(bidId => lot.bids.find(b => b.id === bidId)).filter((bid): bid is Bid => bid !== undefined);
  return <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={goBack}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Retour
          </Button>
          
          {lot.status !== 'assigned'}
        </div>
        
        <LotAnalysisHeader lotName={lot.name} projectName={lot.projectName} projectId={lot.projectId} onDownloadSummary={downloadSummary} />
        
        <LotAnalysisStats estimatedBudget={lot.estimatedBudget} bidsCount={lot.bids.length} compliantBidsCount={lot.bids.filter(bid => bid.compliant).length} status={lot.status} selectedCompanyName={lot.bids.find(bid => bid.selected)?.companyName} formatPrice={formatPrice} />
        
        <Tabs defaultValue="table" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="table">Tableau</TabsTrigger>
              
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Select value={filterCompliant || "all"} onValueChange={setFilterCompliant}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par conformité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les devis</SelectItem>
                  <SelectItem value="compliant">Conformes</SelectItem>
                  <SelectItem value="non-compliant">Non conformes</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy || ""} onValueChange={setSortBy}>
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
                <LotAnalysisTable bids={sortedBids} selectedBids={selectedBids} isAssigned={lot.status === 'assigned'} onToggleBidSelection={toggleBidSelection} onOpenCommentDialog={openCommentDialog} onSelectWinningBid={openAssignDialog} formatPrice={formatPrice} formatDate={formatDate} getSolvencyBadge={getSolvencyBadge} getAdministrativeScoreBadge={getAdministrativeScoreBadge} />
              </CardContent>
            </Card>
            
            {selectedBidsData.length > 1 && <LotComparisonCard selectedBids={selectedBidsData} estimatedBudget={lot.estimatedBudget} formatPrice={formatPrice} getSolvencyBadge={getSolvencyBadge} getAdministrativeScoreBadge={getAdministrativeScoreBadge} />}
          </TabsContent>
          
          <TabsContent value="chart">
            <LotAnalysisChartView lot={lot} />
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages concernant ce lot</CardTitle>
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
            <Textarea placeholder="Votre commentaire..." value={commentText} onChange={e => setCommentText(e.target.value)} className="min-h-[100px]" />
            <div className="flex justify-end mt-4">
              <Button onClick={addComment}>Enregistrer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Assign Lot Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer l'attribution du lot</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {bidToAssign ? <>
                <p className="mb-4">
                  Vous êtes sur le point d'attribuer ce lot à l'entreprise:
                </p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-semibold">{lot.bids.find(bid => bid.id === bidToAssign)?.companyName}</p>
                  <p className="text-sm text-muted-foreground">
                    Montant: {formatPrice(lot.bids.find(bid => bid.id === bidToAssign)?.amount || 0)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Cette action est définitive. Le lot sera marqué comme attribué et les autres offres seront refusées automatiquement.
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAssignDialog(false)}>Annuler</Button>
                  <Button onClick={() => selectWinningBid(bidToAssign)}>Confirmer l'attribution</Button>
                </div>
              </> : <>
                <p className="mb-4">
                  Veuillez sélectionner une offre à attribuer depuis le tableau des offres.
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setShowAssignDialog(false)}>Fermer</Button>
                </div>
              </>}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>;
}
