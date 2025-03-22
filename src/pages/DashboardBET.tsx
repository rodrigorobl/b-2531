
import React from 'react';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Bell, CheckCircle2, DraftingCompass, ClipboardCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DashboardKPI from '@/components/DashboardKPI';
import ProjectsList from '@/components/ProjectsList';
import ActivityFeed from '@/components/ActivityFeed';
import PriorityActions from '@/components/PriorityActions';
import Sidebar from '@/components/Sidebar';

export default function DashboardBET() {
  // Sample data for KPI cards specific to BET/Maître d'œuvre
  const kpiData = {
    projectsManaged: 7,
    activeTenders: 10,
    pendingValidations: 5,
    quotesToAnalyze: 8
  };

  // Sample projects data for BET
  const projects = [
    {
      id: 'project-001',
      name: 'Résidence Les Ormes',
      client: 'NEXITY',
      type: 'Logement',
      status: 'in-progress' as const,
      progress: 65,
      deadline: '30/06/2024'
    },
    {
      id: 'project-002',
      name: 'Centre commercial Grand Place',
      client: 'VINCI',
      type: 'Tertiaire',
      status: 'assigned' as const,
      progress: 25,
      deadline: '15/09/2024'
    },
    {
      id: 'project-003',
      name: 'École Saint-Pierre',
      client: 'Mairie de Lyon',
      type: 'Public',
      status: 'in-progress' as const,
      progress: 70,
      deadline: '01/06/2024'
    }
  ];

  // Sample priority actions for BET
  const priorityActions = [
    {
      id: 'action-001',
      title: 'Finaliser plans Bâtiment B',
      project: 'Résidence Les Ormes',
      deadline: '15/05/2024',
      type: 'document' as const
    },
    {
      id: 'action-002',
      title: 'Analyser offres Lot Électricité',
      project: 'Centre commercial Grand Place',
      deadline: '20/05/2024',
      type: 'tender' as const
    },
    {
      id: 'action-003',
      title: 'Réunion coordination',
      project: 'École Saint-Pierre',
      deadline: '18/05/2024',
      type: 'meeting' as const
    }
  ];

  // Sample activity feed for BET
  const activities = [
    {
      id: 'activity-001',
      title: 'Nouvelle offre',
      description: 'EDF Pro a soumis une offre pour Lot Électricité',
      timestamp: 'Il y a 3 heures',
      type: 'quote' as const
    },
    {
      id: 'activity-002',
      title: 'Modification plans',
      description: 'Plans du rez-de-chaussée pour Résidence Les Ormes mis à jour',
      timestamp: 'Hier, 16:45',
      type: 'document' as const
    },
    {
      id: 'activity-003',
      title: 'Message client',
      description: 'Question technique de NEXITY sur isolation thermique',
      timestamp: 'Hier, 11:20',
      type: 'message' as const
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Bonjour, Marie</h1>
            {/* Calendar button removed as requested */}
          </div>
          <p className="text-muted-foreground">
            Voici un aperçu des projets sur lesquels vous travaillez en tant que maître d'œuvre.
          </p>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <DashboardKPI title="Projets supervisés" value={kpiData.projectsManaged} icon={<DraftingCompass />} color="bg-primary/10 text-primary" linkTo="/projects" />
            <DashboardKPI title="AO en cours" value={kpiData.activeTenders} icon={<FileText />} color="bg-status-pending/10 text-status-pending" linkTo="/tender-list" />
            <DashboardKPI title="Validations en attente" value={kpiData.pendingValidations} icon={<CheckCircle2 />} color="bg-status-assigned/10 text-status-assigned" linkTo="/documents?filter=pending" />
            <DashboardKPI title="Devis à analyser" value={kpiData.quotesToAnalyze} icon={<ClipboardCheck />} color="bg-status-in-progress/10 text-status-in-progress" linkTo="/quotes-to-analyze" />
          </div>
        </header>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Projects */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Projets en maîtrise d'œuvre</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/projects">Voir tous</Link>
                </Button>
              </div>
              <div className="p-4">
                <ProjectsList projects={projects} />
              </div>
            </div>
          </div>
          
          {/* Right Column - Priority Actions and Activity Feed */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Actions prioritaires</h2>
              </div>
              <div className="p-4">
                <PriorityActions actions={priorityActions} />
              </div>
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Activité récente</h2>
              </div>
              <div className="p-4">
                <ActivityFeed activities={activities} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
