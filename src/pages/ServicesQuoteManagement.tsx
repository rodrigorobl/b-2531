
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, FileText, Filter, FilePlus2, Download, Calendar, Building, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Quote, QuoteRequest } from '@/types/services-quotes';
import { QuoteRequestsList } from '@/components/services-quotes/QuoteRequestsList';
import { QuotesList } from '@/components/services-quotes/QuotesList';

// Mock data for demonstration
const mockQuoteRequests: QuoteRequest[] = [
  {
    id: 'req1',
    projectId: 'proj1',
    projectName: 'Résidence Les Cèdres',
    requesterType: 'developer',
    requesterName: 'Promoteur ABC',
    requesterId: 'comp1',
    serviceId: 'serv1',
    serviceName: 'Nettoyage de fin de chantier',
    requestDate: '2023-05-15',
    desiredCompletionDate: '2023-06-30',
    description: 'Nettoyage complet de 15 appartements avant livraison',
    status: 'pending'
  },
  {
    id: 'req2',
    projectId: 'proj2',
    projectName: 'Tour Horizon',
    requesterType: 'constructor',
    requesterName: 'Construction XYZ',
    requesterId: 'comp2',
    serviceId: 'serv2',
    serviceName: 'Location nacelle élévatrice',
    requestDate: '2023-05-10',
    desiredCompletionDate: '2023-05-25',
    description: 'Location nacelle 15m pour 5 jours',
    status: 'sent'
  },
  {
    id: 'req3',
    projectId: 'proj3',
    projectName: 'Centre Commercial Est',
    requesterType: 'project-manager',
    requesterName: 'Bureau Études Tech',
    requesterId: 'comp3',
    serviceId: 'serv3',
    serviceName: 'Contrôle technique installations',
    requestDate: '2023-05-05',
    desiredCompletionDate: '2023-05-20',
    description: 'Vérification conformité électrique',
    status: 'accepted'
  }
];

const mockQuotes: Quote[] = [
  {
    id: 'quote1',
    requestId: 'req1',
    projectId: 'proj1',
    projectName: 'Résidence Les Cèdres',
    recipientType: 'developer',
    recipientName: 'Promoteur ABC',
    recipientId: 'comp1',
    serviceId: 'serv1',
    serviceName: 'Nettoyage de fin de chantier',
    createdAt: '2023-05-16',
    updatedAt: '2023-05-16',
    status: 'sent',
    currentAmount: 3500,
    versions: [
      {
        id: 'v1',
        quoteId: 'quote1',
        version: 1,
        amount: 3500,
        createdAt: '2023-05-16'
      }
    ],
    isVoluntary: false
  },
  {
    id: 'quote2',
    projectId: 'proj4',
    projectName: 'Immeuble Le Parc',
    recipientType: 'constructor',
    recipientName: 'Bâtiment Pro',
    recipientId: 'comp4',
    serviceId: 'serv4',
    serviceName: 'Entretien espaces verts',
    createdAt: '2023-05-05',
    updatedAt: '2023-05-07',
    status: 'pending',
    currentAmount: 1200,
    versions: [
      {
        id: 'v2',
        quoteId: 'quote2',
        version: 1,
        amount: 1500,
        createdAt: '2023-05-05'
      },
      {
        id: 'v3',
        quoteId: 'quote2',
        version: 2,
        amount: 1200,
        createdAt: '2023-05-07',
        notes: 'Révision suite à discussion client'
      }
    ],
    isVoluntary: true
  },
  {
    id: 'quote3',
    requestId: 'req3',
    projectId: 'proj3',
    projectName: 'Centre Commercial Est',
    recipientType: 'project-manager',
    recipientName: 'Bureau Études Tech',
    recipientId: 'comp3',
    serviceId: 'serv3',
    serviceName: 'Contrôle technique installations',
    createdAt: '2023-05-06',
    updatedAt: '2023-05-10',
    status: 'accepted',
    currentAmount: 2800,
    versions: [
      {
        id: 'v4',
        quoteId: 'quote3',
        version: 1,
        amount: 3200,
        createdAt: '2023-05-06'
      },
      {
        id: 'v5',
        quoteId: 'quote3',
        version: 2,
        amount: 2800,
        createdAt: '2023-05-10',
        notes: 'Réduction suite à négociation'
      }
    ],
    isVoluntary: false
  }
];

export default function ServicesQuoteManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState<QuoteRequest[]>(mockQuoteRequests);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(mockQuotes);

  // Handle search and filtering
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term) {
      setFilteredRequests(mockQuoteRequests.filter(request => 
        request.projectName.toLowerCase().includes(term) || 
        request.serviceName.toLowerCase().includes(term) ||
        request.requesterName.toLowerCase().includes(term)
      ));
      
      setFilteredQuotes(mockQuotes.filter(quote => 
        quote.projectName.toLowerCase().includes(term) || 
        quote.serviceName.toLowerCase().includes(term) ||
        quote.recipientName.toLowerCase().includes(term)
      ));
    } else {
      setFilteredRequests(mockQuoteRequests);
      setFilteredQuotes(mockQuotes);
    }
  };

  // Handle export functionality
  const handleExportPDF = () => {
    console.log('Exporting as PDF...');
    // Implementation would be added here
  };

  const handleExportXLS = () => {
    console.log('Exporting as XLS...');
    // Implementation would be added here
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des devis</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportPDF}>
              <FileText size={16} className="mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={handleExportXLS}>
              <FileSpreadsheet size={16} className="mr-2" />
              Export XLS
            </Button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher par projet, service ou entreprise..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button variant="outline">
            <Filter size={16} className="mr-2" />
            Filtres
          </Button>
          <Link to="/create-quote">
            <Button>
              <FilePlus2 size={16} className="mr-2" />
              Nouveau devis
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="requests">Demandes de devis reçues</TabsTrigger>
            <TabsTrigger value="quotes">Devis envoyés</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Demandes de devis</CardTitle>
                <CardDescription>
                  Consultez et répondez aux demandes de devis pour vos services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuoteRequestsList requests={filteredRequests} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes">
            <Card>
              <CardHeader>
                <CardTitle>Devis envoyés</CardTitle>
                <CardDescription>
                  Suivez l'état de vos devis envoyés, qu'ils soient en réponse à une demande ou envoyés spontanément
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuotesList quotes={filteredQuotes} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
