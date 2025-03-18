import React from 'react';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Bell, CheckCircle2, Calendar, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import DashboardKPI from '@/components/DashboardKPI';
import ProjectsList from '@/components/ProjectsList';
import ActivityFeed from '@/components/ActivityFeed';
import PriorityActions from '@/components/PriorityActions';
import Sidebar from '@/components/Sidebar';
export default function DashboardPromoteur() {
  const navigate = useNavigate();

  // Sample data for KPI cards specific to Promoteur
  const kpiData = {
    projectsInProgress: 15,
    designTenders: 4,
    constructionTenders: 8,
    newOffers: 12
  };

  // Sample projects data for Promoteur
  const projects = [{
    id: 'project-001',
    name: 'Résidence Les Cerisiers',
    client: 'SCI Immobilier',
    type: 'Résidentiel',
    status: 'in-progress' as const,
    progress: 45,
    deadline: '15/10/2024'
  }, {
    id: 'project-002',
    name: 'Centre commercial Beau Rivage',
    client: 'Promoteur Commercial SA',
    type: 'Commercial',
    status: 'assigned' as const,
    progress: 20,
    deadline: '22/12/2024'
  }, {
    id: 'project-003',
    name: 'Éco-quartier Les Saules',
    client: 'Mairie de Nantes',
    type: 'Résidentiel',
    status: 'in-progress' as const,
    progress: 70,
    deadline: '05/08/2024'
  }];

  // Sample priority actions for Promoteur
  const priorityActions = [{
    id: 'action-001',
    title: 'Approuver devis Gros Œuvre',
    project: 'Résidence Les Cerisiers',
    deadline: '18/05/2024',
    type: 'quote' as const
  }, {
    id: 'action-002',
    title: 'Sélectionner entreprises Lot Plomberie',
    project: 'Centre commercial Beau Rivage',
    deadline: '20/05/2024',
    type: 'tender' as const
  }, {
    id: 'action-003',
    title: 'Réunion maîtrise d\'œuvre',
    project: 'Éco-quartier Les Saules',
    deadline: '25/05/2024',
    type: 'meeting' as const
  }];

  // Sample activity feed for Promoteur
  const activities = [{
    id: 'activity-001',
    title: 'Nouveau devis reçu',
    description: 'BTP Construction a soumis une offre pour Lot Gros Œuvre',
    timestamp: 'Il y a 2 heures',
    type: 'quote' as const
  }, {
    id: 'activity-002',
    title: 'Mise à jour planning',
    description: 'Maître d\'œuvre a actualisé le planning de Résidence Les Cerisiers',
    timestamp: 'Hier, 15:30',
    type: 'update' as const
  }, {
    id: 'activity-003',
    title: 'Permis de construire',
    description: 'Permis de construire accepté pour Éco-quartier Les Saules',
    timestamp: 'Hier, 09:45',
    type: 'document' as const
  }];
  return <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Bonjour, Antoine</h1>
            <Button variant="default" size="sm" onClick={() => navigate('/create-tender')} className="whitespace-nowrap">
              <Plus size={16} className="mr-1" />
              Lancer un Appel d'Offres
            </Button>
          </div>
          <p className="text-muted-foreground">
            Voici un aperçu de vos projets immobiliers et appels d'offres en cours.
          </p>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <DashboardKPI title="Projets en cours" value={kpiData.projectsInProgress} icon={<Briefcase />} color="bg-primary/10 text-primary" linkTo="/projects" />
            <DashboardKPI title="AO Conception en cours" value={kpiData.designTenders} icon={<FileText />} color="bg-slate-500/10 text-slate-500" linkTo="/projects?type=conception" />
            <DashboardKPI title="AO Réalisation en cours" value={kpiData.constructionTenders} icon={<Bell />} color="bg-status-pending/10 text-status-pending" linkTo="/projects?type=realisation" />
            <DashboardKPI title="Nouvelles offres reçues" value={kpiData.newOffers} icon={<CheckCircle2 />} color="bg-status-assigned/10 text-status-assigned" linkTo="/quotes-to-analyze" />
          </div>
        </header>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Projects */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Mes projets</h2>
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
    </div>;
}