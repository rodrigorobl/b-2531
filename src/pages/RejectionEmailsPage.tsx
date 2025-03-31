
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Save, Calendar, Edit, Copy } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RejectedBidder {
  id: string;
  companyName: string;
  email: string;
  customMessage: boolean;
  message: string;
}

export default function RejectionEmailsPage() {
  const { tenderId, lotId, winnerBidId } = useParams<{ tenderId: string; lotId: string; winnerBidId: string }>();
  const navigate = useNavigate();
  const [defaultMessage, setDefaultMessage] = useState<string>(
    `Madame, Monsieur,

Nous vous remercions pour votre participation à notre appel d'offres concernant le lot "${getLotName()}".

Après une analyse approfondie des différentes propositions, nous avons le regret de vous informer que votre offre n'a pas été retenue pour ce projet.

Nous vous remercions pour le temps et les efforts que vous avez consacrés à l'élaboration de votre proposition, et nous espérons avoir l'occasion de collaborer avec vous sur de futurs projets.

Cordialement,
L'équipe projet`
  );
  
  const [rejectedBidders, setRejectedBidders] = useState<RejectedBidder[]>([]);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [winnerName, setWinnerName] = useState<string>("");

  // Mock function to get lot name (would be replaced by actual data fetching)
  function getLotName() {
    return "Gros Œuvre";
  }

  useEffect(() => {
    // In a real app, we would fetch the data from an API
    // For now, we'll use mock data
    const mockRejectedBidders = [
      { id: 'bid-2', companyName: 'Constructions Martin', email: 'contact@constructions-martin.fr', customMessage: false, message: defaultMessage },
      { id: 'bid-3', companyName: 'Bouygues Bâtiment', email: 'appels-offres@bouygues.fr', customMessage: false, message: defaultMessage },
      { id: 'bid-4', companyName: 'Vinci Construction', email: 'ao@vinci-construction.fr', customMessage: false, message: defaultMessage },
    ];
    
    setRejectedBidders(mockRejectedBidders);
    setWinnerName("BTP Construction");
    setIsLoading(false);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleCustomMessage = (bidderId: string) => {
    setRejectedBidders(prevBidders => 
      prevBidders.map(bidder => 
        bidder.id === bidderId 
          ? { ...bidder, customMessage: !bidder.customMessage } 
          : bidder
      )
    );
  };

  const updateMessage = (bidderId: string, message: string) => {
    setRejectedBidders(prevBidders => 
      prevBidders.map(bidder => 
        bidder.id === bidderId 
          ? { ...bidder, message } 
          : bidder
      )
    );
  };

  const updateDefaultMessage = (message: string) => {
    setDefaultMessage(message);
    // Update all non-custom messages
    setRejectedBidders(prevBidders => 
      prevBidders.map(bidder => 
        !bidder.customMessage 
          ? { ...bidder, message } 
          : bidder
      )
    );
  };

  const handleSendEmails = () => {
    toast.success('Emails programmés', {
      description: `Les emails seront envoyés le ${scheduledDate ? format(scheduledDate, 'dd MMMM yyyy', { locale: fr }) : 'immédiatement'}.`
    });
    
    // In a real app, this would send the data to an API
    console.log({
      lotId,
      winnerBidId,
      scheduledDate,
      rejectedBidders
    });
    
    // Navigate back to lot analysis
    setTimeout(() => {
      navigate(`/tender/${tenderId}/lot/${lotId}`);
    }, 1500);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-center h-48">
            <p>Chargement des données...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <h1 className="text-2xl font-bold mt-4">Notifications aux entreprises non retenues</h1>
          <p className="text-muted-foreground">
            Lot: {getLotName()} - Attribution à {winnerName}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Message par défaut</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Ce message sera envoyé à toutes les entreprises non retenues (sauf personnalisation).
              </p>
              <Textarea 
                className="min-h-[200px]" 
                value={defaultMessage}
                onChange={(e) => updateDefaultMessage(e.target.value)}
              />
              
              <div className="mt-4">
                <p className="text-muted-foreground text-sm mb-2">Variables disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">%ENTREPRISE%</Badge>
                  <Badge variant="outline">%LOT%</Badge>
                  <Badge variant="outline">%PROJET%</Badge>
                  <Badge variant="outline">%DATE%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Paramètres d'envoi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="scheduledDate">Date d'envoi programmée</Label>
                  <div className="flex items-center mt-1.5">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <DatePicker
                      date={scheduledDate}
                      setDate={setScheduledDate}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleSendEmails} 
                    className="w-full"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Programmer l'envoi
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Entreprises non retenues ({rejectedBidders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {rejectedBidders.map((bidder) => (
                <div key={bidder.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">{bidder.companyName}</h3>
                      <p className="text-sm text-muted-foreground">{bidder.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`custom-${bidder.id}`}
                          checked={bidder.customMessage}
                          onCheckedChange={() => toggleCustomMessage(bidder.id)}
                        />
                        <Label htmlFor={`custom-${bidder.id}`} className="text-sm">
                          Personnaliser le message
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  {bidder.customMessage && (
                    <div>
                      <div className="flex justify-end mb-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateMessage(bidder.id, defaultMessage)}
                        >
                          <Copy className="mr-2 h-3 w-3" />
                          Copier le message par défaut
                        </Button>
                      </div>
                      <Textarea 
                        className="min-h-[150px]" 
                        value={bidder.message}
                        onChange={(e) => updateMessage(bidder.id, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
