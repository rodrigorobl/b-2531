
import React from 'react';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Bell, CheckCircle2, Calendar, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DashboardKPI from '@/components/DashboardKPI';
import ProjectsList from '@/components/ProjectsList';
import TenderOffersList from '@/components/TenderOffersList';
import ActivityFeed from '@/components/ActivityFeed';
import PriorityActions from '@/components/PriorityActions';
import Sidebar from '@/components/Sidebar';

export default function DashboardServices() {
  // Sample data for KPI cards specific to Services
  const kpiData = {
    activeContracts: 9,
    openTenders: 11,
    pendingQuotes: 6,
    unreadMessages: 4
  };

  // Sample projects data for Services
  const projects = [
    {
      id: 'project-001',
      name: 'Résidence Les Ormes - Électricité',
      client: 'NEXITY',
      type: 'Logement',
      status: 'in-progress' as const,
      progress: 40,
      deadline: '30/07/2024'
    },
    {
      id: 'project-002',
      name: 'Centre commercial - Climatisation',
      client: 'VINCI',
      type: 'Tertiaire',
      status: 'assigned' as const,
      progress: 15,
      deadline: '15/08/2024'
    },
    {
      id: 'project-003',
      name: 'École Saint-Pierre - Plomberie',
      client: 'Mairie de Lyon',
      type: 'Public',
      status: 'in-progress' as const,
      progress: 60,
      deadline: '05/06/2024'
    }
  ];

  // Sample tender offers data for Services
  const tenderOffers = [
    {
      id: 'tender-001',
      title: 'Lot 5 - Électricité',
      project: 'Résidence Les Cerisiers',
      status: 'open' as const,
      deadline: '15/05/2024',
      estimatedValue: '95 000 €'
    },
    {
      id: 'tender-002',
      title: 'Lot 7 - Plomberie/Sanitaires',
      project: 'Éco-quartier Les Saules',
      status: 'open' as const,
      deadline: '20/05/2024',
      estimatedValue: '75 000 €'
    },
    {
      id: 'tender-003',
      title: 'Lot 8 - Climatisation',
      project: 'Centre commercial Grand Place',
      status: 'open' as const,
      deadline: '25/05/2024',
      estimatedValue: '110 000 €'
    }
  ];

  // Sample priority actions for Services
  const priorityActions = [
    {
      id: 'action-001',
      title: 'Soumettre devis Électricité',
      project: 'Résidence Les Cerisiers',
      deadline: '15/05/2024',
      type: 'quote' as const
    },
    {
      id: 'action-002',
      title: 'Commander matériel plomberie',
      project: 'École Saint-Pierre',
      deadline: '12/05/2024',
      type: 'purchase' as const
    },
    {
      id: 'action-003',
      title: 'Intervention dépannage',
      project: 'Centre commercial',
      deadline: '10/05/2024',
      type: 'service' as const
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Bonjour, Sophie</h1>
            <Button variant="outline" size="sm" asChild>
              <Link to="/tender-search">
                <FileText className="mr-2 h-4 w-4" />
                Rechercher des AO
              </Link>
            </Button>
          </div>
          <p className="text-muted-foreground">
            Voici un aperçu de vos contrats de services en cours et des appels d'offres disponibles.
          </p>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <DashboardKPI title="Contrats actifs" value={kpiData.activeContracts} icon={<Briefcase />} color="bg-primary/10 text-primary" linkTo="/projects" />
            <DashboardKPI title="Appels d'offres" value={kpiData.openTenders} icon={<FileText />} color="bg-status-pending/10 text-status-pending" linkTo="/tender-search" />
            <DashboardKPI title="Devis en attente" value={kpiData.pendingQuotes} icon={<CheckCircle2 />} color="bg-status-assigned/10 text-status-assigned" linkTo="/tenders?filter=pending" />
            <DashboardKPI title="Messages non lus" value={kpiData.unreadMessages} icon={<MessageSquare />} color="bg-status-in-progress/10 text-status-in-progress" linkTo="/messaging?filter=unread" />
          </div>
        </header>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Projects */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Mes contrats</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/projects">Voir tous</Link>
                </Button>
              </div>
              <div className="p-4">
                <ProjectsList projects={projects} />
              </div>
            </div>
          </div>
          
          {/* Middle Column - Tenders and Priority Actions */}
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
                <ActivityFeed activities={[
                  {
                    id: 'activity-001',
                    title: 'Nouvel appel d\'offres',
                    description: 'Lot Électricité sur Résidence Les Cerisiers',
                    timestamp: 'Il y a 2 heures',
                    type: 'tender' as const
                  },
                  {
                    id: 'activity-002',
                    title: 'Nouveau message',
                    description: 'Question technique sur installation électrique',
                    timestamp: 'Il y a 5 heures',
                    type: 'message' as const
                  },
                  {
                    id: 'activity-003',
                    title: 'Contrat signé',
                    description: 'Contrat plomberie pour École Saint-Pierre validé',
                    timestamp: 'Hier, 14:30',
                    type: 'document' as const
                  }
                ]} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
