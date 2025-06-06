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
  design?: {
    designType?: string;
    projectNature?: string;
    area?: string;
    location?: {
      address?: string;
      lat?: number;
      lng?: number;
    };
    lots?: Array<{
      name: string;
      description?: string;
      selected: boolean;
      budget?: number;
    }>;
    projectTeam?: Array<{
      name: string;
      role: string;
    }>;
  };
  construction?: {
    constructionType?: 'neuf' | 'réhabilitation' | 'extension' | 'renovation' | 'demolition' | 'amenagement';
    area?: string;
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
      budget?: number;
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
  service?: {
    serviceType?: string;
    serviceScope?: string;
    serviceDuration?: string;
    frequency?: string;
    location?: {
      address?: string;
      lat?: number;
      lng?: number;
    };
    lots?: Array<{
      name: string;
      description?: string;
      selected: boolean;
      budget?: number;
    }>;
  };
}

export interface DesignTenderFormValues extends TenderFormValues {
  type: 'design';
  design: {
    designType?: string;
    projectNature?: string;
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
      budget?: number;
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
      budget?: number;
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
    serviceType?: string;
    serviceScope?: string;
    serviceDuration?: string;
    frequency?: string;
    location?: {
      address?: string;
      lat?: number;
      lng?: number;
    };
    lots?: Array<{
      name: string;
      description?: string;
      selected: boolean;
      budget?: number;
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
