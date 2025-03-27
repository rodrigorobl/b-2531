
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Building, 
  DraftingCompass, 
  Ruler, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Filter
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types for partner relationships
interface Partner {
  id: string;
  name: string;
  type: 'promoteur' | 'architecte' | 'bet';
  logo?: string;
  description?: string;
}

interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  location: {
    city: string;
    department: string;
  };
  awardedDate: string; // Format: "MM/YYYY"
  partners: Partner[];
}

// Mock data for partners
const mockPartners: Partner[] = [
  { id: "p1", name: "Bouygues Immobilier", type: "promoteur", description: "Un des leaders français de la promotion immobilière" },
  { id: "p2", name: "Nexity", type: "promoteur", description: "Premier groupe immobilier français intégré" },
  { id: "p3", name: "Vinci Immobilier", type: "promoteur", description: "Filiale de promotion immobilière du groupe Vinci" },
  { id: "a1", name: "Jean Nouvel Architecture", type: "architecte", description: "Agence d'architecture de renommée internationale" },
  { id: "a2", name: "Wilmotte & Associés", type: "architecte", description: "Cabinet d'architecture et d'urbanisme" },
  { id: "a3", name: "Atelier 2M", type: "architecte", description: "Agence d'architecture spécialisée dans les projets urbains" },
  { id: "b1", name: "Artelia", type: "bet", description: "Groupe international d'ingénierie, de management de projet et de conseil" },
  { id: "b2", name: "Egis", type: "bet", description: "Groupe d'ingénierie, de montage de projets et d'exploitation" },
  { id: "b3", name: "Ingérop", type: "bet", description: "Société d'ingénierie pour des projets durables et complexes" },
];

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: "proj1",
    name: "Résidence Les Jardins du Parc",
    type: "logements",
    description: "Ensemble résidentiel de 120 logements avec espaces verts et commerces en rez-de-chaussée",
    location: { city: "Lyon", department: "69" },
    awardedDate: "03/2022",
    partners: [mockPartners[0], mockPartners[3], mockPartners[6]]
  },
  {
    id: "proj2",
    name: "Tour Horizon",
    type: "bureaux",
    description: "Immeuble de bureaux de 15 étages avec certification HQE et BREEAM Excellent",
    location: { city: "Paris", department: "75" },
    awardedDate: "09/2021",
    partners: [mockPartners[1], mockPartners[4], mockPartners[7]]
  },
  {
    id: "proj3",
    name: "Centre Commercial Atlantis",
    type: "commerces",
    description: "Complexe commercial de 45 000 m² avec galerie marchande et multiplexe",
    location: { city: "Nantes", department: "44" },
    awardedDate: "11/2021",
    partners: [mockPartners[2], mockPartners[5], mockPartners[8]]
  },
  {
    id: "proj4",
    name: "Campus Universitaire Innovation",
    type: "enseignement",
    description: "Campus comprenant bâtiments d'enseignement, laboratoires et résidences étudiantes",
    location: { city: "Toulouse", department: "31" },
    awardedDate: "05/2022",
    partners: [mockPartners[0], mockPartners[4], mockPartners[8]]
  },
  {
    id: "proj5",
    name: "Résidence Séniors Les Tilleuls",
    type: "logements",
    description: "Résidence services pour seniors comprenant 80 logements et espaces communs",
    location: { city: "Bordeaux", department: "33" },
    awardedDate: "01/2022",
    partners: [mockPartners[1], mockPartners[3], mockPartners[7]]
  },
  {
    id: "proj6",
    name: "Clinique du Parc",
    type: "santé",
    description: "Établissement de santé moderne de 200 lits avec plateau technique de pointe",
    location: { city: "Montpellier", department: "34" },
    awardedDate: "07/2021",
    partners: [mockPartners[2], mockPartners[5], mockPartners[6]]
  },
];

const IndustryPartners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [selectedPartnerType, setSelectedPartnerType] = useState<'promoteur' | 'architecte' | 'bet' | ''>('');
  const [selectedPromoter, setSelectedPromoter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Get promoters from mock data
  const promoters = mockPartners.filter(partner => partner.type === 'promoteur');

  // Filter projects based on search term and filters
  const filteredProjects = mockProjects.filter(project => {
    // Search term filter across project name and partners
    const matchesSearch = searchTerm === '' || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.partners.some(partner => 
        partner.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // Project type filter
    const matchesType = selectedType === '' || project.type === selectedType;
    
    // Region filter
    const matchesRegion = selectedRegion === '' || 
      project.location.department === selectedRegion ||
      project.location.city.toLowerCase() === selectedRegion.toLowerCase();
    
    // Period filter (year/month)
    const matchesPeriod = selectedPeriod === '' || 
      project.awardedDate.includes(selectedPeriod);
    
    // Partner type filter
    const matchesPartnerType = selectedPartnerType === '' || 
      project.partners.some(partner => partner.type === selectedPartnerType);
    
    // Promoter filter
    const matchesPromoter = selectedPromoter === '' ||
      project.partners.some(partner => 
        partner.type === 'promoteur' && partner.id === selectedPromoter
      );
    
    return matchesSearch && matchesType && matchesRegion && matchesPeriod && matchesPartnerType && matchesPromoter;
  });

  // Get unique project types for filter
  const projectTypes = Array.from(new Set(mockProjects.map(project => project.type)));
  
  // Get unique regions for filter
  const regions = Array.from(new Set(mockProjects.map(project => 
    `${project.location.city} (${project.location.department})`
  )));
  
  // Get unique periods for filter
  const periods = Array.from(new Set(mockProjects.map(project => 
    project.awardedDate
  ))).sort((a, b) => {
    const [monthA, yearA] = a.split('/');
    const [monthB, yearB] = b.split('/');
    return (yearA === yearB) 
      ? parseInt(monthA) - parseInt(monthB) 
      : parseInt(yearA) - parseInt(yearB);
  });

  const clearFilters = () => {
    setSelectedType('');
    setSelectedRegion('');
    setSelectedPeriod('');
    setSelectedPartnerType('');
    setSelectedPromoter('');
  };

  const getPartnerTypeIcon = (type: string) => {
    switch (type) {
      case 'promoteur': return <Building className="h-4 w-4" />;
      case 'architecte': return <DraftingCompass className="h-4 w-4" />;
      case 'bet': return <Ruler className="h-4 w-4" />;
      default: return null;
    }
  };

  const getPartnerTypeName = (type: string) => {
    switch (type) {
      case 'promoteur': return 'Promoteur';
      case 'architecte': return 'Architecte';
      case 'bet': return 'Bureau d\'études';
      default: return type;
    }
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <h1 className="text-3xl font-bold">Analyse des partenaires industriels</h1>
        <p className="text-muted-foreground">
          Analysez les relations entre Promoteurs, Architectes et Bureaux d'études techniques et découvrez leur historique de collaboration.
        </p>

        {/* Search, filters and promoter selector */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un promoteur, architecte ou BET..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Tabs value={selectedPartnerType || 'all'} onValueChange={(value) => setSelectedPartnerType(value === 'all' ? '' : value as any)}>
                <TabsList>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="promoteur">Promoteurs</TabsTrigger>
                  <TabsTrigger value="architecte">Architectes</TabsTrigger>
                  <TabsTrigger value="bet">BET</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Popover open={showFilters} onOpenChange={setShowFilters}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtres
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h3 className="font-medium">Filtres</h3>
                    
                    {/* Project type filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type de projet</label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tous les types</SelectItem>
                          {projectTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Region filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Zone géographique</label>
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes les régions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Toutes les régions</SelectItem>
                          {regions.map(region => (
                            <SelectItem key={region} value={region.split(' ')[0]}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Period filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Période</label>
                      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes les périodes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Toutes les périodes</SelectItem>
                          {periods.map(period => (
                            <SelectItem key={period} value={period}>
                              {period}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" onClick={clearFilters}>
                        Réinitialiser
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Promoter selector */}
          <div className="w-full md:w-80">
            <label className="text-sm font-medium block mb-2">Sélectionner un promoteur</label>
            <Select value={selectedPromoter} onValueChange={setSelectedPromoter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les promoteurs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les promoteurs</SelectItem>
                {promoters.map(promoter => (
                  <SelectItem key={promoter.id} value={promoter.id}>
                    {promoter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Toggle view mode */}
          <div className="flex justify-end">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'cards' | 'table')}>
              <TabsList>
                <TabsTrigger value="cards">Cartes</TabsTrigger>
                <TabsTrigger value="table">Tableau</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Projets collaboratifs ({filteredProjects.length})
            </h2>
          </div>

          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">Aucun projet trouvé avec ces critères.</p>
                <Button variant="link" onClick={clearFilters}>Réinitialiser les filtres</Button>
              </CardContent>
            </Card>
          ) : viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map(project => (
                <Card key={project.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold">{project.name}</h3>
                          <Badge>{project.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      </div>

                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{project.location.city} ({project.location.department})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Attribution: {project.awardedDate}</span>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-medium mb-2">Partenaires</h4>
                        <div className="space-y-2">
                          {project.partners.map(partner => (
                            <div key={partner.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getPartnerTypeIcon(partner.type)}
                                <span>{partner.name}</span>
                              </div>
                              <Badge variant="outline">
                                {getPartnerTypeName(partner.type)}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link to={`/project-specifications?projectId=${project.id}`}>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Voir le projet
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Table view
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du projet</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Attribution</TableHead>
                    <TableHead>Partenaires</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map(project => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>
                        <Badge>{project.type}</Badge>
                      </TableCell>
                      <TableCell>{project.location.city} ({project.location.department})</TableCell>
                      <TableCell>{project.awardedDate}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {project.partners.map(partner => (
                            <div key={partner.id} className="flex items-center gap-1 text-xs">
                              {getPartnerTypeIcon(partner.type)}
                              <span>{partner.name}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link to={`/project-specifications?projectId=${project.id}`}>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Détails
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IndustryPartners;
