
export interface Service {
  id: string;
  name: string;
  description: string;
  price: {
    type: 'fixed' | 'range' | 'quote'; // fixed price, price range, or quote needed
    value?: string; // e.g. "150€" for fixed, "50€ - 150€" for range
    unit?: string; // e.g. "par jour", "par m²", etc.
  };
  duration: {
    value: string; // e.g. "1-2 jours", "3-5 heures"
  };
  requirements?: string[]; // Certification requirements or other criteria
}

export interface CompanyReview {
  id: string;
  author: string;
  authorCompany?: string;
  rating: number; // 1-5
  comment: string;
  serviceId?: string; // Which service was reviewed
  projectId?: string; // Related project if applicable
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  date: string;
  client: string;
  services: string[]; // IDs of services provided
  images?: string[]; // URLs of project images
  testimonial?: {
    author: string;
    text: string;
    rating: number;
  };
}

export interface ServiceCompany {
  id: string;
  name: string;
  logo?: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    website?: string;
    linkedin?: string;
  };
  services: Service[];
  coverageAreas: {
    regions: string[];
    cities?: string[];
    description?: string;
  };
  reviews: CompanyReview[];
  projects: Project[];
  financials?: {
    solvabilityScore: number;
    administrativeScore: number;
    lastUpdated: string;
  };
}
