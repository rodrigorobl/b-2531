
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Star } from 'lucide-react';

interface Opportunity {
  id: string;
  type: 'reference' | 'quote';
  projectName: string;
  description: string;
  createdAt: string;
  isNew: boolean;
}

interface OpportunitiesOverviewProps {
  opportunities: Opportunity[];
}

export default function OpportunitiesOverview({ opportunities }: OpportunitiesOverviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Mes opportunités
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{opportunity.projectName}</span>
                  {opportunity.isNew && (
                    <Badge>Nouveau</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                <p className="text-xs text-muted-foreground">{opportunity.createdAt}</p>
              </div>
              <Badge variant={opportunity.type === 'reference' ? 'secondary' : 'default'}>
                {opportunity.type === 'reference' ? 'Référencement' : 'Devis'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
