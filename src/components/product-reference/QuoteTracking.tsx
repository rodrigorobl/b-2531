
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Clock, Download, FileText, Plus, Upload, Calendar, DollarSign, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from '@/contexts/ProfileContext';

interface Quote {
  id: string;
  version: number;
  date: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'commented';
  comments?: string[];
  file?: string;
}

export default function QuoteTracking() {
  const { toast } = useToast();
  const { activeProfile } = useProfile();
  const isIndustrial = activeProfile === 'industriel';
  
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: 'quote-1',
      version: 1,
      date: '15/03/2024',
      amount: 45600,
      status: 'commented',
      comments: ["Pourriez-vous préciser les délais de livraison?"]
    },
    {
      id: 'quote-2',
      version: 2,
      date: '22/03/2024',
      amount: 45600,
      status: 'rejected',
      comments: ["Le prix est trop élevé, merci de revoir votre offre"]
    },
    {
      id: 'quote-3',
      version: 3,
      date: '29/03/2024',
      amount: 42800,
      status: 'approved',
      comments: ["Devis avec remise de 5%", "Délai de livraison: 3 semaines"]
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newQuote, setNewQuote] = useState({
    amount: '',
    comments: '',
    file: null as File | null
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewQuote({
        ...newQuote,
        file: e.target.files[0]
      });
    }
  };
  
  const handleSubmitQuote = () => {
    if (!newQuote.amount || !newQuote.file) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    
    const amount = parseFloat(newQuote.amount);
    if (isNaN(amount)) {
      toast({
        title: "Montant invalide",
        description: "Veuillez entrer un montant valide",
        variant: "destructive"
      });
      return;
    }
    
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    const newQuoteObject: Quote = {
      id: `quote-${quotes.length + 1}`,
      version: Math.max(...quotes.map(q => q.version)) + 1,
      date: formattedDate,
      amount: amount,
      status: 'pending',
      comments: newQuote.comments ? [newQuote.comments] : undefined
    };
    
    setQuotes([...quotes, newQuoteObject]);
    setNewQuote({
      amount: '',
      comments: '',
      file: null
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Devis ajouté",
      description: "Votre devis a été ajouté avec succès",
    });
  };
  
  const getStatusBadge = (status: Quote['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> En attente</Badge>;
      case 'approved':
        return <Badge variant="success"><CheckCircle className="h-3 w-3 mr-1" /> Accepté</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Refusé</Badge>;
      case 'commented':
        return <Badge variant="warning"><MessageSquare className="h-3 w-3 mr-1" /> Commenté</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Suivi des devis</CardTitle>
        {isIndustrial && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un devis
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau devis</DialogTitle>
                <DialogDescription>
                  Remplissez les informations ci-dessous pour ajouter un nouveau devis.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant HT (€)</Label>
                  <Input 
                    id="amount" 
                    placeholder="42800" 
                    value={newQuote.amount}
                    onChange={(e) => setNewQuote({...newQuote, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comments">Commentaires (optionnel)</Label>
                  <Textarea 
                    id="comments" 
                    placeholder="Ex: Devis avec remise de 5%, délai de livraison 3 semaines"
                    value={newQuote.comments}
                    onChange={(e) => setNewQuote({...newQuote, comments: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Fichier du devis (PDF)</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="file" 
                      type="file" 
                      accept=".pdf" 
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                <Button onClick={handleSubmitQuote}>Enregistrer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quotes.length === 0 ? (
            <div className="text-center p-6 text-muted-foreground">
              Aucun devis n'a encore été ajouté.
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div key={quote.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Devis v{quote.version}</h3>
                          {getStatusBadge(quote.status)}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Date: {quote.date}</span>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>Montant: {quote.amount.toLocaleString('fr-FR')} € HT</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                    
                    {quote.comments && quote.comments.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <h4 className="text-sm font-medium flex items-center mb-2">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Commentaires
                        </h4>
                        <ul className="space-y-1">
                          {quote.comments.map((comment, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {comment}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
