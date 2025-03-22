
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, MapPin, BarChart3, PieChart, LineChart, Users, Building, ShieldCheck, TrendingUp } from 'lucide-react';
import CompetitorMap from '@/components/competitive-analysis/CompetitorMap';
import MarketShareChart from '@/components/competitive-analysis/MarketShareChart';
import SuccessRateChart from '@/components/competitive-analysis/SuccessRateChart';
import CompetitorRankingTable from '@/components/competitive-analysis/CompetitorRankingTable';
import ProjectsEvolutionChart from '@/components/competitive-analysis/ProjectsEvolutionChart';

export default function CompetitiveAnalysis() {
  const [searchParams] = useSearchParams();
  const [timeRange, setTimeRange] = useState('1-year');
  const [region, setRegion] = useState('all');
  const [projectType, setProjectType] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="container py-6 space-y-6 max-w-7xl">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Analyse Concurrentielle</h1>
              <p className="text-muted-foreground">
                Analysez votre positionnement sur le marché et identifiez vos principaux concurrents
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Données anonymisées et sécurisées</span>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filtres d'analyse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Période d'analyse</label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-months">3 derniers mois</SelectItem>
                      <SelectItem value="6-months">6 derniers mois</SelectItem>
                      <SelectItem value="1-year">1 an</SelectItem>
                      <SelectItem value="2-years">2 ans</SelectItem>
                      <SelectItem value="5-years">5 ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Région</label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une région" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les régions</SelectItem>
                      <SelectItem value="ile-de-france">Île-de-France</SelectItem>
                      <SelectItem value="auvergne-rhone-alpes">Auvergne-Rhône-Alpes</SelectItem>
                      <SelectItem value="nouvelle-aquitaine">Nouvelle-Aquitaine</SelectItem>
                      <SelectItem value="occitanie">Occitanie</SelectItem>
                      <SelectItem value="hauts-de-france">Hauts-de-France</SelectItem>
                      <SelectItem value="grand-est">Grand Est</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Type de projet</label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les projets</SelectItem>
                      <SelectItem value="residential">Résidentiel</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="public">Bâtiments publics</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="industrial">Industriel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="competitors">Concurrents</TabsTrigger>
              <TabsTrigger value="projects">Projets</TabsTrigger>
              <TabsTrigger value="geography">Géographie</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Market Share Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary" />
                      Parts de marché
                    </CardTitle>
                    <CardDescription>
                      Répartition des parts de marché entre les principaux acteurs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <MarketShareChart region={region} timeRange={timeRange} projectType={projectType} />
                  </CardContent>
                </Card>

                {/* Projects Evolution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-primary" />
                      Évolution des projets remportés
                    </CardTitle>
                    <CardDescription>
                      Tendance des projets remportés au fil du temps
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ProjectsEvolutionChart region={region} timeRange={timeRange} projectType={projectType} />
                  </CardContent>
                </Card>
              </div>

              {/* Success Rate by Project Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Taux de réussite par type de travaux
                  </CardTitle>
                  <CardDescription>
                    Comparaison des taux de succès par type de projets
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <SuccessRateChart region={region} timeRange={timeRange} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-6">
              {/* Competitors Ranking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Classement des concurrents
                  </CardTitle>
                  <CardDescription>
                    Classement par nombre de projets remportés et taux de succès
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompetitorRankingTable region={region} timeRange={timeRange} projectType={projectType} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              {/* Projects Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Comparaison par taille de projets
                  </CardTitle>
                  <CardDescription>
                    Répartition des projets remportés par taille de budget
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ProjectsEvolutionChart region={region} timeRange={timeRange} projectType={projectType} showBySize={true} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geography" className="space-y-6">
              {/* Geographic Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Répartition géographique des projets
                  </CardTitle>
                  <CardDescription>
                    Carte interactive des zones d'activité des concurrents
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <CompetitorMap region={region} timeRange={timeRange} projectType={projectType} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
