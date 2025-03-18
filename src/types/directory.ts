
export type ViewMode = 'list' | 'map';

export type CompanyCategory = 
  | 'architecte' 
  | 'bureau-etudes' 
  | 'construction' 
  | 'services' 
  | 'industriel' 
  | 'fournisseur';

export type CompanySpecialty = {
  [key in CompanyCategory]: string[];
};

export interface Company {
  id: string;
  name: string;
  logo: string;
  category: CompanyCategory;
  specialty: string;
  location: string;
  address: string;
  rating: number;
  reviewCount: number;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  certifications: string[];
  presentation?: string;
  financials?: {
    solvabilityScore: number;
    administrativeScore: number;
    lastUpdated: string;
  };
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  avatar: string;
}

export interface Rating {
  id: string;
  overall: number;
  commercial: number;
  projectManagement: number;
  customerService: number;
  comment: string;
  author: string;
  authorRole: string;
  date: string;
  isPositive: boolean;
}
