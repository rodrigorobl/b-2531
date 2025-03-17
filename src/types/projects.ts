
export type ProjectStatus = 'En cours' | 'Clôturé' | 'Attribué';

export interface ProjectSummary {
  id: string;
  projectName: string;
  projectType: string;
  description: string;
  location: string;
  budget: number | null;
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
  tendersCount: number;
  tendersAssigned: number;
  progressPercentage: number;
  clientName: string;
}

export interface ProjectDetail extends ProjectSummary {
  tenders: {
    id: string;
    name: string;
    type: string;
    status: TenderStatus;
    quotesReceived: number;
    deadline: string;
    lotsTotal: number;
    lotsAssigned: number;
    progress: number;
  }[];
}
