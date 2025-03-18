
export type QuoteRequestStatus = 'pending' | 'sent' | 'accepted' | 'rejected';
export type RequesterType = 'constructor' | 'project-manager' | 'developer' | 'industrial' | 'service-company';

export interface QuoteRequest {
  id: string;
  projectId: string;
  projectName: string;
  requesterType: RequesterType;
  requesterName: string;
  requesterId: string;
  serviceId: string;
  serviceName: string;
  requestDate: string;
  desiredCompletionDate: string;
  description: string;
  status: QuoteRequestStatus;
}

export interface QuoteVersion {
  id: string;
  quoteId: string;
  version: number;
  amount: number;
  createdAt: string;
  notes?: string;
}

export interface Quote {
  id: string;
  requestId?: string; // Optional, as some quotes may be sent without a request
  projectId: string;
  projectName: string;
  recipientType: RequesterType;
  recipientName: string;
  recipientId: string;
  serviceId: string;
  serviceName: string;
  createdAt: string;
  updatedAt: string;
  status: QuoteRequestStatus;
  currentAmount: number;
  versions: QuoteVersion[];
  isVoluntary: boolean; // Whether the quote was sent without a prior request
}

export interface QuoteMessage {
  id: string;
  quoteId: string;
  senderId: string;
  senderName: string;
  message: string;
  createdAt: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
  }[];
}
