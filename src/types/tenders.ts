
export type TenderStatus = 'open' | 'closed' | 'assigned';

export interface LotDetails {
  id: string;
  name: string;
  status: 'open' | 'assigned';
  quotesReceived: number;
  quotesRequired: number;
  assignedTo?: string;
}

export interface TenderSearchResult {
  id: string;
  projectName: string;
  projectType: string;
  location: string;
  budget: string;
  surface: string;
  deadline: string;
  status: TenderStatus;
  client: {
    name: string;
    logo?: string;
  };
  lots: string[];
  isFavorite: boolean;
  createdAt: string;
  description: string;
  progress?: number;
  lotsTotal?: number;
  lotsAssigned?: number;
  quotesReceived?: number;
  actualQuotesReceived?: number;
  quoteQuality?: 'poor' | 'medium' | 'good';
  budgetRespect?: 'under' | 'on-target' | 'over';
  lotDetails?: LotDetails[];
}
