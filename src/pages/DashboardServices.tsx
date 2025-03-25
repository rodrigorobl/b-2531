import React from 'react';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Bell, CheckCircle2, Calendar, Wrench, MapPin } from 'lucide-react';
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
    activeServices: 12,
    pendingQuotes: 8,
    scheduledInterventions: 15,
    completedServices: 24
  };

  // Sample projects data for Services
  const projects = [
    {
      id: 'project-001',
      name: 'Maintenance CVC - Tour Horizon',
      client: 'VINCI Facilities',
      type: 'Maintenance',
      status: 'in-progress' as const,
      progress: 35,
      deadline: '30/06/2024'
    },
    {
      id: 'project-002',
      name: 'Nettoyage chantier - Résidence Bellevue',
      client: 'NEXITY',
      type: 'Nettoyage',
      status: 'assigned' as const,
      progress: 0,
      deadline: '15/05/2024'
    },
    {
      id: 'project-003',
      name: 'Entretien espaces verts - Campus Tech',
      client: 'TechCampus SAS',
      type: 'Espaces verts',
      status: 'in-progress' as const,
      progress: 70,
      deadline: 'Contrat annuel'
    }
  ];

  // Sample tender offers data for Services
  const tenderOffers = [
    {
      id: 'tender-001',
      title: 'Maintenance ascenseurs',
      project: 'Immeuble Le Cristal',
      status: 'open' as const,
      deadline: '20/05/2024',
      estimatedValue: '18 000 €/an'
    },
    {
      id: 'tender-002',
      title: 'Nettoyage fin de chantier',
      project: 'Centre commercial Grand Place',
      status: 'open' as const,
      deadline: '01/06/2024',
      estimatedValue: '12 500 €'
    },
    {
      id: 'tender-003',
      title: 'Entretien CVC',
      project: 'Hôtel Mercure Centre',
      status: 'open' as const,
      deadline: '15/05/2024',
      estimatedValue: '24 000 €/an'
    }
  ];

  // Sample priority actions for Services
  const priorityActions = [
    {
      id: 'action-001',
      title: 'Soumettre devis maintenance',
      project: 'Immeuble Le Cristal',
      deadline: '18/05/2024',
      type: 'quote' as const
    },
    {
      id: 'action-002',
      title: 'Planifier intervention',
      project: 'Tour Horizon',
      deadline: '12/05/2024',
      type: 'planning' as const
    },
    {
      id: 'action-003',
      title: 'Rapport d\'intervention',
      project: 'Campus Tech',
      deadline: '10/05/2024',
      type: 'document' as const
    }
  ];

  // Sample activity feed data for Services
  const activities = [
    {
      id: 'activity-001',
      title: 'Nouvelle demande de devis',
      description: 'Maintenance CVC pour Hôtel Mercure Centre',
      timestamp: 'Il y a 3 heures',
      type: 'quote' as const,
      link: '/services-quote/quote-001'
    },
    {
      id: 'activity-002',
      title: 'Intervention planifiée',
      description: 'Maintenance ascenseurs Tour Horizon le 15/05',
      timestamp: 'Hier, 16:30',
      type: 'planning' as const,
      link: '/interventions/int-002'
    },
    {
      id: 'activity-003',
      title: 'Rapport validé',
      description: 'Rapport d\'entretien Campus Tech accepté',
      timestamp: 'Hier, 11:45',
      type: 'document' as const,
      link: '/reports/rep-003'
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
              <Link to="/construction-sites-map">
                <MapPin className="mr-2 h-4 w-4" />
                Carte des chantiers
              </Link>
            </Button>
          </div>
          <p className="text-muted-foreground">
            Voici un aperçu de vos services en cours et des opportunités disponibles.
          </p>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <DashboardKPI title="Services actifs" value={kpiData.activeServices} icon={<Wrench />} color="bg-primary/10 text-primary" linkTo="/services" />
            <DashboardKPI title="Devis en attente" value={kpiData.pendingQuotes} icon={<FileText />} color="bg-status-pending/10 text-status-pending" linkTo="/services-quote-management" />
            <DashboardKPI title="Interventions planifiées" value={kpiData.scheduledInterventions} icon={<Calendar />} color="bg-status-assigned/10 text-status-assigned" linkTo="/interventions" />
            <DashboardKPI title="Services complétés" value={kpiData.completedServices} icon={<CheckCircle2 />} color="bg-status-in-progress/10 text-status-in-progress" linkTo="/services?filter=completed" />
          </div>
        </header>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Projects */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Mes Services</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/services">Voir tous</Link>
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
                <h2 className="text-lg font-semibold">Opportunités de services</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/services-tender-search">Voir toutes</Link>
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
