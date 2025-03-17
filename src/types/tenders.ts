
export type TenderStatus = 'open' | 'closed' | 'assigned';

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
}
