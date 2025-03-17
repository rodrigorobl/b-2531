
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TenderStatus } from './TenderManagementTable';

// Helper function to render the status badge
export const renderStatusBadge = (status: TenderStatus) => {
  switch (status) {
    case 'open':
      return <Badge className="bg-amber-500">En cours</Badge>;
    case 'closed':
      return <Badge className="bg-gray-500">Clôturé</Badge>;
    case 'assigned':
      return <Badge className="bg-green-600">Attribué</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};
