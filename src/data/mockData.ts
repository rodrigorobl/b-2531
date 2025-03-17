
import { mockTenders } from './mockTenders';
import { TenderSearchResult } from '@/types/tenders';
import { ProjectSummary, ProjectDetail, TenderStatus } from '@/types/projects';
import { ProjectData, TenderData, QuoteData } from '@/types/projectDetail';
import { MyTenderProject } from '@/hooks/useMyTenders';

// Mock projects data
const mockProjects: ProjectSummary[] = [
  {
    id: "proj-001",
    projectName: "Résidence Les Ormes",
    projectType: "Logement",
    description: "Ensemble résidentiel de 45 logements avec jardin partagé et local à vélos.",
    location: "Lyon",
    budget: 1200000,
    status: "En cours",
    startDate: "2023-01-15",
    endDate: "2024-06-30",
    tendersCount: 4,
    tendersAssigned: 2,
    progressPercentage: 35,
    clientName: "Nexity"
  },
  {
    id: "proj-002",
    projectName: "Centre Commercial Riviera",
    projectType: "Commercial",
    description: "Construction d'un nouveau centre commercial sur 3 niveaux avec parking souterrain.",
    location: "Paris",
    budget: 2500000,
    status: "En cours",
    startDate: "2023-02-10",
    endDate: "2024-09-15",
    tendersCount: 6,
    tendersAssigned: 3,
    progressPercentage: 25,
    clientName: "Unibail-Rodamco"
  },
  {
    id: "proj-003",
    projectName: "École Jean Jaurès",
    projectType: "Public",
    description: "Rénovation énergétique d'un groupe scolaire avec mise aux normes d'accessibilité.",
    location: "Marseille",
    budget: 950000,
    status: "En cours",
    startDate: "2023-03-05",
    endDate: "2024-08-01",
    tendersCount: 3,
    tendersAssigned: 3,
    progressPercentage: 50,
    clientName: "Ville de Marseille"
  }
];

// Mock project detail
const mockProjectsDetail: Record<string, ProjectDetail> = {
  "proj-001": {
    id: "proj-001",
    projectName: "Résidence Les Ormes",
    projectType: "Logement",
    description: "Ensemble résidentiel de 45 logements avec jardin partagé et local à vélos.",
    location: "Lyon",
    budget: 1200000,
    status: "En cours",
    startDate: "2023-01-15",
    endDate: "2024-06-30",
    tendersCount: 4,
    tendersAssigned: 2,
    progressPercentage: 35,
    clientName: "Nexity",
    tenders: [
      {
        id: "tender-001-1",
        name: "Gros œuvre",
        description: "Structure et fondations",
        type: "construction",
        status: "open",
        quotesReceived: 2,
        deadline: "2023-09-15",
        lotsTotal: 1,
        lotsAssigned: 0,
        progress: 30
      },
      {
        id: "tender-001-2",
        name: "Plomberie",
        description: "Installation sanitaire",
        type: "construction",
        status: "assigned",
        quotesReceived: 4,
        deadline: "2023-07-20",
        lotsTotal: 1,
        lotsAssigned: 1,
        progress: 60
      }
    ]
  },
  "proj-002": {
    id: "proj-002",
    projectName: "Centre Commercial Riviera",
    projectType: "Commercial",
    description: "Construction d'un nouveau centre commercial sur 3 niveaux avec parking souterrain.",
    location: "Paris",
    budget: 2500000,
    status: "En cours",
    startDate: "2023-02-10",
    endDate: "2024-09-15",
    tendersCount: 6,
    tendersAssigned: 3,
    progressPercentage: 25,
    clientName: "Unibail-Rodamco",
    tenders: [
      {
        id: "tender-002-1",
        name: "Façades",
        description: "Façades vitrées et ornementales",
        type: "construction",
        status: "open",
        quotesReceived: 3,
        deadline: "2023-08-10",
        lotsTotal: 2,
        lotsAssigned: 0,
        progress: 0
      },
      {
        id: "tender-002-2",
        name: "Électricité",
        description: "Installation électrique",
        type: "construction",
        status: "assigned",
        quotesReceived: 5,
        deadline: "2023-06-15",
        lotsTotal: 1,
        lotsAssigned: 1,
        progress: 40
      }
    ]
  }
};

// Mock my tenders (for contractor view)
const mockMyTenders: MyTenderProject[] = [
  {
    id: "quote-001",
    projectId: "proj-001",
    projectName: "Résidence Les Ormes",
    projectType: "Logement",
    location: "Lyon",
    projectStatus: "En cours",
    tenderDeadline: "2023-09-15",
    quoteStatus: "Soumis",
    quoteAmount: 450000,
    submissionDate: "2023-07-01",
    appel_offre_id: "tender-001-1"
  },
  {
    id: "quote-002",
    projectId: "proj-002",
    projectName: "Centre Commercial Riviera",
    projectType: "Commercial",
    location: "Paris",
    projectStatus: "En cours",
    tenderDeadline: "2023-08-10",
    quoteStatus: "Accepté",
    quoteAmount: 320000,
    submissionDate: "2023-06-20",
    appel_offre_id: "tender-002-1"
  },
  {
    id: "quote-003",
    projectId: "proj-003",
    projectName: "École Jean Jaurès",
    projectType: "Public",
    location: "Marseille",
    projectStatus: "En cours",
    tenderDeadline: "2023-07-25",
    quoteStatus: "Refusé",
    quoteAmount: 180000,
    submissionDate: "2023-06-15",
    appel_offre_id: "tender-003-1"
  }
];

// Mock data services to replace Supabase API calls
export const mockDataService = {
  // Fetch tenders (replacement for useFetchTenders)
  fetchTenders: async (): Promise<TenderSearchResult[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTenders);
      }, 500);
    });
  },
  
  // Fetch projects (replacement for useProjectList)
  fetchProjects: async (): Promise<ProjectSummary[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProjects);
      }, 500);
    });
  },
  
  // Fetch project details (replacement for useProjectDetail)
  fetchProjectDetails: async (projectId: string): Promise<ProjectDetail | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProjectsDetail[projectId] || null);
      }, 500);
    });
  },
  
  // Fetch my tenders (replacement for useMyTenders)
  fetchMyTenders: async (): Promise<MyTenderProject[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMyTenders);
      }, 500);
    });
  }
};
