
export type ProjectStatus = 'En cours' | 'Clôturé' | 'Attribué';
export type TenderStatus = 'open' | 'closed' | 'assigned';

export interface ProjectSummary {
  id: string;
  projectName: string;
  projectType: string;
  description: string;
  location: string;
  budget: number;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  tendersCount: number;
  tendersAssigned: number;
  progressPercentage: number;
  clientName: string;
}

export interface ProjectTender {
  id: string;
  name: string;
  description?: string; // Adding the missing description property
  type: string;
  status: TenderStatus;
  quotesReceived: number;
  deadline: string;
  lotsTotal: number;
  lotsAssigned: number;
  progress: number;
}

export interface ProjectDetail extends ProjectSummary {
  tenders: ProjectTender[];
}
