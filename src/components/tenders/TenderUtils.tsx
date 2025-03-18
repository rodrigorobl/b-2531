
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TenderStatus } from '@/pages/TenderSearch';
import StatusBadge from '@/components/StatusBadge';

export const getStatusBadge = (status: TenderStatus) => {
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
