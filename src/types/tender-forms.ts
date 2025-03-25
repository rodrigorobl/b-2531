
export interface TenderFormValues {
  type: 'design' | 'construction' | 'service';
  privacy: 'open' | 'restricted' | 'closed';
  projectName: string;
  description: string;
  invitedCompanies: Array<{
    id: string;
    name: string;
    lotId?: string;
    selected: boolean;
  }>;
  adminDocuments?: Array<{
    id: string;
    name: string;
  }>;
}

export interface DesignTenderFormValues extends TenderFormValues {
  type: 'design';
  design: {
    designType: string;
    area: string;
    location?: {
      address?: string;
      lat?: number;
      lng?: number;
    };
    lots?: Array<{
      name: string;
      description?: string;
      selected: boolean;
    }>;
    projectTeam?: Array<{
      name: string;
      role: string;
    }>;
  };
}

export interface ConstructionTenderFormValues extends TenderFormValues {
  type: 'construction';
  construction: {
    constructionType: 'neuf' | 'réhabilitation' | 'extension' | 'renovation' | 'demolition' | 'amenagement';
    area: string;
    location?: {
      address?: string;
      lat?: number;
      lng?: number;
    };
    buildings?: Array<{
      id: string;
      levels: number;
    }>;
    projectTeam?: Array<{
      name: string;
      role: string;
    }>;
    lots?: Array<{
      name: string;
      description?: string;
      selected: boolean;
    }>;
    dpgfMethod?: 'ai' | 'upload';
    keyDates?: Array<{
      id: string;
      name: string;
      date?: Date;
    }>;
    lotClosureDates?: Array<{
      lotName: string;
      closureDate?: Date;
    }>;
    usages?: Array<{
      name: string;
      description?: string;
    }>;
  };
}

export interface ServiceTenderFormValues extends TenderFormValues {
  type: 'service';
  service: {
    serviceType: string;
    frequency: string;
    location?: {
      address?: string;
      lat?: number;
      lng?: number;
    };
    lots?: Array<{
      name: string;
      description?: string;
      selected: boolean;
    }>;
  };
}

export interface BulkInvitationContact {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  selected: boolean;
}
