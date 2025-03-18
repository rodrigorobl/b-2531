
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, Download, Send, Flag, MessageSquare, PenLine } from 'lucide-react';
import QuoteGeneralInfo from '@/components/quotes/QuoteGeneralInfo';
import QuoteLineItems from '@/components/quotes/QuoteLineItems';
import QuoteComparisonView from '@/components/quotes/QuoteComparisonView';
import QuoteAnnotations from '@/components/quotes/QuoteAnnotations';
import { Badge } from '@/components/ui/badge';

// Types pour les postes du devis
interface QuoteLineItem {
  id: string;
  designation: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
  observations?: string;
  annotations?: {
    id: string;
    text: string;
    author: string;
    timestamp: string;
    isInternal: boolean;
  }[];
}

// Type pour les versions de devis
interface QuoteVersion {
  id: string;
  versionNumber: number;
  submissionDate: string;
  totalAmount: number;
  status: 'conforme' | 'non-conforme' | 'presenti';
  statusReason?: string;
}

// Type pour le devis complet
interface Quote {
  id: string;
  projectId: string;
  projectName: string;
  lotId: string;
  lotName: string;
  companyId: string;
  companyName: string;
  submissionDate: string;
  totalAmountHT: number;
  totalAmountTTC: number;
  status: 'conforme' | 'non-conforme' | 'presenti';
  statusReason?: string;
  currentVersion: number;
  versions: QuoteVersion[];
  lineItems: QuoteLineItem[];
  budgetImpact: {
    lotBudget: number;
    deviation: number;
    deviationPercentage: number;
  };
}

// Données de test pour le devis
const MOCK_QUOTE: Quote = {
  id: 'quote-001',
  projectId: 'project-001',
  projectName: "Construction d'un immeuble de bureaux à Lyon Part-Dieu",
  lotId: 'lot-001',
  lotName: 'Gros œuvre',
  companyId: 'company-001',
  companyName: 'BTP Construction',
  submissionDate: '2024-05-01',
  totalAmountHT: 850000,
  totalAmountTTC: 1020000,
  status: 'conforme',
  currentVersion: 2,
  versions: [
    {
      id: 'version-001',
      versionNumber: 1,
      submissionDate: '2024-04-15',
      totalAmount: 880000,
      status: 'non-conforme',
      statusReason: 'Périmètre incomplet',
    },
    {
      id: 'version-002',
      versionNumber: 2,
      submissionDate: '2024-05-01',
      totalAmount: 850000,
      status: 'conforme',
    },
  ],
  lineItems: [
    {
      id: 'line-001',
      designation: 'Fondations spéciales',
      quantity: 1200,
      unit: 'm²',
      unitPrice: 250,
      totalPrice: 300000,
      observations: 'Technique par pieux forés',
      annotations: [
        {
          id: 'ann-001',
          text: 'Prix dans la fourchette haute du marché',
          author: 'Jean Martin',
          timestamp: '2024-05-02 14:30',
          isInternal: true,
        },
      ],
    },
    {
      id: 'line-002',
      designation: 'Dalle béton RDC',
      quantity: 800,
      unit: 'm²',
      unitPrice: 180,
      totalPrice: 144000,
      observations: 'Béton haute performance',
    },
    {
      id: 'line-003',
      designation: 'Structure béton armé',
      quantity: 950,
      unit: 'm³',
      unitPrice: 320,
      totalPrice: 304000,
    },
    {
      id: 'line-004',
      designation: 'Coffrage',
      quantity: 2500,
      unit: 'm²',
      unitPrice: 40,
      totalPrice: 100000,
      discount: 5,
    },
  ],
  budgetImpact: {
    lotBudget: 900000,
    deviation: -50000,
    deviationPercentage: -5.56,
  },
};

export default function QuoteAnalysis() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote>(MOCK_QUOTE);
  const [activeTab, setActiveTab] = useState('details');

  // Cette fonction serait utilisée pour récupérer les données du devis
  // depuis une API dans une application réelle
  /*
  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await fetch(`/api/quotes/${quoteId}`);
        const data = await response.json();
        setQuote(data);
      } catch (error) {
        console.error('Erreur lors du chargement du devis', error);
      }
    };
    
    fetchQuoteData();
  }, [quoteId]);
  */

  const handleBack = () => {
    navigate(-1);
  };

  const handleMarkAs = (status: 'conforme' | 'non-conforme' | 'presenti', reason?: string) => {
    setQuote(prev => ({
      ...prev,
      status,
      statusReason: reason
    }));
    // Ici, vous appelleriez une API pour mettre à jour le statut du devis
  };

  const handleExportPDF = () => {
    // Logique d'export PDF
    console.log('Export PDF');
  };

  const handleExportExcel = () => {
    // Logique d'export Excel
    console.log('Export Excel');
  };

  const handleSendFeedback = () => {
    // Logique d'envoi de retour à l'entreprise
    console.log('Envoi de retour');
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Analyse du devis</h1>
              <p className="text-muted-foreground">
                {quote.projectName} - {quote.lotName}
              </p>
            </div>
            <div className="mt-2 md:mt-0 flex items-center gap-2">
              <Badge className={
                quote.status === 'conforme' ? 'bg-green-500' : 
                quote.status === 'non-conforme' ? 'bg-red-500' : 
                'bg-blue-500'
              }>
                {quote.status === 'conforme' ? 'Conforme' : 
                 quote.status === 'non-conforme' ? 'Non conforme' : 
                 'Présenti'}
              </Badge>
              <Badge variant="outline">Version {quote.currentVersion}</Badge>
            </div>
          </div>
        </div>

        <QuoteGeneralInfo quote={quote} />

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="details">Détail du devis</TabsTrigger>
            <TabsTrigger value="annotations">Annotations</TabsTrigger>
            <TabsTrigger value="comparison">Comparaison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-4">
            <QuoteLineItems lineItems={quote.lineItems} />
          </TabsContent>
          
          <TabsContent value="annotations" className="mt-4">
            <QuoteAnnotations quoteId={quote.id} lineItems={quote.lineItems} />
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-4">
            <QuoteComparisonView quoteId={quote.id} />
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex flex-wrap gap-3">
          {quote.status !== 'conforme' && (
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleMarkAs('conforme')}>
              Marquer comme conforme
            </Button>
          )}
          
          {quote.status !== 'non-conforme' && (
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleMarkAs('non-conforme')}>
              Marquer comme non conforme
            </Button>
          )}
          
          {quote.status !== 'presenti' && (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleMarkAs('presenti')}>
              <Flag className="mr-2 h-4 w-4" />
              Définir comme devis de référence
            </Button>
          )}
          
          <Button variant="outline" onClick={handleExportPDF}>
            <FileText className="mr-2 h-4 w-4" />
            Exporter en PDF
          </Button>
          
          <Button variant="outline" onClick={handleExportExcel}>
            <Download className="mr-2 h-4 w-4" />
            Exporter en Excel
          </Button>
          
          <Button onClick={handleSendFeedback}>
            <Send className="mr-2 h-4 w-4" />
            Envoyer un retour
          </Button>
        </div>
      </div>
    </Layout>
  );
}
