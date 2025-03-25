
// Common types for all tender forms
export type TenderFormValues = {
  type: 'design' | 'construction' | 'service';
  privacy: 'open' | 'restricted' | 'closed';
  projectName: string;
  description: string;
  invitedCompanies: {
    id: string;
    name: string;
    lotId?: string;
    selected: boolean;
  }[];
  adminDocuments?: {
    id: string;
    name: string;
  }[];
  
  // Design-specific fields
  design?: {
    projectNature: 'logement' | 'tertiaire' | 'industriel' | 'commercial' | 'hospitalier' | 'scolaire' | 'autres';
    area: string;
  };
  
  // Construction-specific fields
  construction?: {
    constructionType: 'neuf' | 'réhabilitation' | 'extension' | 'renovation' | 'demolition' | 'amenagement';
    area: string;
    location?: {
      address?: string;
      lat?: number;
      lng?: number;
    };
    buildings?: {
      id: string;
      levels: number;
    }[];
    projectTeam?: {
      name: string;
      role: string;
    }[];
    lots?: {
      name: string;
      description?: string;
      selected: boolean;
    }[];
    dpgfMethod?: 'ai' | 'upload';
    keyDates?: {
      id: string;
      name: string;
      date?: Date;
    }[];
    lotClosureDates?: {
      lotName: string;
      closureDate?: Date;
    }[];
    usages?: {
      name: string;
      description?: string;
    }[];
  };
  
  // Service-specific fields
  service?: {
    serviceScope: 'local' | 'départemental' | 'régional' | 'national' | 'international';
    serviceDuration: 'ponctuel' | '3mois' | '6mois' | '1an' | '2ans' | '3ans';
  };
};

// Type for design tender
export type DesignTenderFormValues = TenderFormValues & {
  type: 'design';
  design: NonNullable<TenderFormValues['design']>;
};

// Type for construction tender
export type ConstructionTenderFormValues = TenderFormValues & {
  type: 'construction';
  construction: NonNullable<TenderFormValues['construction']>;
};

// Type for service tender
export type ServiceTenderFormValues = TenderFormValues & {
  type: 'service';
  service: NonNullable<TenderFormValues['service']>;
};
