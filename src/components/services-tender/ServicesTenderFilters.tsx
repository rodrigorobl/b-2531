
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Building, 
  MapPin, 
  Euro, 
  Calendar, 
  Star, 
  EyeOff, 
  Filter, 
  Clock, 
  Users
} from 'lucide-react';

export default function ServicesTenderFilters() {
  const [budgetRange, setBudgetRange] = useState([0, 50000]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [excludeViewed, setExcludeViewed] = useState(false);
  const [excludeResponded, setExcludeResponded] = useState(false);
  
  const serviceTypes = [
    { value: 'all', label: 'Tous les services' },
    { value: 'stockage', label: 'LOCATION DE LOCAUX DE STOCKAGE' },
    { value: 'photo-video', label: 'SERVICES DE PHOTOGRAPHIE ET VIDÉO PROMOTIONNELLE' },
    { value: 'photographe', label: 'PHOTOGRAPHE DE CHANTIER' },
    { value: 'drone', label: 'PILOTE DE DRONE POUR VUES AÉRIENNES' },
    { value: 'marketing', label: 'SERVICES DE MARKETING SUR LE CHANTIER' },
    { value: 'visites', label: 'ORGANISATION DE VISITES DE CHANTIER POUR LES CLIENTS' },
    { value: 'amenagement', label: 'SERVICES D\'AMÉNAGEMENT INTÉRIEUR ET HOME STAGING' },
  ];
  
  const locations = [
    { value: 'all', label: 'Toutes régions' },
    { value: 'idf', label: 'Île-de-France' },
    { value: 'paca', label: 'PACA' },
    { value: 'aura', label: 'Auvergne-Rhône-Alpes' },
    { value: 'occitanie', label: 'Occitanie' },
    { value: 'bretagne', label: 'Bretagne' },
  ];
  
  const tenderStatuses = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'open', label: 'En cours' },
    { value: 'upcoming', label: 'À venir' },
    { value: 'closed', label: 'Clôturés' },
  ];
  
  const tenderOrigins = [
    { value: 'all', label: 'Toutes origines' },
    { value: 'promoteur', label: 'Promoteur' },
    { value: 'moe', label: 'Maître d\'œuvre' },
    { value: 'eg', label: 'Entreprise générale' },
  ];

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm p-4 mr-4 overflow-auto">
      <h3 className="font-medium mb-4">Filtres avancés</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building size={16} className="text-muted-foreground" />
            <Label>Type de service</Label>
          </div>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Tous les services" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <Label>Localisation</Label>
          </div>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Toutes régions" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Euro size={16} className="text-muted-foreground" />
            <Label>Budget estimé</Label>
          </div>
          <div className="pt-5 px-2">
            <Slider 
              value={budgetRange} 
              min={0} 
              max={100000} 
              step={1000}
              onValueChange={setBudgetRange}
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{formatBudget(budgetRange[0])}</span>
              <span>{formatBudget(budgetRange[1])}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            <Label>Date limite de soumission</Label>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Du</Label>
              <Input type="date" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Au</Label>
              <Input type="date" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <Label>État de l'appel d'offres</Label>
          </div>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              {tenderStatuses.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-muted-foreground" />
            <Label>Origine de l'appel d'offres</Label>
          </div>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Toutes origines" />
            </SelectTrigger>
            <SelectContent>
              {tenderOrigins.map(origin => (
                <SelectItem key={origin.value} value={origin.value}>
                  {origin.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox 
            id="favorites" 
            checked={showOnlyFavorites} 
            onCheckedChange={(checked) => setShowOnlyFavorites(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="favorites"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
            >
              <Star size={16} className="text-muted-foreground" />
              Appels d'offres favoris uniquement
            </label>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox 
            id="exclude-viewed" 
            checked={excludeViewed} 
            onCheckedChange={(checked) => setExcludeViewed(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="exclude-viewed"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
            >
              <EyeOff size={16} className="text-muted-foreground" />
              Exclure les appels d'offres déjà consultés
            </label>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox 
            id="exclude-responded" 
            checked={excludeResponded} 
            onCheckedChange={(checked) => setExcludeResponded(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="exclude-responded"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
            >
              <EyeOff size={16} className="text-muted-foreground" />
              Exclure les appels d'offres déjà répondus
            </label>
          </div>
        </div>
        
        <Button className="w-full">Appliquer les filtres</Button>
        <Button variant="outline" className="w-full">Réinitialiser</Button>
      </div>
    </div>
  );
}
