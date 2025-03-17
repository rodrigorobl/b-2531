
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, Plus, ArrowUpDown, Calendar, Building, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from 'react-router-dom';

// Types
interface Lot {
  id: string;
  name: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  quotesReceived: number;
  budget: string;
}

interface Project {
  id: string;
  name: string;
  type: 'conception' | 'realisation' | 'services';
  status: 'in-progress' | 'closed' | 'assigned';
  deadline: string;
  location: string;
  lots: Lot[];
  progress: number;
  estimatedBudget: string;
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Centre Commercial Riviera",
      type: "realisation",
      status: "in-progress",
      deadline: "15/12/2023",
      location: "Abidjan, Côte d'Ivoire",
      estimatedBudget: "1,500,000 €",
      progress: 33,
      lots: [
        { id: "1-1", name: "Gros Œuvre", status: "assigned", quotesReceived: 6, budget: "450,000 €" },
        { id: "1-2", name: "Électricité", status: "in-progress", quotesReceived: 4, budget: "180,000 €" },
        { id: "1-3", name: "Plomberie", status: "pending", quotesReceived: 2, budget: "120,000 €" },
      ]
    },
    {
      id: "2",
      name: "Résidence Les Magnolias",
      type: "conception",
      status: "in-progress",
      deadline: "10/01/2024",
      location: "Lyon, France",
      estimatedBudget: "800,000 €",
      progress: 66,
      lots: [
        { id: "2-1", name: "Architecture", status: "assigned", quotesReceived: 5, budget: "250,000 €" },
        { id: "2-2", name: "Structure", status: "assigned", quotesReceived: 3, budget: "200,000 €" },
        { id: "2-3", name: "Aménagement Paysager", status: "pending", quotesReceived: 1, budget: "50,000 €" },
      ]
    },
    {
      id: "3",
      name: "Tour Horizon",
      type: "realisation",
      status: "assigned",
      deadline: "05/02/2024",
      location: "Paris, France",
      estimatedBudget: "3,200,000 €",
      progress: 100,
      lots: [
        { id: "3-1", name: "Structure", status: "assigned", quotesReceived: 7, budget: "1,200,000 €" },
        { id: "3-2", name: "Façade", status: "assigned", quotesReceived: 5, budget: "800,000 €" },
        { id: "3-3", name: "CVC", status: "assigned", quotesReceived: 4, budget: "450,000 €" },
        { id: "3-4", name: "Ascenseurs", status: "assigned", quotesReceived: 3, budget: "350,000 €" },
      ]
    }
  ]);

  // Helper function to get project type label
  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case 'conception': return 'Conception';
      case 'realisation': return 'Réalisation';
      case 'services': return 'Services';
      default: return type;
    }
  };

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-blue-500">En cours</Badge>;
      case 'closed':
        return <Badge className="bg-red-500">Clôturé</Badge>;
      case 'assigned':
        return <Badge className="bg-green-600">Attribué</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  // Helper function to get lot status badge
  const getLotStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">En attente</Badge>;
      case 'assigned':
        return <Badge variant="outline" className="text-green-600 border-green-600">Attribué</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">En cours</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-purple-500 border-purple-500">Terminé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projets</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau projet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Projets en cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {projects.filter(p => p.status === 'in-progress').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Projets attribués</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {projects.filter(p => p.status === 'assigned').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Lots attribués</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {projects.reduce((total, project) => 
                  total + project.lots.filter(lot => lot.status === 'assigned').length, 0
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un projet..."
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type de projet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="conception">Conception</SelectItem>
                  <SelectItem value="realisation">Réalisation</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="assigned">Attribué</SelectItem>
                  <SelectItem value="closed">Clôturé</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="cards">
            <TabsList>
              <TabsTrigger value="cards">Cartes</TabsTrigger>
              <TabsTrigger value="table">Tableau</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cards" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{project.name}</h3>
                      {getStatusBadge(project.status)}
                    </div>
                    
                    <div className="flex gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center">
                        <Building className="mr-1 h-4 w-4" />
                        {getProjectTypeLabel(project.type)}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {project.location}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Échéance: {project.deadline}</span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Avancement</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">Lots ({project.lots.length})</div>
                      <div className="space-y-2">
                        {project.lots.map((lot) => (
                          <div key={lot.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                            <span className="text-sm">{lot.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{lot.quotesReceived} devis</span>
                              {getLotStatusBadge(lot.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Budget:</span> {project.estimatedBudget}
                      </div>
                      <Link to={`/project/${project.id}`} className="flex items-center text-primary text-sm hover:underline">
                        Détails
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="table" className="mt-4">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">
                        <div className="flex items-center gap-1 cursor-pointer">
                          Projet <ArrowUpDown size={14} />
                        </div>
                      </TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead>Lots</TableHead>
                      <TableHead>Avancement</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{getProjectTypeLabel(project.type)}</TableCell>
                        <TableCell>{getStatusBadge(project.status)}</TableCell>
                        <TableCell>{project.deadline}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{project.lots.length} lots</span>
                            <span className="text-xs text-muted-foreground">
                              {project.lots.filter(l => l.status === 'assigned').length} attribués
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-24">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="sr-only">Avancement</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{project.estimatedBudget}</TableCell>
                        <TableCell className="text-right">
                          <Link to={`/project/${project.id}`} className="text-primary text-sm hover:underline">
                            Détails
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </Layout>
  );
}
