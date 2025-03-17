
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Layers, MessageSquare, FileText } from 'lucide-react';
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
  
  const tender = id ? getTenderDetailById(id) : undefined;
  
  useEffect(() => {
    // If tender not found, redirect to tender management page
    if (!tender && id) {
      navigate('/tender-management');
    }
  }, [tender, id, navigate]);
  
  if (!tender) {
    return <div>Chargement...</div>;
  }
  
  const handleViewLotQuotes = (lotId: string) => {
    setSelectedLotId(lotId);
  };
  
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
          <TenderProgressIndicators tender={tender} />
          
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
              {selectedLotId ? (
                <TenderQuotesComparisonTable 
                  tender={tender} 
                  selectedLotId={selectedLotId} 
                  onClose={() => setSelectedLotId(null)} 
                />
              ) : (
                <TenderLotsTable tender={tender} onViewLotQuotes={handleViewLotQuotes} />
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
