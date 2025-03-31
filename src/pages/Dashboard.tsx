import React from 'react';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Bell, CheckCircle2, Calendar, MailOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StatusBadge from '@/components/StatusBadge';
import DashboardKPI from '@/components/DashboardKPI';
import ProjectsList from '@/components/ProjectsList';
import TenderOffersList from '@/components/TenderOffersList';
import ActivityFeed from '@/components/ActivityFeed';
import PriorityActions from '@/components/PriorityActions';
import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  // Sample data for KPI cards
  const kpiData = {
    projectsInProgress: 8,
    openTenders: 12,
    pendingOffers: 5,
    unreadMessages: 7
  };

  // Sample projects data
  const projects = [{
    id: 'project-001',
    name: 'Résidence Les Ormes',
    client: 'NEXITY',
    type: 'Logement',
    status: 'in-progress' as const,
    progress: 65,
    deadline: '30/06/2024'
  }, {
    id: 'project-002',
    name: 'Centre commercial Grand Place',
    client: 'VINCI',
    type: 'Tertiaire',
    status: 'assigned' as const,
    progress: 25,
    deadline: '15/09/2024'
  }, {
    id: 'project-003',
    name: 'École Saint-Pierre',
    client: 'Mairie de Lyon',
    type: 'Public',
    status: 'completed' as const,
    progress: 100,
    deadline: '01/03/2024'
  }, {
    id: 'project-004',
    name: 'Entrepôt Logistique Nord',
    client: 'LOGIDEX',
    type: 'Industriel',
    status: 'in-progress' as const,
    progress: 30,
    deadline: '10/12/2024'
  }];

  // Sample tender offers data
  const tenderOffers = [{
    id: 'tender-001',
    title: 'Lot 3 - Charpente métallique',
    project: 'Résidence Les Ormes',
    status: 'open' as const,
    deadline: '15/05/2024',
    estimatedValue: '120 000 €',
    tenderType: 'open' as const
  }, {
    id: 'tender-002',
    title: 'Lot 5 - Électricité',
    project: 'Centre commercial Grand Place',
    status: 'open' as const,
    deadline: '20/05/2024',
    estimatedValue: '95 000 €',
    tenderType: 'open' as const
  }, {
    id: 'tender-003',
    title: 'Lot 2 - Gros œuvre',
    project: 'École Saint-Pierre',
    status: 'closed' as const,
    deadline: '01/03/2024',
    estimatedValue: '250 000 €',
    tenderType: 'restricted' as const,
    accessStatus: 'approved' as const
  }];

  // Sample priority actions
  const priorityActions = [{
    id: 'action-001',
    title: 'Soumettre devis Lot Électricité',
    project: 'Résidence Les Ormes',
    deadline: '15/05/2024',
    type: 'quote' as const
  }, {
    id: 'action-002',
    title: 'Télécharger CCTP mis à jour',
    project: 'Centre commercial Grand Place',
    deadline: '12/05/2024',
    type: 'document' as const
  }, {
    id: 'action-003',
    title: 'Répondre message Maître d\'œuvre',
    project: 'École Saint-Pierre',
    deadline: '10/05/2024',
    type: 'message' as const
  }];

  // Sample activity feed
  const activities = [{
    id: 'activity-001',
    title: 'Nouvel appel d\'offres publié',
    description: 'Lot 7 - Menuiseries intérieures sur Centre commercial Grand Place',
    timestamp: 'Il y a 2 heures',
    type: 'tender' as const
  }, {
    id: 'activity-002',
    title: 'Nouveau message',
    description: 'Question technique sur devis Lot Électricité',
    timestamp: 'Il y a 5 heures',
    type: 'message' as const
  }, {
    id: 'activity-003',
    title: 'Statut projet modifié',
    description: 'École Saint-Pierre est maintenant marqué comme terminé',
    timestamp: 'Hier, 14:30',
    type: 'status' as const
  }, {
    id: 'activity-004',
    title: 'Document ajouté',
    description: 'Nouveau plan d\'exécution pour Résidence Les Ormes',
    timestamp: 'Hier, 10:15',
    type: 'document' as const
  }];
  return <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Bonjour, Martin</h1>
            <Button variant="outline" size="sm" asChild>
              
            </Button>
          </div>
          <p className="text-muted-foreground">
            Voici un aperçu de vos projets et appels d'offres en cours.
          </p>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <DashboardKPI title="Projets en cours" value={kpiData.projectsInProgress} icon={<Briefcase />} color="bg-primary/10 text-primary" linkTo="/projects" />
            <DashboardKPI title="Appels d'offres ouverts" value={kpiData.openTenders} icon={<FileText />} color="bg-status-pending/10 text-status-pending" linkTo="/tenders" />
            <DashboardKPI title="Offres en attente" value={kpiData.pendingOffers} icon={<CheckCircle2 />} color="bg-status-assigned/10 text-status-assigned" linkTo="/tenders" />
            <DashboardKPI title="Messages non lus" value={kpiData.unreadMessages} icon={<MessageSquare />} color="bg-status-in-progress/10 text-status-in-progress" linkTo="/messaging?filter=unread" />
          </div>
        </header>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Projects */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Mes projets</h2>
              </div>
              <div className="p-4">
                <ProjectsList projects={projects} />
              </div>
            </div>
          </div>
          
          {/* Middle Column - Tenders and Priority Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Appels d'offres</h2>
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
    </div>;
}
