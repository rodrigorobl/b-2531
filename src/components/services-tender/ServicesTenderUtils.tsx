
import { ServiceTenderStatus } from '@/pages/ServicesTenderSearch';
import { Badge } from '@/components/ui/badge';
import React from 'react';

export function getServicesTenderStatusText(status: ServiceTenderStatus): string {
  switch (status) {
    case 'open':
      return 'En cours';
    case 'closed':
      return 'Clôturé';
    default:
      return 'Inconnu';
  }
}

export function getServicesTenderStatusBadge(status: ServiceTenderStatus) {
  switch (status) {
    case 'open':
      return <Badge className="bg-blue-500">En cours</Badge>;
    case 'closed':
      return <Badge variant="outline">Clôturé</Badge>;
    default:
      return <Badge variant="outline">Inconnu</Badge>;
  }
}
