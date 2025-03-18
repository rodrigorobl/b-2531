
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface ReferenceTimelineProps {
  timeline: TimelineEvent[];
}

export default function ReferenceTimeline({ timeline }: ReferenceTimelineProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Historique et Planning du Référencement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-8 space-y-6 pb-6">
          {/* Timeline vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/20"></div>
          
          {timeline.map((event, index) => (
            <div key={index} className="relative">
              {/* Timeline bullet */}
              <div 
                className={`absolute -left-8 h-8 w-8 rounded-full flex items-center justify-center
                  ${event.status === 'completed' ? 'bg-primary/10' : 'bg-muted'}
                `}
              >
                {event.status === 'completed' ? (
                  <CheckCircle size={16} className="text-primary" />
                ) : event.status === 'pending' ? (
                  <Clock size={16} className="text-muted-foreground" />
                ) : (
                  <ArrowRight size={16} className="text-destructive" />
                )}
              </div>
              
              <div className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{event.title}</h3>
                  <Badge variant={event.status === 'completed' ? 'default' : 'outline'}>
                    {event.date}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
