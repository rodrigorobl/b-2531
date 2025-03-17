
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TenderStatus } from '@/types/tenders';

// Helper function to get status color based on tender status
export const getStatusBadge = (status: TenderStatus | string) => {
  switch (status) {
    case 'open':
      return <Badge className="bg-status-pending">En cours</Badge>;
    case 'closed':
      return <Badge className="bg-status-closed">Clôturé</Badge>;
    case 'assigned':
      return <Badge className="bg-status-assigned">Attribué</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};

// Helper function to get lot status badge
export const getLotStatusBadge = (status: 'open' | 'assigned') => {
  switch (status) {
    case 'assigned':
      return <Badge className="bg-status-assigned">Attribué</Badge>;
    case 'open':
      return <Badge className="bg-status-pending">En cours</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};

// Helper function to get quote quality indicator
export const getQuoteQualityIndicator = (quality: string) => {
  switch (quality) {
    case 'poor':
      return <Badge variant="outline" className="text-red-500 border-red-500">Faible</Badge>;
    case 'medium':
      return <Badge variant="outline" className="text-amber-500 border-amber-500">Moyen</Badge>;
    case 'good':
      return <Badge variant="outline" className="text-green-500 border-green-500">Bon</Badge>;
    default:
      return null;
  }
};

// Helper function to get budget respect indicator
export const getBudgetRespectIndicator = (budgetRespect: string) => {
  switch (budgetRespect) {
    case 'under':
      return <Badge variant="outline" className="text-green-500 border-green-500">Sous budget</Badge>;
    case 'on-target':
      return <Badge variant="outline" className="text-blue-500 border-blue-500">Dans le budget</Badge>;
    case 'over':
      return <Badge variant="outline" className="text-red-500 border-red-500">Dépassement</Badge>;
    default:
      return null;
  }
};
