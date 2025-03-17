
import React from 'react';
import { Calendar, MessageSquare, Upload, FileText, ShoppingCart, CalendarCheck, Package, Wrench, Building } from 'lucide-react';
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

  const getActionButton = (type: string, id: string) => {
    switch (type) {
      case 'quote':
        return (
          <Button variant="outline" size="sm">
            Déposer
          </Button>
        );
      case 'document':
        return (
          <Button variant="outline" size="sm">
            Télécharger
          </Button>
        );
      case 'message':
        return (
          <Button variant="outline" size="sm">
            Répondre
          </Button>
        );
      case 'tender':
        return (
          <Button variant="outline" size="sm">
            Participer
          </Button>
        );
      case 'meeting':
        return (
          <Button variant="outline" size="sm">
            Planifier
          </Button>
        );
      case 'purchase':
        return (
          <Button variant="outline" size="sm">
            Commander
          </Button>
        );
      case 'planning':
        return (
          <Button variant="outline" size="sm">
            Organiser
          </Button>
        );
      case 'delivery':
        return (
          <Button variant="outline" size="sm">
            Expédier
          </Button>
        );
      case 'service':
        return (
          <Button variant="outline" size="sm">
            Intervenir
          </Button>
        );
      default:
        return (
          <Button variant="outline" size="sm">
            Voir
          </Button>
        );
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
            {getActionButton(action.type, action.id)}
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
