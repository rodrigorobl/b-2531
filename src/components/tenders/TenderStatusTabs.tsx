
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TenderStatusTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export default function TenderStatusTabs({ selectedTab, setSelectedTab }: TenderStatusTabsProps) {
  return (
    <Tabs defaultValue="all" value={selectedTab} className="w-full" onValueChange={setSelectedTab}>
      <TabsList className="mb-6 w-full grid grid-cols-4">
        <TabsTrigger value="all">Tous les appels d'offres</TabsTrigger>
        <TabsTrigger value="open">En cours</TabsTrigger>
        <TabsTrigger value="closed">Clôturés</TabsTrigger>
        <TabsTrigger value="assigned">Attribués</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
