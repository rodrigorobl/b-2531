
import { useState } from 'react';
import { ProjectData, TenderData, QuoteData } from '@/types/projectDetail';

export function useProjectDataState() {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [tenders, setTenders] = useState<TenderData[]>([]);
  const [quotes, setQuotes] = useState<Record<string, QuoteData[]>>({});
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  return {
    project,
    setProject,
    tenders,
    setTenders,
    quotes,
    setQuotes,
    selectedTenderId,
    setSelectedTenderId,
    activeTab,
    setActiveTab
  };
}
