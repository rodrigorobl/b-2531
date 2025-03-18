
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Check, X } from 'lucide-react';

export type QuoteStatus = 'to-analyze' | 'in-progress' | 'compliant' | 'non-compliant';
export type UrgencyLevel = 'low' | 'medium' | 'high';

interface QuoteStatusBadgeProps {
  status: QuoteStatus;
}

interface QuoteUrgencyBadgeProps {
  urgency: UrgencyLevel;
}

export const QuoteStatusBadge = ({ status }: QuoteStatusBadgeProps) => {
  switch (status) {
    case 'to-analyze':
      return (
        <Badge className="bg-amber-500 flex items-center gap-1">
          <Clock size={12} /> À analyser
        </Badge>
      );
    case 'in-progress':
      return (
        <Badge className="bg-blue-500 flex items-center gap-1">
          <User size={12} /> Analyse en cours
        </Badge>
      );
    case 'compliant':
      return (
        <Badge className="bg-green-500 flex items-center gap-1">
          <Check size={12} /> Conforme
        </Badge>
      );
    case 'non-compliant':
      return (
        <Badge className="bg-red-500 flex items-center gap-1">
          <X size={12} /> Non conforme
        </Badge>
      );
    default:
      return <Badge>Inconnu</Badge>;
  }
};

export const QuoteUrgencyBadge = ({ urgency }: QuoteUrgencyBadgeProps) => {
  switch (urgency) {
    case 'high':
      return <Badge className="bg-red-500">Urgente</Badge>;
    case 'medium':
      return <Badge className="bg-amber-500">Moyenne</Badge>;
    case 'low':
      return <Badge className="bg-green-500">Basse</Badge>;
    default:
      return null;
  }
};
