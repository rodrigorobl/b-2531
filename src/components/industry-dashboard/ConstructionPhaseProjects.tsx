
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { Clock, FileText, ExternalLink } from 'lucide-react';

interface Quote {
  id: string;
  projectName: string;
  lot: string;
  contractor: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: string;
  updatedAt: string;
}

interface ConstructionPhaseProjectsProps {
  quotes: Quote[];
}

export default function ConstructionPhaseProjects({ quotes }: ConstructionPhaseProjectsProps) {
  const navigate = useNavigate();
  
  const getStatusLabel = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvé';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };
  
  const getStatusVariant = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleDetailsClick = (id: string) => {
    navigate(`/quote-detail/${id}`);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Mes projets en phase de réalisation</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/quotes-list">
            <ExternalLink className="h-4 w-4 mr-2" />
            Voir tous
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="flex flex-col p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <h3 className="font-medium">{quote.projectName}</h3>
                  <p className="text-sm font-medium">{quote.lot}</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Entreprise:</span> {quote.contractor}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={getStatusVariant(quote.status)}>
                    {getStatusLabel(quote.status)}
                  </Badge>
                  <span className="text-sm font-medium">{quote.amount}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  Mis à jour le {quote.updatedAt}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDetailsClick(quote.id)}
                >
                  <FileText className="h-4 w-4 mr-2" />
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
