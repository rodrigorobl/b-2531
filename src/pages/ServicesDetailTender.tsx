
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Building, Calendar, Download, FileText, PenLine } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuoteChat } from '@/components/services-quotes/QuoteChat';
import { QuoteMessage } from '@/types/services-quotes';

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface QuoteDetail {
  id: string;
  tenderId: string;
  projectName: string;
  clientName: string;
  title: string;
  status: 'pending' | 'accepted' | 'rejected' | 'non-conforme' | 'conforme';
  submissionDate: string;
  validUntil: string;
  deliveryTime: string;
  totalAmount: number;
  items: QuoteItem[];
  message?: string;
  clientRemarks?: string;
}

export default function ServicesDetailTender() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  
  // Mock data pour un devis
  const mockQuote: QuoteDetail = {
    id: 'quote-123',
    tenderId: 'service-001',
    projectName: 'Location de conteneurs de stockage - Chantier Les Ormes',
    clientName: 'Nexity',
    title: 'Devis pour location de 5 conteneurs sécurisés',
    status: 'pending',
    submissionDate: '10/05/2024',
    validUntil: '10/06/2024',
    deliveryTime: '2 semaines après confirmation',
    totalAmount: 15000,
    items: [
      {
        id: '1',
        description: 'Conteneur de stockage 20 pieds - Location mensuelle',
        quantity: 5,
        unitPrice: 150,
        total: 750
      },
      {
        id: '2',
        description: 'Installation sur site',
        quantity: 5,
        unitPrice: 200,
        total: 1000
      },
      {
        id: '3',
        description: 'Durée totale de location (18 mois)',
        quantity: 18,
        total: 13500,
        unitPrice: 750
      }
    ],
    message: 'Nous vous proposons la location de 5 conteneurs sécurisés avec serrures renforcées et système d\'alarme intégré. Le prix inclut la livraison, l\'installation et la maintenance pendant toute la durée du chantier.',
  };

  // Mock messages pour la conversation
  const [messages, setMessages] = useState<QuoteMessage[]>([
    {
      id: 'msg-1',
      quoteId: 'quote-123',
      senderId: 'client-1',
      senderName: 'Jean Dupont (Nexity)',
      message: 'Pouvez-vous préciser le système de sécurité utilisé pour les conteneurs ?',
      createdAt: '2024-05-12T10:30:00'
    },
    {
      id: 'msg-2',
      quoteId: 'quote-123',
      senderId: 'provider-1',
      senderName: 'Votre entreprise',
      message: 'Bien sûr, nos conteneurs sont équipés de serrures haute sécurité à code et d\'un système d\'alarme relié à notre centrale de surveillance 24/7. Nous pouvons également installer des caméras de surveillance si nécessaire (option non incluse dans ce devis).',
      createdAt: '2024-05-12T11:15:00'
    }
  ]);

  const handleBack = () => {
    navigate(`/services-tender-details/${mockQuote.tenderId}`);
  };

  const handleSendMessage = (message: string) => {
    const newMessage: QuoteMessage = {
      id: `msg-${messages.length + 1}`,
      quoteId: 'quote-123',
      senderId: 'provider-1',
      senderName: 'Votre entreprise',
      message,
      createdAt: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">En attente</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500">Accepté</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Refusé</Badge>;
      case 'conforme':
        return <Badge className="bg-blue-500">Conforme</Badge>;
      case 'non-conforme':
        return <Badge className="bg-amber-500">Non conforme</Badge>;
      default:
        return <Badge variant="outline">En attente</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <Button variant="outline" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux appels d'offres
        </Button>

        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{mockQuote.title}</h1>
            <p className="text-muted-foreground mb-2">
              {mockQuote.projectName} - Client: {mockQuote.clientName}
            </p>
            <div className="flex items-center gap-2">
              {getStatusBadge(mockQuote.status)}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar size={14} />
                <span>Soumis le {mockQuote.submissionDate}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Voir le PDF
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
            <Button>
              <PenLine className="mr-2 h-4 w-4" />
              Modifier le devis
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="details">Détails du devis</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            {mockQuote.clientRemarks && (
              <TabsTrigger value="remarks">Remarques client</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Éléments du devis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">Description</th>
                          <th className="text-right py-2 px-4">Quantité</th>
                          <th className="text-right py-2 px-4">Prix unitaire</th>
                          <th className="text-right py-2 px-4">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockQuote.items.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="py-2 px-4">{item.description}</td>
                            <td className="text-right py-2 px-4">{item.quantity}</td>
                            <td className="text-right py-2 px-4">{item.unitPrice} €</td>
                            <td className="text-right py-2 px-4">{item.total} €</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} className="text-right font-medium py-3 px-4">
                            Total HT:
                          </td>
                          <td className="text-right font-bold py-3 px-4">
                            {mockQuote.totalAmount} €
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Client</h3>
                    <p className="text-muted-foreground">{mockQuote.clientName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Projet</h3>
                    <p className="text-muted-foreground">{mockQuote.projectName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Validité</h3>
                    <p className="text-muted-foreground">Jusqu'au {mockQuote.validUntil}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Délai de livraison</h3>
                    <p className="text-muted-foreground">{mockQuote.deliveryTime}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Statut</h3>
                    {getStatusBadge(mockQuote.status)}
                  </div>
                  {mockQuote.message && (
                    <div>
                      <h3 className="font-medium mb-1">Message joint</h3>
                      <div className="bg-muted/50 p-3 rounded-md text-sm">
                        {mockQuote.message}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="communications">
            <Card>
              <CardHeader>
                <CardTitle>Communications</CardTitle>
              </CardHeader>
              <CardContent>
                <QuoteChat 
                  messages={messages} 
                  onSendMessage={handleSendMessage} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          {mockQuote.clientRemarks && (
            <TabsContent value="remarks">
              <Card>
                <CardHeader>
                  <CardTitle>Remarques du client</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-md">
                    {mockQuote.clientRemarks}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
