
import React from 'react';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Bell, CheckCircle2, Calendar, Factory } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DashboardKPI from '@/components/DashboardKPI';
import ProjectsList from '@/components/ProjectsList';
import TenderOffersList from '@/components/TenderOffersList';
import ActivityFeed from '@/components/ActivityFeed';
import PriorityActions from '@/components/PriorityActions';
import Sidebar from '@/components/Sidebar';

export default function DashboardIndustry() {
  // Sample data for KPI cards specific to Industry
  const kpiData = {
    activeProjects: 5,
    openTenders: 8,
    pendingOrders: 12,
    productsDelivered: 24
  };

  // Sample projects data for Industry
  const projects = [
    {
      id: 'project-001',
      name: 'Fourniture panneaux isolants',
      client: 'VINCI',
      type: 'Tertiaire',
      status: 'in-progress' as const,
      progress: 70,
      deadline: '20/06/2024'
    },
    {
      id: 'project-002',
      name: 'Menuiseries extérieures',
      client: 'NEXITY',
      type: 'Logement',
      status: 'assigned' as const,
      progress: 30,
      deadline: '15/08/2024'
    },
    {
      id: 'project-003',
      name: 'Infrastructures métalliques',
      client: 'LOGIDEX',
      type: 'Industriel',
      status: 'in-progress' as const,
      progress: 55,
      deadline: '10/07/2024'
    }
  ];

  // Sample tender offers data for Industry
  const tenderOffers = [
    {
      id: 'tender-001',
      title: 'Lot 9 - Menuiseries extérieures',
      project: 'Résidence Les Cerisiers',
      status: 'open' as const,
      deadline: '15/05/2024',
      estimatedValue: '180 000 €'
    },
    {
      id: 'tender-002',
      title: 'Lot 6 - Panneaux isolants',
      project: 'Centre commercial Grand Place',
      status: 'open' as const,
      deadline: '20/05/2024',
      estimatedValue: '130 000 €'
    },
    {
      id: 'tender-003',
      title: 'Lot 10 - Structures métalliques',
      project: 'Entrepôt Logistique',
      status: 'open' as const,
      deadline: '25/05/2024',
      estimatedValue: '220 000 €'
    }
  ];

  // Sample priority actions for Industry
  const priorityActions = [
    {
      id: 'action-001',
      title: 'Soumettre offre Menuiseries',
      project: 'Résidence Les Cerisiers',
      deadline: '15/05/2024',
      type: 'quote' as const
    },
    {
      id: 'action-002',
      title: 'Planifier production',
      project: 'VINCI',
      deadline: '12/05/2024',
      type: 'planning' as const
    },
    {
      id: 'action-003',
      title: 'Livraison panneaux',
      project: 'Centre commercial',
      deadline: '18/05/2024',
      type: 'delivery' as const
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Bonjour, Philippe</h1>
            <Button variant="outline" size="sm" asChild>
              <Link to="/tender-search">
                <FileText className="mr-2 h-4 w-4" />
                Rechercher des AO
              </Link>
            </Button>
          </div>
          <p className="text-muted-foreground">
            Voici un aperçu de vos fournitures industrielles en cours et des appels d'offres disponibles.
          </p>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <DashboardKPI title="Projets actifs" value={kpiData.activeProjects} icon={<Factory />} color="bg-primary/10 text-primary" linkTo="/projects" />
            <DashboardKPI title="Appels d'offres" value={kpiData.openTenders} icon={<FileText />} color="bg-status-pending/10 text-status-pending" linkTo="/tender-search" />
            <DashboardKPI title="Commandes en cours" value={kpiData.pendingOrders} icon={<CheckCircle2 />} color="bg-status-assigned/10 text-status-assigned" linkTo="/orders" />
            <DashboardKPI title="Produits livrés" value={kpiData.productsDelivered} icon={<Bell />} color="bg-status-in-progress/10 text-status-in-progress" linkTo="/deliveries" />
          </div>
        </header>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Projects */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Mes contrats de fourniture</h2>
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
                    description: 'Lot Menuiseries sur Résidence Les Cerisiers',
                    timestamp: 'Il y a 3 heures',
                    type: 'tender' as const
                  },
                  {
                    id: 'activity-002',
                    title: 'Commande confirmée',
                    description: 'Commande panneaux isolants pour VINCI validée',
                    timestamp: 'Hier, 16:30',
                    type: 'order' as const
                  },
                  {
                    id: 'activity-003',
                    title: 'Livraison effectuée',
                    description: 'Structures métalliques livrées à LOGIDEX',
                    timestamp: 'Hier, 09:45',
                    type: 'delivery' as const
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
