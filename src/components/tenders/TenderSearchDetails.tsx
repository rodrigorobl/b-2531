
import React from 'react';
import { TenderSearchResult } from '@/pages/TenderSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Map, Building, Clock, Users, Star, ExternalLink, BarChart } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';

interface TenderSearchDetailsProps {
  tender?: TenderSearchResult;
  projectButtonText?: string;
  projectUrlPath?: string;
}

export default function TenderSearchDetails({
  tender,
  projectButtonText = "Accéder à l'Appel d'offres",
  projectUrlPath = "/tender-specifications"
}: TenderSearchDetailsProps) {
  const { activeProfile } = useProfile();
  
  if (!tender) {
    return <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm flex items-center justify-center">
        <div className="text-center p-6 text-muted-foreground">
          <FileText className="mx-auto mb-2 opacity-20" size={40} />
          <p>Sélectionnez un appel d'offres pour voir les détails</p>
        </div>
      </div>;
  }
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Ouvert';
      case 'closed':
        return 'Clôturé';
      case 'assigned':
        return 'Attribué';
      default:
        return 'Inconnu';
    }
  };
  
  const getButtonDestination = () => {
    if (activeProfile === 'entreprise-construction') {
      return `/project-tender-analysis?project=${tender.id}`;
    }
    return `/tender-specifications?project=${tender.id}`;
  };

  const getButtonIcon = () => {
    if (activeProfile === 'entreprise-construction') {
      return <BarChart size={14} />;
    }
    return <ExternalLink size={14} />;
  };
  
  return <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate">{tender.projectName}</h3>
          <Button variant="ghost" size="sm" className={tender.isFavorite ? "text-amber-500" : "text-muted-foreground"}>
            <Star size={16} />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <Badge variant="outline" className="rounded-sm font-normal">
            {getStatusLabel(tender.status)}
          </Badge>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>Publié le {tender.createdAt}</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{tender.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Échéance: {tender.deadline}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">MOA: {tender.client.name}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1.5">
                <Map size={14} className="text-muted-foreground" />
                <h4 className="text-xs font-medium">Localisation</h4>
              </div>
              <p className="text-sm">{tender.location}</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Building size={14} className="text-muted-foreground" />
                <h4 className="text-xs font-medium">Type de projet</h4>
              </div>
              <p className="text-sm">{tender.projectType}</p>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-muted-foreground" />
              <h4 className="text-xs font-medium">Lots concernés</h4>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {tender.lots.map((lot, index) => <Badge key={index} variant="outline" className="font-normal">
                  {lot}
                </Badge>)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-3">
                <CardTitle className="text-sm">Budget estimé</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 font-medium">
                {tender.budget}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-3">
                <CardTitle className="text-sm">Surface</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 font-medium">
                {tender.surface}
              </CardContent>
            </Card>
          </div>
          
          <Link to={getButtonDestination()} className="w-full">
            <Button className="w-full gap-2">
              {getButtonIcon()}
              <span>Accéder à l'Appel d'Offres</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>;
}
