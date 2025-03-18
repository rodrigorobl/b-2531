
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface ProjectData {
  description: string;
  projectType: string;
  surface: string;
  budget: string;
  deadline: string;
  clientName: string;
  [key: string]: any;
}

interface ProjectOverviewProps {
  projectData: ProjectData;
}

export default function ProjectOverview({ projectData }: ProjectOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Description du projet</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{projectData.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Type de projet</h3>
              <p className="mt-1 font-medium">{projectData.projectType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Surface</h3>
              <p className="mt-1 font-medium">{projectData.surface}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Budget estimé</h3>
              <p className="mt-1 font-medium">{projectData.budget}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Date limite</h3>
              <p className="mt-1 font-medium">{projectData.deadline}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maître d'ouvrage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="bg-muted h-16 w-16 rounded-lg flex items-center justify-center">
              <Building size={24} className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">{projectData.clientName}</h3>
              <p className="text-sm text-muted-foreground">Promoteur immobilier</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Contact principal</h3>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                JD
              </div>
              <div>
                <p className="text-sm font-medium">Jean Dupont</p>
                <p className="text-xs text-muted-foreground">Directeur de projets</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full">
              <MessageSquare size={14} className="mr-2" />
              Contacter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
