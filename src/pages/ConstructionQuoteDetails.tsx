import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Building, Calendar, FileText } from 'lucide-react';
import QuoteGeneralInfo from '@/components/quotes/QuoteGeneralInfo';
import QuoteLineItems from '@/components/quotes/QuoteLineItems';
import QuoteAnnotations from '@/components/quotes/QuoteAnnotations';

// This component can be accessed via the /company-details-tender/quote-XXXX route
// which is already part of the app's routing
export default function ConstructionQuoteDetails() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('details');
  
  useEffect(() => {
    console.log('ConstructionQuoteDetails - Rendered with quoteId:', quoteId);
    console.log('ConstructionQuoteDetails - Current location:', location.pathname);
  }, [quoteId, location]);
  
  // Extract quote ID from the URL path if it's in the format /company-details-tender/quote-XXXX
  const extractedQuoteId = location.pathname.split('quote-')[1] || quoteId || 'unknown';
  
  // Mock data for the quote - in a real application this would be fetched from an API
  const quote = {
    id: extractedQuoteId,
    projectId: 'p123',
    projectName: 'Centre Commercial Riviera',
    lotId: 'l1',
    lotName: 'Gros œuvre',
    companyId: 'c1',
    companyName: 'Entreprise Durand Construction',
    submissionDate: '2023-07-15',
    totalAmountHT: 850000,
    totalAmountTTC: 1020000,
    status: 'conforme' as const,
    currentVersion: 1,
    versions: []
  };
  
  // Mock data for quote line items
  const lineItems = [
    {
      id: 'item-1',
      designation: 'Fondations spéciales',
      quantity: 120,
      unit: 'm³',
      unitPrice: 1200,
      totalPrice: 144000,
      observations: 'Incluant excavation et évacuation des terres',
      annotations: [
        {
          id: 'ann-1',
          text: 'Vérifier la profondeur des fondations selon l\'étude géotechnique',
          author: 'Marc Dupont (BET)',
          timestamp: '2023-07-16 14:30',
          isInternal: false
        }
      ]
    },
    {
      id: 'item-2',
      designation: 'Dalle béton RdC',
      quantity: 450,
      unit: 'm²',
      unitPrice: 85,
      totalPrice: 38250,
      annotations: []
    },
    {
      id: 'item-3',
      designation: 'Structure béton armé',
      quantity: 280,
      unit: 'm³',
      unitPrice: 1450,
      totalPrice: 406000,
      observations: 'Béton C30/37, armatures incluses',
      annotations: [
        {
          id: 'ann-2',
          text: 'Prévoir une réunion technique pour discuter du ferraillage',
          author: 'Sophie Martin (Client)',
          timestamp: '2023-07-17 10:15',
          isInternal: false
        }
      ]
    },
    {
      id: 'item-4',
      designation: 'Coffrage',
      quantity: 950,
      unit: 'm²',
      unitPrice: 45,
      totalPrice: 42750,
      discount: 5,
      annotations: []
    },
    {
      id: 'item-5',
      designation: 'Étanchéité toiture',
      quantity: 650,
      unit: 'm²',
      unitPrice: 75,
      totalPrice: 48750,
      observations: 'Membrane bitumineuse avec isolation thermique',
      annotations: [
        {
          id: 'ann-3',
          text: 'Note interne: négocier le prix à la baisse',
          author: 'Jean Leblanc (Commercial)',
          timestamp: '2023-07-18 16:45',
          isInternal: true
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Détails du devis</h1>
            <p className="text-muted-foreground">
              {quote.projectName} - {quote.lotName}
            </p>
          </div>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exporter le devis
          </Button>
        </div>

        <div className="space-y-6">
          <QuoteGeneralInfo quote={quote} />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="details">Détail des postes</TabsTrigger>
              <TabsTrigger value="comments">Commentaires</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6">
              <QuoteLineItems lineItems={lineItems} />
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-6">
              <QuoteAnnotations quoteId={quote.id} lineItems={lineItems} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
