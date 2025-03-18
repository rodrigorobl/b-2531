
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProjectMap from '@/components/ProjectMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Filter, MapPin, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuoteStatusBadge } from '@/components/quotes/QuoteStatusBadge';

// Mock construction sites data
const CONSTRUCTION_SITES = [
  {
    id: 'site-001',
    name: 'Résidence Les Cerisiers',
    type: 'Résidentiel',
    status: 'in-progress' as const,
    location: {
      address: '15 Rue des Cerisiers, 69003 Lyon',
      lat: 45.7578137,
      lng: 4.8320114
    },
    promoter: 'NEXITY',
    moe: 'Cabinet Durand Architecture',
    bet: 'BET Structure & Fluides',
    contractors: ['Électricité Moderne', 'Plomberie du Rhône', 'Maçonnerie Lyon'],
    startDate: '15/03/2024',
    endDate: '30/11/2024'
  },
  {
    id: 'site-002',
    name: 'Centre Commercial Grand Place',
    type: 'Commercial',
    status: 'assigned' as const,
    location: {
      address: '42 Avenue de la République, 69100 Villeurbanne',
      lat: 45.7675,
      lng: 4.8898
    },
    promoter: 'VINCI Immobilier',
    moe: 'Studio Architecture Commerciale',
    bet: 'Ingénierie Bâtiment',
    contractors: ['Climatisation Pro', 'Électricité Générale', 'Menuiserie Industrielle'],
    startDate: '01/06/2024',
    endDate: '15/05/2025'
  },
  {
    id: 'site-003',
    name: 'École Saint-Pierre',
    type: 'Public',
    status: 'in-progress' as const,
    location: {
      address: '8 Rue Saint-Pierre, 69005 Lyon',
      lat: 45.7566,
      lng: 4.8222
    },
    promoter: 'Mairie de Lyon',
    moe: 'Bureau d\'Architecture Municipale',
    bet: 'Lyon Ingénierie',
    contractors: ['Plomberie Scolaire', 'Construction Publique', 'Sécurité Bâtiment'],
    startDate: '10/01/2024',
    endDate: '20/08/2024'
  }
];

export default function ConstructionSitesMap() {
  const [selectedSite, setSelectedSite] = useState<typeof CONSTRUCTION_SITES[0] | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const filteredSites = CONSTRUCTION_SITES.filter(site => {
    // Filter by type
    if (filterType !== 'all' && site.type !== filterType) return false;
    
    // Filter by city (simplified for demo)
    if (filterCity !== 'all') {
      const siteCity = site.location.address.split(',')[1]?.trim().split(' ')[1];
      if (filterCity !== siteCity) return false;
    }
    
    // Filter by search query
    if (searchQuery && !site.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard-services">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Carte des Chantiers</h1>
          </div>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Input
              placeholder="Rechercher un chantier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Type de chantier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Résidentiel">Résidentiel</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Industriel">Industriel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger>
                <SelectValue placeholder="Ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                <SelectItem value="Lyon">Lyon</SelectItem>
                <SelectItem value="Villeurbanne">Villeurbanne</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filtres avancés
            </Button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - list of sites */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Chantiers ({filteredSites.length})</h2>
            
            {filteredSites.map((site) => (
              <Card 
                key={site.id} 
                className={`cursor-pointer transition-colors hover:border-primary ${selectedSite?.id === site.id ? 'border-primary' : ''}`}
                onClick={() => setSelectedSite(site)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{site.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin size={12} />
                        {site.location.address.split(',')[0]}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className="bg-blue-500">{site.type}</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs flex justify-between mb-1">
                      <span className="text-muted-foreground">Date début:</span>
                      <span>{site.startDate}</span>
                    </p>
                    <p className="text-xs flex justify-between">
                      <span className="text-muted-foreground">Date fin:</span>
                      <span>{site.endDate}</span>
                    </p>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t flex justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Building size={12} className="mr-1" />
                      {site.promoter}
                    </div>
                    <Link to={`/construction-site/${site.id}`} onClick={(e) => e.stopPropagation()} className="text-primary text-xs hover:underline">
                      Voir détails
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Map and details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-[500px] border rounded-lg overflow-hidden">
              {/* If a site is selected, center the map on it, otherwise show all sites */}
              {selectedSite ? (
                <ProjectMap location={selectedSite.location} />
              ) : filteredSites.length > 0 ? (
                <ProjectMap location={filteredSites[0].location} />
              ) : (
                <div className="h-full flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Aucun chantier trouvé</p>
                </div>
              )}
            </div>
            
            {selectedSite && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{selectedSite.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">{selectedSite.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Statut</p>
                        <div className="mt-1">
                          <Badge className={`
                            ${selectedSite.status === 'in-progress' ? 'bg-status-in-progress' : ''}
                            ${selectedSite.status === 'assigned' ? 'bg-status-assigned' : ''}
                          `}>
                            {selectedSite.status === 'in-progress' ? 'En cours' : 'Affecté'}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date de début</p>
                        <p className="font-medium">{selectedSite.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date de fin</p>
                        <p className="font-medium">{selectedSite.endDate}</p>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <h4 className="font-medium mb-2">Intervenants</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Promoteur</p>
                          <p className="font-medium">{selectedSite.promoter}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Maître d'œuvre</p>
                          <p className="font-medium">{selectedSite.moe}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Bureau d'études</p>
                          <p className="font-medium">{selectedSite.bet}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <h4 className="font-medium mb-2">Entreprises titulaires</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSite.contractors.map((contractor, index) => (
                          <Badge key={index} variant="outline" className="bg-muted">
                            {contractor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-3">
                      <Button className="w-full" asChild>
                        <Link to={`/construction-site/${selectedSite.id}`}>
                          Voir la fiche complète
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
