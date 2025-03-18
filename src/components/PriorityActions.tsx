import React from 'react';
import { Calendar, MessageSquare, Upload, FileText, ShoppingCart, CalendarCheck, Package, Wrench, Building, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PriorityAction {
  id: string;
  title: string;
  project: string;
  deadline: string;
  type: 'quote' | 'document' | 'message' | 'tender' | 'meeting' | 'purchase' | 'planning' | 'delivery' | 'service';
}

interface PriorityActionsProps {
  actions: PriorityAction[];
}

export default function PriorityActions({ actions }: PriorityActionsProps) {
  const getActionIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return <Upload size={16} className="text-status-pending" />;
      case 'document':
        return <FileText size={16} className="text-status-in-progress" />;
      case 'message':
        return <MessageSquare size={16} className="text-status-assigned" />;
      case 'tender':
        return <FileText size={16} className="text-status-pending" />;
      case 'meeting':
        return <CalendarCheck size={16} className="text-status-assigned" />;
      case 'purchase':
        return <ShoppingCart size={16} className="text-status-pending" />;
      case 'planning':
        return <Calendar size={16} className="text-status-in-progress" />;
      case 'delivery':
        return <Package size={16} className="text-status-completed" />;
      case 'service':
        return <Wrench size={16} className="text-status-assigned" />;
      default:
        return <Building size={16} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-3">
      {actions.map((action) => (
        <div key={action.id} className="flex items-start p-3 border rounded-lg hover:bg-accent/50 transition-colors">
          <div className="mr-3 mt-0.5">
            {getActionIcon(action.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-1">{action.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{action.project}</p>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Calendar size={12} className="mr-1" />
              <span>Échéance: {action.deadline}</span>
            </div>
          </div>
          <div className="ml-3">
            <Button variant="outline" size="sm">
              <Eye size={16} className="mr-1" />
              Voir
            </Button>
          </div>
        </div>
      ))}
      
      {actions.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          Aucune action prioritaire pour le moment.
        </div>
      )}
    </div>
  );
}
