
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'in-progress' | 'completed' | 'assigned' | 'pending' | 'closed' | 'draft';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  'in-progress': {
    label: 'En cours',
    color: 'bg-blue-500 text-white',
  },
  'completed': {
    label: 'Terminé',
    color: 'bg-status-completed text-white',
  },
  'assigned': {
    label: 'Attribué',
    color: 'bg-status-assigned text-white',
  },
  'pending': {
    label: 'En attente',
    color: 'bg-status-pending text-white',
  },
  'closed': {
    label: 'Clôturé',
    color: 'bg-green-500 text-white',
  },
  'draft': {
    label: 'Brouillon',
    color: 'bg-gray-500 text-white',
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span 
      className={cn(
        'status-badge', 
        config.color,
        className
      )}
    >
      {config.label}
    </span>
  );
}
