
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
      return <StatusBadge status="closed" />;
    case 'assigned':
      return <StatusBadge status="assigned" />;
    default:
      return <Badge>Inconnu</Badge>;
  }
};
