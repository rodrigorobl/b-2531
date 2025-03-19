
import React, { useState } from 'react';
import { ServiceTenderSearchResult } from '@/pages/ServicesTenderSearch';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Star, 
  PenLine,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getServicesTenderStatusText } from './ServicesTenderUtils';

interface ServicesTenderDetailsProps {
  tender: ServiceTenderSearchResult | undefined;
}

export default function ServicesTenderDetails({ tender }: ServicesTenderDetailsProps) {
  const [notes, setNotes] = useState('');
  
  if (!tender) {
    return (
      <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm p-8 flex items-center justify-center">
        <p className="text-muted-foreground text-sm text-center">
          Sélectionnez un appel d'offres pour voir les détails
        </p>
      </div>
    );
  }

  return (
    <div className="w-96 min-w-96 bg-white rounded-lg shadow-sm overflow-auto">
      <div className="p-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{tender.projectName}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Building size={14} />
              {tender.serviceType}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>{tender.location}</span>
              </div>
              <Badge variant={tender.status === 'open' ? 'default' : 'outline'}>
                {getServicesTenderStatusText(tender.status)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Budget estimé</p>
                <p className="font-medium">{tender.budget}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Date limite</p>
                <p className="font-medium">{tender.deadline}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Client</p>
                <p className="font-medium">{tender.clientName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Type de client</p>
                <p className="font-medium">
                  {tender.clientType === 'promoteur' ? 'Promoteur' : 
                   tender.clientType === 'moe' ? 'Maître d\'œuvre' : 'Entreprise générale'}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Description</p>
              <p className="text-sm">{tender.description}</p>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex flex-col items-stretch gap-2">
            <div className="flex items-center gap-2">
              <Button className="flex-1">Consulter l'Appel d'Offres</Button>
              <Button variant="outline" className="w-10 p-0" title="Ajouter aux favoris">
                <Star size={16} className={tender.isFavorite ? "fill-amber-500 text-amber-500" : ""} />
              </Button>
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-muted-foreground mb-2">Notes personnelles</p>
              <Textarea 
                placeholder="Ajouter des notes concernant cet appel d'offres..." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="h-24 resize-none"
              />
              
              <div className="mt-2 flex justify-between">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Assigner à..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Moi-même</SelectItem>
                    <SelectItem value="colleague1">Sophie Martin</SelectItem>
                    <SelectItem value="colleague2">Thomas Durand</SelectItem>
                    <SelectItem value="colleague3">Emma Petit</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" onClick={() => setNotes(notes)}>
                  <PenLine size={14} className="mr-1" />
                  Enregistrer
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
