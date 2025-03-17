
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
}
