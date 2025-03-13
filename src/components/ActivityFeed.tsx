
import React from 'react';
import { FileText, MessageSquare, Bell, Clock } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'tender' | 'message' | 'status' | 'document';
}

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'tender':
        return (
          <div className="w-8 h-8 rounded-full bg-status-pending/10 flex items-center justify-center text-status-pending">
            <FileText size={16} />
          </div>
        );
      case 'message':
        return (
          <div className="w-8 h-8 rounded-full bg-status-assigned/10 flex items-center justify-center text-status-assigned">
            <MessageSquare size={16} />
          </div>
        );
      case 'status':
        return (
          <div className="w-8 h-8 rounded-full bg-status-completed/10 flex items-center justify-center text-status-completed">
            <Bell size={16} />
          </div>
        );
      case 'document':
        return (
          <div className="w-8 h-8 rounded-full bg-status-in-progress/10 flex items-center justify-center text-status-in-progress">
            <FileText size={16} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className="mr-3">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm">{activity.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Clock size={12} className="mr-1" />
              <span>{activity.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
      
      {activities.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          Aucune activité récente.
        </div>
      )}
    </div>
  );
}
