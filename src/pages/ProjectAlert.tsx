
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BellPlus, Bell, BellOff, Trash2, ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Link } from 'react-router-dom';

export default function ProjectAlert() {
  const [alertName, setAlertName] = useState('');
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([]);
  const [selectedMissions, setSelectedMissions] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  
  const mockAlerts = [
    { 
      id: 'alert-001', 
      name: 'Projets de logements en IDF', 
      active: true,
      criteria: [
        'Type: Logements',
        'Région: Île-de-France',
        'Missions: BET Fluides, BET Acoustique'
      ],
      lastNotification: '10/08/2023',
      matchCount: 3
    },
    { 
      id: 'alert-002', 
      name: 'Bureaux et commerces', 
      active: true,
      criteria: [
        'Types: Bureaux, Commerces',
        'Région: Toutes',
        'Budget: > 10M€',
        'Missions: Maîtrise d\'Œuvre'
      ],
      lastNotification: '15/08/2023',
      matchCount: 7
    },
    { 
      id: 'alert-003', 
      name: 'Équipements publics en PACA', 
      active: false,
      criteria: [
        'Type: Équipements publics',
        'Région: PACA',
        'Missions: BET Structure'
      ],
      lastNotification: '05/07/2023',
      matchCount: 0
    }
  ];

  const projectTypes = [
    { id: 'logements', label: 'Logements' },
    { id: 'bureaux', label: 'Bureaux' },
    { id: 'equipements-publics', label: 'Équipements publics' },
    { id: 'commerces', label: 'Commerces' },
    { id: 'industrie', label: 'Industrie' },
    { id: 'hotellerie', label: 'Hôtellerie' },
    { id: 'sante', label: 'Santé' },
    { id: 'enseignement', label: 'Enseignement' },
  ];
  
  const missions = [
    { id: 'moe', label: 'Maîtrise d\'Œuvre' },
    { id: 'conception', label: 'Conception architecturale' },
    { id: 'controle', label: 'Contrôle technique' },
    { id: 'bet-structure', label: 'BET Structure' },
    { id: 'bet-fluides', label: 'BET Fluides' },
    { id: 'bet-acoustique', label: 'BET Acoustique' },
    { id: 'opc', label: 'OPC' },
    { id: 'economiste', label: 'Économiste' },
  ];
  
  const regions = [
    { id: 'ile-de-france', label: 'Île-de-France' },
    { id: 'aura', label: 'Auvergne-Rhône-Alpes' },
    { id: 'paca', label: 'Provence-Alpes-Côte d\'Azur' },
    { id: 'occitanie', label: 'Occitanie' },
    { id: 'nouvelle-aquitaine', label: 'Nouvelle-Aquitaine' },
    { id: 'bretagne', label: 'Bretagne' },
    { id: 'grand-est', label: 'Grand Est' },
  ];

  const toggleProjectType = (id: string) => {
    setSelectedProjectTypes(prev => 
      prev.includes(id) 
        ? prev.filter(type => type !== id) 
        : [...prev, id]
    );
  };

  const toggleMission = (id: string) => {
    setSelectedMissions(prev => 
      prev.includes(id) 
        ? prev.filter(mission => mission !== id) 
        : [...prev, id]
    );
  };

  const toggleRegion = (id: string) => {
    setSelectedRegions(prev => 
      prev.includes(id) 
        ? prev.filter(region => region !== id) 
        : [...prev, id]
    );
  };

  const handleCreateAlert = () => {
    // Logique pour créer une alerte
    console.log({
      name: alertName,
      projectTypes: selectedProjectTypes,
      missions: selectedMissions,
      regions: selectedRegions,
    });
    
    // Reset form
    setAlertName('');
    setSelectedProjectTypes([]);
    setSelectedMissions([]);
    setSelectedRegions([]);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/opportunities-search">
                <ArrowLeft size={16} />
                <span className="ml-1">Retour</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Alertes Projets</h1>
          </div>
          
          <Tabs defaultValue="create">
            <TabsList className="mb-6">
              <TabsTrigger value="create">Créer une alerte</TabsTrigger>
              <TabsTrigger value="manage">Gérer mes alertes ({mockAlerts.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellPlus className="h-5 w-5" />
                    Nouvelle alerte
                  </CardTitle>
                  <CardDescription>
                    Créez une alerte personnalisée pour être notifié des nouveaux projets correspondant à vos critères.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="alert-name">Nom de l'alerte</Label>
                    <Input 
                      id="alert-name" 
                      placeholder="Ex: Projets de bureaux en Île-de-France" 
                      value={alertName}
                      onChange={(e) => setAlertName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Types de projets</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {projectTypes.map(type => (
                        <div key={type.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`project-type-${type.id}`} 
                            checked={selectedProjectTypes.includes(type.id)}
                            onCheckedChange={() => toggleProjectType(type.id)}
                          />
                          <Label htmlFor={`project-type-${type.id}`} className="text-sm">
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Missions recherchées</Label>
                    <ScrollArea className="h-40 w-full border rounded-md p-2">
                      <div className="grid grid-cols-2 gap-2">
                        {missions.map(mission => (
                          <div key={mission.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mission-${mission.id}`}
                              checked={selectedMissions.includes(mission.id)}
                              onCheckedChange={() => toggleMission(mission.id)}
                            />
                            <Label htmlFor={`mission-${mission.id}`} className="text-sm">
                              {mission.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Régions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {regions.map(region => (
                        <div key={region.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`region-${region.id}`}
                            checked={selectedRegions.includes(region.id)}
                            onCheckedChange={() => toggleRegion(region.id)}
                          />
                          <Label htmlFor={`region-${region.id}`} className="text-sm">
                            {region.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Budget minimum du projet</Label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Tous budgets" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Tous budgets</SelectItem>
                        <SelectItem value="1000000">Plus de 1 million €</SelectItem>
                        <SelectItem value="5000000">Plus de 5 millions €</SelectItem>
                        <SelectItem value="10000000">Plus de 10 millions €</SelectItem>
                        <SelectItem value="50000000">Plus de 50 millions €</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fréquence de notification</Label>
                    <Select defaultValue="instant">
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une fréquence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">Instantanée</SelectItem>
                        <SelectItem value="daily">Quotidienne</SelectItem>
                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleCreateAlert}
                    disabled={!alertName || selectedProjectTypes.length === 0}
                  >
                    <BellPlus className="mr-2 h-4 w-4" />
                    Créer l'alerte
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="manage">
              <div className="space-y-4">
                {mockAlerts.map(alert => (
                  <Card key={alert.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {alert.active ? (
                            <Bell className="h-5 w-5 text-primary mr-2" />
                          ) : (
                            <BellOff className="h-5 w-5 text-muted-foreground mr-2" />
                          )}
                          <div>
                            <h3 className="font-medium">{alert.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Dernière notification: {alert.lastNotification}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${alert.matchCount > 0 ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'}`}>
                          {alert.matchCount} correspondance{alert.matchCount !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="text-sm font-medium">Critères :</div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                          {alert.criteria.map((criterion, index) => (
                            <li key={index}>{criterion}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">
                          {alert.active ? (
                            <>
                              <BellOff className="h-4 w-4 mr-1" />
                              Désactiver
                            </>
                          ) : (
                            <>
                              <Bell className="h-4 w-4 mr-1" />
                              Activer
                            </>
                          )}
                        </Button>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
