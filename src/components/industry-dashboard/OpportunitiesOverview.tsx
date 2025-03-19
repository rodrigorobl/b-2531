
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  const handleDetailsClick = (opportunity: Opportunity) => {
    if (opportunity.type === 'reference') {
      navigate(`/product-reference/${opportunity.id}`);
    } else {
      navigate(`/quote-detail/${opportunity.id}`);
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Mes opportunités
        </CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/product-reference">
            <ExternalLink className="h-4 w-4 mr-2" />
            Voir tous
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="flex flex-col p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <span className="font-medium">{opportunity.projectName}</span>
                  <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                  <p className="text-xs text-muted-foreground">{opportunity.createdAt}</p>
                </div>
                <Badge variant={opportunity.type === 'reference' ? 'secondary' : 'default'}>
                  {opportunity.type === 'reference' ? 'Référencement' : 'Devis'}
                </Badge>
              </div>
              <div className="flex justify-end mt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleDetailsClick(opportunity)}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Détails
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
