import React from 'react';
import { Tender } from '@/pages/TenderOffers';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, MessageSquare, Calendar, Upload, Map, Building, FileDown, Clock, Users } from 'lucide-react';
interface TenderDetailsProps {
  tender?: Tender;
}
export default function TenderDetails({
  tender
}: TenderDetailsProps) {
  if (!tender) {
    return <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm flex items-center justify-center">
        <div className="text-center p-6 text-muted-foreground">
          <FileText className="mx-auto mb-2 opacity-20" size={40} />
          <p>Sélectionnez un appel d'offres pour voir les détails</p>
        </div>
      </div>;
  }
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'En cours';
      case 'closed':
        return 'Clôturé';
      case 'assigned':
        return 'Attribué';
      default:
        return 'Inconnu';
    }
  };
  const getParticipationStatusLabel = (status: string) => {
    switch (status) {
      case 'to-submit':
        return 'À soumettre';
      case 'pending':
        return 'En attente';
      case 'approved':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      default:
        return 'Inconnu';
    }
  };
  return <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm flex flex-col">
      
      
      <Tabs defaultValue="details" className="flex-1 flex flex-col">
        
        
        
      </Tabs>
    </div>;
}