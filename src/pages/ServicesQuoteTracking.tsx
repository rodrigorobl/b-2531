
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building, Calendar, ClipboardCheck, MessageSquare, FileText, ChevronRight, PenLine, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Timeline, TimelineItem } from '@/components/services-quotes/Timeline';
import { Quote, QuoteMessage, QuoteVersion } from '@/types/services-quotes';
import { QuoteChat } from '@/components/services-quotes/QuoteChat';

// Mock data for demonstration
const getMockQuote = (id: string): Quote => {
  return {
    id,
    requestId: 'req1',
    projectId: 'proj1',
    projectName: 'Résidence Les Cèdres',
    recipientType: 'developer',
    recipientName: 'Promoteur ABC',
    recipientId: 'comp1',
    serviceId: 'serv1',
    serviceName: 'Nettoyage de fin de chantier',
    createdAt: '2023-05-16',
    updatedAt: '2023-05-20',
    status: 'sent',
    currentAmount: 3200,
    versions: [
      {
        id: 'v1',
        quoteId: id,
        version: 1,
        amount: 3500,
        createdAt: '2023-05-16',
        notes: 'Version initiale'
      },
      {
        id: 'v2',
        quoteId: id,
        version: 2,
        amount: 3200,
        createdAt: '2023-05-20',
        notes: 'Révision après discussion téléphonique'
      }
    ],
    isVoluntary: false
  };
};

const getMockMessages = (quoteId: string): QuoteMessage[] => {
  return [
    {
      id: 'msg1',
      quoteId,
      senderId: 'user1',
      senderName: 'Jean Dupont',
      message: 'Bonjour, pourriez-vous préciser les détails concernant la préparation nécessaire avant votre intervention ?',
      createdAt: '2023-05-17T10:23:00Z'
    },
    {
      id: 'msg2',
      quoteId,
      senderId: 'user2',
      senderName: 'Marie Martin',
      message: 'Bonjour, nous demandons simplement que les espaces soient dégagés de tout matériel de construction. Nous nous occupons du reste.',
      createdAt: '2023-05-17T14:05:00Z'
    },
    {
      id: 'msg3',
      quoteId,
      senderId: 'user1',
      senderName: 'Jean Dupont',
      message: 'Parfait, merci pour ces précisions. Pouvez-vous ajuster votre devis pour inclure également le nettoyage des vitres extérieures ?',
      createdAt: '2023-05-18T09:30:00Z',
      attachments: [
        {
          id: 'att1',
          name: 'plan_nettoyage.pdf',
          url: '#'
        }
      ]
    },
    {
      id: 'msg4',
      quoteId,
      senderId: 'user2',
      senderName: 'Marie Martin',
      message: 'Voici une révision de notre devis incluant le nettoyage des vitres extérieures. J\'ai appliqué une réduction de 300€ sur le total.',
      createdAt: '2023-05-20T11:15:00Z'
    }
  ];
};

export default function ServicesQuoteTracking() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const [quote, setQuote] = useState<Quote>(getMockQuote(quoteId || 'default'));
  const [messages, setMessages] = useState<QuoteMessage[]>(getMockMessages(quoteId || 'default'));
  const [activeVersion, setActiveVersion] = useState<QuoteVersion>(quote.versions[quote.versions.length - 1]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500">En attente</Badge>;
      case 'sent':
        return <Badge className="bg-blue-500">Envoyé</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500">Accepté</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Refusé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const getRequesterTypeLabel = (type: string) => {
    switch (type) {
      case 'constructor':
        return 'Entreprise de construction';
      case 'project-manager':
        return 'Maître d\'œuvre';
      case 'developer':
        return 'Promoteur';
      case 'industrial':
        return 'Industriel';
      case 'service-company':
        return 'Entreprise de services';
      default:
        return 'Inconnu';
    }
  };

  const handleSendMessage = (message: string, attachments?: File[]) => {
    // Here you would normally send this to an API
    const newMessage: QuoteMessage = {
      id: `msg${messages.length + 1}`,
      quoteId: quote.id,
      senderId: 'user2', // Current user ID
      senderName: 'Marie Martin', // Current user name
      message,
      createdAt: new Date().toISOString(),
      attachments: attachments ? attachments.map((file, idx) => ({
        id: `new-att-${idx}`,
        name: file.name,
        url: '#' // In a real app, this would be the uploaded file URL
      })) : undefined
    };
    
    setMessages([...messages, newMessage]);
  };

  const handleCreateNewVersion = () => {
    // In a real app, this would open a form to create a new version
    console.log('Creating new version of quote');
    // Implementation would be added here
  };

  const handleDownloadQuote = (versionId: string) => {
    console.log(`Downloading quote version ${versionId}`);
    // Implementation would be added here
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/services-quote-management" className="hover:underline">Gestion des devis</Link>
          <ChevronRight size={16} />
          <span>Suivi du devis</span>
        </div>

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">{quote.serviceName} - {quote.projectName}</h1>
          <div className="flex items-center gap-2">
            {getStatusBadge(quote.status)}
            {quote.status === 'sent' && (
              <Button onClick={handleCreateNewVersion}>
                <PenLine size={16} className="mr-2" />
                Nouvelle version
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building size={16} />
                Informations client
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div className="font-medium">{getRequesterTypeLabel(quote.recipientType)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Entreprise</div>
                  <Link to={`/company-detail/${quote.recipientId}`} className="font-medium hover:underline">
                    {quote.recipientName}
                  </Link>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Projet</div>
                  <Link to={`/project/${quote.projectId}`} className="font-medium hover:underline">
                    {quote.projectName}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ClipboardCheck size={16} />
                Détails du service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-muted-foreground">Service</div>
                  <div className="font-medium">{quote.serviceName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Demande initiale</div>
                  <div className="font-medium">{formatDate(quote.createdAt)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Dernière mise à jour</div>
                  <div className="font-medium">{formatDate(quote.updatedAt)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar size={16} />
                Montant actuel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{quote.currentAmount.toLocaleString()} €</div>
              <div className="text-sm text-muted-foreground mt-1">
                Dernière version: {activeVersion.version}
              </div>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => handleDownloadQuote(activeVersion.id)}>
                <Download size={14} className="mr-2" />
                Télécharger le devis
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="history">Historique des versions</TabsTrigger>
            <TabsTrigger value="messages">
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-2" />
                Messages et discussions
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Versions du devis</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline>
                  {quote.versions.map((version, index) => (
                    <TimelineItem key={version.id} isLast={index === quote.versions.length - 1}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Version {version.version}</h4>
                          <div className="text-sm text-muted-foreground">{formatDate(version.createdAt)}</div>
                          {version.notes && <p className="mt-1 text-sm">{version.notes}</p>}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{version.amount.toLocaleString()} €</div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-1"
                            onClick={() => handleDownloadQuote(version.id)}
                          >
                            <FileText size={14} className="mr-1" />
                            Voir le PDF
                          </Button>
                        </div>
                      </div>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages et échanges</CardTitle>
              </CardHeader>
              <CardContent>
                <QuoteChat messages={messages} onSendMessage={handleSendMessage} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
