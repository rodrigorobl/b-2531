
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, Download, Send, Reply, MessageSquare } from 'lucide-react';
import QuoteGeneralInfo from '@/components/quotes/QuoteGeneralInfo';
import QuoteLineItems from '@/components/quotes/QuoteLineItems';
import QuoteAnnotations from '@/components/quotes/QuoteAnnotations';
import { Badge } from '@/components/ui/badge';

// Types pour les postes du devis (même structure que dans QuoteAnalysis)
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
}

// Données de test pour le devis (même structure que dans QuoteAnalysis)
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
          isInternal: false,
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
      annotations: [
        {
          id: 'ann-002',
          text: 'La remise de 5% est appréciée, merci.',
          author: 'Sophie Durand',
          timestamp: '2024-05-04 10:15',
          isInternal: false,
        },
      ],
    },
  ],
};

export default function CompanyDetailsTender() {
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

  const handleDownloadPDF = () => {
    // Logique de téléchargement PDF
    console.log('Téléchargement PDF');
  };

  const handleDownloadExcel = () => {
    // Logique de téléchargement Excel
    console.log('Téléchargement Excel');
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
              <h1 className="text-2xl font-bold">Détail de votre devis</h1>
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
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-2">
            <TabsTrigger value="details">Détail du devis</TabsTrigger>
            <TabsTrigger value="annotations">Remarques et commentaires</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-4">
            <QuoteLineItems lineItems={quote.lineItems} />
          </TabsContent>
          
          <TabsContent value="annotations" className="mt-4">
            <QuoteAnnotations quoteId={quote.id} lineItems={quote.lineItems} />
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleDownloadPDF}>
            <FileText className="mr-2 h-4 w-4" />
            Télécharger en PDF
          </Button>
          
          <Button variant="outline" onClick={handleDownloadExcel}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger en Excel
          </Button>
          
          <Button className="ml-auto">
            <Send className="mr-2 h-4 w-4" />
            Soumettre une nouvelle version
          </Button>
        </div>
      </div>
    </Layout>
  );
}
