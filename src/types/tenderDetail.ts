
export interface TenderQuote {
  id: string;
  lotId: string;
  lotName: string;
  companyId: string;
  companyName: string;
  price: number;
  submissionDate: string;
  isCompliant: boolean;
  comments?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface TenderLot {
  id: string;
  name: string;
  description: string;
  isAssigned: boolean;
  assignedToCompanyId?: string;
  assignedToCompanyName?: string;
  budget: number;
  quotesCount: number;
}

export interface TenderDetailData {
  id: string;
  name: string;
  description: string;
  type: 'design' | 'construction' | 'service';
  deadline: string;
  status: 'open' | 'closed' | 'assigned';
  location: string;
  initialBudget: number;
  currentTotalQuotes: number;
  lots: TenderLot[];
  quotes: TenderQuote[];
  progressPercentage: number;
  documents: {
    id: string;
    name: string;
    type: string;
    size: string;
    url: string;
  }[];
  messages: {
    id: string;
    sender: string;
    senderRole: string;
    message: string;
    timestamp: string;
  }[];
}
