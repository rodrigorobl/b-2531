
import React, { useEffect, useState } from 'react';
import { TenderSearchResult } from '@/types/tenders';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import TenderEmptyState from './details/TenderEmptyState';
import TenderDetailsHeader from './details/TenderDetailsHeader';
import TenderDetailsTab from './details/TenderDetailsTab';
import TenderMessagesTab from './details/TenderMessagesTab';
import TenderDocumentsTab from './details/TenderDocumentsTab';
import { ProfileType } from '@/components/sidebar/ProfileSelector';

interface TenderSearchDetailsProps {
  tender?: TenderSearchResult;
  onViewDetail?: (tenderId: string) => void;
}

export default function TenderSearchDetails({ tender, onViewDetail }: TenderSearchDetailsProps) {
  const [activeProfile, setActiveProfile] = useState<ProfileType>('entreprise-construction');

  useEffect(() => {
    // Récupérer le profil utilisateur actif depuis localStorage
    const savedProfile = localStorage.getItem('btp-connect-active-profile') as ProfileType | null;
    if (savedProfile) {
      setActiveProfile(savedProfile);
    }
  }, []);

  if (!tender) {
    return <TenderEmptyState />;
  }

  return (
    <div className="w-96 min-w-96 bg-white rounded-lg shadow-sm flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium truncate">{tender.projectName}</h3>
          {onViewDetail && (
            <Button size="sm" variant="outline" onClick={() => onViewDetail(tender.id)}>
              <ExternalLink size={14} className="mr-1" />
              Détails
            </Button>
          )}
        </div>
        <TenderDetailsHeader tender={tender} />
      </div>
      
      <Tabs defaultValue="details" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-4 pt-2 bg-transparent">
          <TabsTrigger value="details" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
            Détails
          </TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
            Messages
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
            Documents
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="details" className="h-full m-0 p-4">
            <TenderDetailsTab tender={tender} activeProfile={activeProfile} />
          </TabsContent>
          
          <TabsContent value="messages" className="h-full m-0">
            <TenderMessagesTab />
          </TabsContent>
          
          <TabsContent value="documents" className="h-full m-0 p-4">
            <TenderDocumentsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
