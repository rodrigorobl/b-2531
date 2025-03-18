
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Clock, Building } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  location: string;
  client: string;
  progress: number;
  phase: 'conception' | 'realisation';
}

interface ProjectOverviewProps {
  projects: Project[];
}

export default function ProjectOverview({ projects }: ProjectOverviewProps) {
  return (
    <Card>
      <Tabs defaultValue="all" className="p-4">
        <TabsList>
          <TabsTrigger value="all">Tous les projets</TabsTrigger>
          <TabsTrigger value="conception">Phase conception</TabsTrigger>
          <TabsTrigger value="realisation">Phase réalisation</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projet</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Maître d'ouvrage</TableHead>
                <TableHead>Avancement</TableHead>
                <TableHead>Phase</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    {project.location}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {project.client}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={project.phase === 'conception' ? 'secondary' : 'default'}>
                      {project.phase === 'conception' ? 'Conception' : 'Réalisation'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
