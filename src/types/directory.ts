
export type ViewMode = 'list' | 'map';

// Update category types to match Supabase enum values
export type CompanyCategory = 
  | 'architecte' 
  | 'moe_bet' 
  | 'construction' 
  | 'service' 
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

// Add utility function to map Supabase category to our internal category
export const mapSupabaseCategory = (category: string): CompanyCategory => {
  // Convert from Supabase's "entreprise_categorie" format to our internal format
  switch (category) {
    case 'Architecte':
      return 'architecte';
    case 'MOE_BET':
      return 'moe_bet';
    case 'Construction':
      return 'construction';
    case 'Service':
      return 'service';
    case 'Industriel':
      return 'industriel';
    case 'Fournisseur':
      return 'fournisseur';
    default:
      return 'construction'; // Fallback to construction if unknown
  }
};
