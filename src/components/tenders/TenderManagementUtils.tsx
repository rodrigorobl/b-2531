
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TenderStatus } from './TenderManagementTable';
import StatusBadge from '@/components/StatusBadge';

// Helper function to render the status badge
export const renderStatusBadge = (status: TenderStatus) => {
  switch (status) {
    case 'open':
      return <StatusBadge status="in-progress" />;
    case 'closed':
      return <Badge className="bg-orange-500 text-white">Clôturé</Badge>;
    case 'assigned':
      return <Badge className="bg-green-600 text-white">Attribué</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};
