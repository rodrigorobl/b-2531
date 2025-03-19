
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Download, Send, MapPin, Building } from 'lucide-react';
import QuoteGeneralInfo from '@/components/quotes/QuoteGeneralInfo';
import QuoteLineItems from '@/components/quotes/QuoteLineItems';
import QuoteAnnotations from '@/components/quotes/QuoteAnnotations';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
  location: string;  // Added location field
  submissionDate: string;
  totalAmountHT: number;
  totalAmountTTC: number;
  status: 'conforme' | 'non-conforme' | 'presenti';
  statusReason?: string;
  currentVersion: number;
  versions: QuoteVersion[];
  lineItems: QuoteLineItem[];
  budgetImpact?: {
    lotBudget: number;
    deviation: number;
    deviationPercentage: number;
  };
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
  location: 'Lyon 3ème arrondissement',  // Added location
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

  const handleSubmitQuote = () => {
    navigate(`/submit-services-quote/${quoteId}`);
  };

  const handleViewDetails = (quoteId: string) => {
    navigate(`/services-quote-tracking/${quoteId}`);
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
              <h1 className="text-2xl font-bold">Détail de l'appel d'offres</h1>
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <Building size={14} /> 
                {quote.projectName}
              </p>
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin size={14} /> 
                {quote.location}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informations sur le projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nom du projet</p>
                  <p className="font-medium">{quote.projectName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-medium">{quote.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Localisation</p>
                  <p className="font-medium">{quote.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date de publication</p>
                  <p className="font-medium">{quote.submissionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget estimé</p>
                  <p className="font-medium">{quote.totalAmountHT.toLocaleString()} € HT</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Statut</p>
                  <Badge className={
                    quote.status === 'conforme' ? 'bg-green-500' : 
                    quote.status === 'non-conforme' ? 'bg-red-500' : 
                    'bg-blue-500'
                  }>
                    {quote.status === 'conforme' ? 'Conforme' : 
                     quote.status === 'non-conforme' ? 'Non conforme' : 
                     'Présenti'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={handleSubmitQuote}>
                <Send className="mr-2 h-4 w-4" />
                Déposer une offre
              </Button>
              <Button variant="outline" className="w-full" onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Télécharger le dossier d'appel d'offres
              </Button>
              <Button variant="outline" className="w-full" onClick={handleDownloadExcel}>
                <FileText className="mr-2 h-4 w-4" />
                Consulter le cahier des charges
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Description du projet</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{quote.lotName} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mes offres</CardTitle>
          </CardHeader>
          <CardContent>
            {quote.versions.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Version</th>
                    <th className="text-left py-2">Date de soumission</th>
                    <th className="text-left py-2">Montant</th>
                    <th className="text-left py-2">Statut</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.versions.map((version) => (
                    <tr key={version.id} className="border-b">
                      <td className="py-3">Version {version.versionNumber}</td>
                      <td className="py-3">{version.submissionDate}</td>
                      <td className="py-3">{version.totalAmount.toLocaleString()} €</td>
                      <td className="py-3">
                        <Badge className={
                          version.status === 'conforme' ? 'bg-green-500' : 
                          version.status === 'non-conforme' ? 'bg-red-500' : 
                          'bg-blue-500'
                        }>
                          {version.status === 'conforme' ? 'Conforme' : 
                           version.status === 'non-conforme' ? 'Non conforme' : 
                           'Présenti'}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(version.id)}>
                          Détails
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Vous n'avez pas encore soumis d'offre pour cet appel d'offres
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
