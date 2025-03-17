import React, { useState } from 'react';
import { Building, MapPin, Star, Filter } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CompanyCategory } from '@/types/directory';
interface CompanyFiltersProps {
  selectedCategory: CompanyCategory | null;
  setSelectedCategory: (category: CompanyCategory | null) => void;
}
export default function CompanyFilters({
  selectedCategory,
  setSelectedCategory
}: CompanyFiltersProps) {
  const [minRating, setMinRating] = useState(0);
  const categories = [{
    value: 'architecte',
    label: 'Architectes'
  }, {
    value: 'bureau-etudes',
    label: 'MOE & BET'
  }, {
    value: 'construction',
    label: 'Entreprises de construction'
  }, {
    value: 'services',
    label: 'Entreprises de services'
  }, {
    value: 'industriel',
    label: 'Industriels'
  }, {
    value: 'fournisseur',
    label: 'Fournisseurs'
  }];
  const specialties = {
    'architecte': ['Logement', 'Hôtels', 'Bureaux', 'Équipements publics', 'Commerce'],
    'bureau-etudes': ['Acousticien', 'Bureau de structure', 'Géotechnicien', 'BET Fluides', 'Économiste'],
    'construction': ['Gros Œuvre', 'Charpente', 'Peinture', 'Électricité', 'Plomberie', 'Menuiserie'],
    'services': ['Pilote de drone', 'Location de matériel', 'Études de sol', 'Sécurité de chantier'],
    'industriel': ['Garde-corps', 'Escaliers préfabriqués', 'Systèmes de ventilation', 'Éléments préfabriqués'],
    'fournisseur': ['Peintures', 'Produits de construction', 'Bois', 'Matériaux d\'isolation']
  };
  const regions = ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Nouvelle-Aquitaine', 'Occitanie', 'Hauts-de-France', 'Provence-Alpes-Côte d\'Azur', 'Grand Est', 'Bretagne', 'Normandie', 'Pays de la Loire', 'Bourgogne-Franche-Comté', 'Centre-Val de Loire', 'Corse'];
  const handleCategoryChange = (value: string) => {
    if (value === "null") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(value as CompanyCategory);
    }
  };
  const resetFilters = () => {
    setSelectedCategory(null);
    setMinRating(0);
  };
  return <div className="p-4 space-y-6">
      <h2 className="font-semibold flex items-center gap-2">
        <Filter size={16} />
        Filtres avancés
      </h2>
      
      <div className="space-y-4">
        
        
        {selectedCategory && <div className="space-y-2">
            <Label>Spécialité</Label>
            <Select defaultValue={specialties[selectedCategory][0]}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes spécialités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">Toutes spécialités</SelectItem>
                {specialties[selectedCategory].map(specialty => <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>}
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            Localisation
          </Label>
          <Select defaultValue={regions[0]}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes régions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Toutes régions</SelectItem>
              {regions.map(region => <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>)}
            </SelectContent>
          </Select>
          <Input placeholder="Ville ou département" className="mt-2" />
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Star size={16} className="text-muted-foreground" />
            Note minimale: {minRating}
          </Label>
          <Slider defaultValue={[0]} max={5} step={0.5} value={[minRating]} onValueChange={values => setMinRating(values[0])} />
        </div>
        
        
        
        <Button className="w-full" onClick={resetFilters}>
          Réinitialiser les filtres
        </Button>
      </div>
    </div>;
}