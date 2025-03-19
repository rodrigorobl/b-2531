
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ServiceTenderStatus } from '@/pages/ServicesTenderSearch';

export function getServicesTenderStatusBadge(status: ServiceTenderStatus) {
  switch (status) {
    case 'open':
      return <Badge variant="default">En cours</Badge>;
    case 'upcoming':
      return <Badge variant="secondary">À venir</Badge>;
    case 'closed':
      return <Badge variant="outline">Clôturé</Badge>;
    default:
      return null;
  }
}

export function getServicesTenderStatusText(status: ServiceTenderStatus) {
  switch (status) {
    case 'open':
      return 'En cours';
    case 'upcoming':
      return 'À venir';
    case 'closed':
      return 'Clôturé';
    default:
      return '';
  }
}
