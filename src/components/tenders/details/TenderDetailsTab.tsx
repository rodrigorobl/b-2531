
import React from 'react';
import { TenderSearchResult } from '@/types/tenders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Eye, 
  Map, 
  Building, 
  FileDown, 
  Clock, 
  Users,
  Bookmark,
  Calendar,
  Star
} from 'lucide-react';

interface TenderDetailsTabProps {
  tender: TenderSearchResult;
}

export default function TenderDetailsTab({ tender }: TenderDetailsTabProps) {
  return (
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
          {tender.lots.map((lot, index) => (
            <Badge key={index} variant="outline" className="font-normal">
              {lot}
            </Badge>
          ))}
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
      
      {tender.status === 'open' && (
        <Link to={`/tender-detail/${tender.id}`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
          <Eye size={14} />
          <span>Voir la fiche du projet</span>
        </Link>
      )}
      
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="w-full gap-1">
          <Bookmark size={14} />
          <span>Sauvegarder</span>
        </Button>
        <Button variant="outline" size="sm" className="w-full gap-1">
          <FileDown size={14} />
          <span>Télécharger DCE</span>
        </Button>
      </div>
    </div>
  );
}
