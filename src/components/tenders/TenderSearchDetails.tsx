
import React from 'react';
import { TenderSearchResult } from '@/types/tenders';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TenderEmptyState from './details/TenderEmptyState';
import TenderDetailsHeader from './details/TenderDetailsHeader';
import TenderDetailsTab from './details/TenderDetailsTab';
import TenderMessagesTab from './details/TenderMessagesTab';
import TenderDocumentsTab from './details/TenderDocumentsTab';

interface TenderSearchDetailsProps {
  tender?: TenderSearchResult;
}

export default function TenderSearchDetails({ tender }: TenderSearchDetailsProps) {
  if (!tender) {
    return <TenderEmptyState />;
  }

  return (
    <div className="w-96 min-w-96 bg-white rounded-lg shadow-sm flex flex-col">
      <TenderDetailsHeader tender={tender} />
      
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
            <TenderDetailsTab tender={tender} />
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
