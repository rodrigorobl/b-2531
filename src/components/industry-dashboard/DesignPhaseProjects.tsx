
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Clock, ExternalLink } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Reference {
  id: string;
  projectName: string;
  productName: string;
  status: 'en-cours' | 'valide' | 'non-reference';
  betName: string;
  updatedAt: string;
}

interface DesignPhaseProjectsProps {
  references: Reference[];
}

export default function DesignPhaseProjects({ references }: DesignPhaseProjectsProps) {
  const navigate = useNavigate();
  
  const getStatusLabel = (status: 'en-cours' | 'valide' | 'non-reference') => {
    switch (status) {
      case 'en-cours': return 'En cours';
      case 'valide': return 'Validé';
      case 'non-reference': return 'Non référencé';
      default: return status;
    }
  };
  
  const getStatusVariant = (status: 'en-cours' | 'valide' | 'non-reference') => {
    switch (status) {
      case 'en-cours': return 'secondary';
      case 'valide': return 'default';
      case 'non-reference': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleDetailsClick = (id: string) => {
    navigate(`/product-reference/${id}`);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Mes projets en phase de conception</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/product-reference">
            <ExternalLink className="h-4 w-4 mr-2" />
            Voir tous
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4 pr-4">
            {references.slice(0, 5).map((reference) => (
              <div
                key={reference.id}
                className="flex flex-col p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="space-y-1">
                    <h3 className="font-medium">{reference.projectName}</h3>
                    <p className="text-sm font-medium">{reference.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">BET:</span> {reference.betName}
                    </p>
                  </div>
                  <Badge variant={getStatusVariant(reference.status)}>
                    {getStatusLabel(reference.status)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    Mis à jour le {reference.updatedAt}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDetailsClick(reference.id)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
