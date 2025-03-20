import React from 'react';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Bell, CheckCircle2, Calendar, Hammer, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DashboardKPI from '@/components/DashboardKPI';
import ProjectsList from '@/components/ProjectsList';
import TenderOffersList from '@/components/TenderOffersList';
import ActivityFeed from '@/components/ActivityFeed';
import PriorityActions from '@/components/PriorityActions';
import Sidebar from '@/components/Sidebar';

export default function DashboardConstruction() {
  // Sample data for KPI cards specific to Construction
  const kpiData = {
    projectsInProgress: 6,
    openTenders: 14,
    submittedOffers: 8,
    acceptedOffers: 3
  };

  // Sample projects data for Construction
  const projects = [
    {
      id: 'project-001',
      name: 'Résidence Les Ormes - Gros Œuvre',
      client: 'NEXITY',
      type: 'Logement',
      status: 'in-progress' as const,
      progress: 45,
      deadline: '15/07/2024'
    },
    {
      id: 'project-002',
      name: 'École Saint-Pierre - Charpente',
      client: 'Mairie de Lyon',
      type: 'Public',
      status: 'assigned' as const,
      progress: 10,
      deadline: '01/08/2024'
    },
    {
      id: 'project-003',
      name: 'Entrepôt Logistique - Fondations',
      client: 'LOGIDEX',
      type: 'Industriel',
      status: 'completed' as const,
      progress: 100,
      deadline: '10/04/2024'
    }
  ];

  // Sample tender offers data for Construction
  const tenderOffers = [
    {
      id: 'tender-001',
      title: 'Lot 3 - Charpente métallique',
      project: 'Centre commercial Grand Place',
      status: 'open' as const,
      deadline: '15/05/2024',
      estimatedValue: '120 000 €'
    },
    {
      id: 'tender-002',
      title: 'Lot 2 - Gros œuvre',
      project: 'Résidence Les Cerisiers',
      status: 'open' as const,
      deadline: '20/05/2024',
      estimatedValue: '250 000 €'
    },
    {
      id: 'tender-003',
      title: 'Lot 4 - Terrassement',
      project: 'Éco-quartier Les Saules',
      status: 'open' as const,
      deadline: '25/05/2024',
      estimatedValue: '80 000 €'
    }
  ];

  // Sample priority actions for Construction
  const priorityActions = [
    {
      id: 'action-001',
      title: 'Soumettre devis Charpente',
      project: 'Centre commercial Grand Place',
      deadline: '15/05/2024',
      type: 'quote' as const
    },
    {
      id: 'action-002',
      title: 'Commander matériaux',
      project: 'Résidence Les Ormes',
      deadline: '12/05/2024',
      type: 'purchase' as const
    },
    {
      id: 'action-003',
      title: 'Planifier équipe',
      project: 'École Saint-Pierre',
      deadline: '18/05/2024',
      type: 'planning' as const
    }
  ];

  // Sample activity feed data with updated item and links
  const activities = [
    {
      id: 'activity-001',
      title: 'Nouvel appel d\'offres',
      description: 'Lot Charpente sur Résidence Les Cerisiers',
      timestamp: 'Il y a 1 heure',
      type: 'tender' as const,
      link: '/tender-specifications?project=tender-001'
    },
    {
      id: 'activity-002',
      title: 'Offre acceptée',
      description: 'Votre devis pour École Saint-Pierre a été retenu',
      timestamp: 'Hier, 14:30',
      type: 'quote' as const,
      link: '/tender-specifications?project=tender-002'
    },
    {
      id: 'activity-003',
      title: 'Offre classé non conforme',
      description: 'Devis rejeté pour Entrepôt Logistique',
      timestamp: 'Hier, 10:15',
      type: 'document' as const,
      link: '/tender-specifications?project=tender-003'
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Bonjour, Thomas</h1>
            <Button variant="outline" size="sm" asChild>
              <Link to="/tender-search">
                <FileText className="mr-2 h-4 w-4" />
                Rechercher des AO
              </Link>
            </Button>
          </div>
          <p className="text-muted-foreground">
            Voici un aperçu de vos chantiers en cours et des appels d'offres disponibles.
          </p>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <DashboardKPI title="Chantiers en cours" value={kpiData.projectsInProgress} icon={<Hammer />} color="bg-primary/10 text-primary" linkTo="/projects" />
            <DashboardKPI title="Appels d'offres" value={kpiData.openTenders} icon={<FileText />} color="bg-status-pending/10 text-status-pending" linkTo="/tender-search" />
            <DashboardKPI title="Offres soumises" value={kpiData.submittedOffers} icon={<CheckCircle2 />} color="bg-status-assigned/10 text-status-assigned" linkTo="/tenders?filter=submitted" />
            <DashboardKPI title="Offres acceptées" value={kpiData.acceptedOffers} icon={<Bell />} color="bg-status-in-progress/10 text-status-in-progress" linkTo="/tenders?filter=accepted" />
          </div>
        </header>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Projects */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Mes Appels d'Offres</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/projects">Voir tous</Link>
                </Button>
              </div>
              <div className="p-4">
                <ProjectsList projects={projects} />
              </div>
            </div>
          </div>
          
          {/* Middle Column - Tenders */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Appels d'offres récents</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/tender-search">Voir tous</Link>
                </Button>
              </div>
              <div className="p-4">
                <TenderOffersList tenderOffers={tenderOffers} />
              </div>
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Actions prioritaires</h2>
              </div>
              <div className="p-4">
                <PriorityActions actions={priorityActions} />
              </div>
            </div>
          </div>
          
          {/* Right Column - Activity Feed */}
          <div className="lg:col-span-4 space-y-6">
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
