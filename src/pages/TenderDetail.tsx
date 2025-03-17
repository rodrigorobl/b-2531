import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Layers, MessageSquare, FileText, Upload } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { getTenderDetailById } from '@/data/mockTenderDetail';
import TenderDetailHeader from '@/components/tenderDetail/TenderDetailHeader';
import TenderProgressIndicators from '@/components/tenderDetail/TenderProgressIndicators';
import TenderLotsTable from '@/components/tenderDetail/TenderLotsTable';
import TenderQuotesComparisonTable from '@/components/tenderDetail/TenderQuotesComparisonTable';
import TenderMessagesPanel from '@/components/tenderDetail/TenderMessagesPanel';
import TenderDocumentsPanel from '@/components/tenderDetail/TenderDocumentsPanel';

export default function TenderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  
  const tender = id ? getTenderDetailById(id) : undefined;
  
  useEffect(() => {
    if (!tender && id) {
      navigate('/tender-management');
    }
    
    const savedProfile = localStorage.getItem('btp-connect-active-profile');
    if (savedProfile) {
      setActiveProfile(savedProfile);
    }
  }, [tender, id, navigate]);
  
  const handleViewLotQuotes = (lotId: string) => {
    setSelectedLotId(lotId);
  };

  const isPromoter = activeProfile === 'promoteur';
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/tender-management')}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retour
            </Button>
          </div>
          
          <TenderDetailHeader tender={tender} />
          
          {isPromoter && <TenderProgressIndicators tender={tender} />}
          
          <Tabs defaultValue="lots">
            <TabsList className="mb-4">
              <TabsTrigger value="lots" className="flex items-center">
                <Layers className="w-4 h-4 mr-1" />
                Lots et Devis
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                Documents
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="lots" className="mt-0">
              {isPromoter ? (
                selectedLotId ? (
                  <TenderQuotesComparisonTable 
                    tender={tender} 
                    selectedLotId={selectedLotId} 
                    onClose={() => setSelectedLotId(null)} 
                  />
                ) : (
                  <TenderLotsTable tender={tender} onViewLotQuotes={handleViewLotQuotes} />
                )
              ) : (
                <TenderLotsForContractor tender={tender} />
              )}
            </TabsContent>
            
            <TabsContent value="messages" className="mt-0">
              <TenderMessagesPanel tender={tender} />
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0">
              <TenderDocumentsPanel tender={tender} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function TenderLotsForContractor({ tender }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Lots disponibles pour candidature</h2>
      
      <div className="divide-y">
        {tender.lots.map((lot) => (
          <div key={lot.id} className="py-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{lot.name}</h3>
                <p className="text-sm text-muted-foreground">{lot.description}</p>
              </div>
              <Badge variant="outline" className="ml-2">
                Budget estimé: {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  maximumFractionDigits: 0,
                }).format(lot.budget)}
              </Badge>
            </div>
            
            <Button className="mt-2">
              <Upload className="w-4 h-4 mr-1" />
              Soumettre un devis
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
