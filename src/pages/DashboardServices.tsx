import React from 'react';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Bell, CheckCircle2, Calendar, Wrench, MapPin, Clock, Building, Truck, LampFloor, Droplet, Scale, Trash2, Flame, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DashboardKPI from '@/components/DashboardKPI';
import ProjectsList from '@/components/ProjectsList';
import TenderOffersList from '@/components/TenderOffersList';
import ActivityFeed from '@/components/ActivityFeed';
import PriorityActions from '@/components/PriorityActions';
import Sidebar from '@/components/Sidebar';
import { Badge } from '@/components/ui/badge';
import { QuoteStatusBadge } from '@/components/quotes/QuoteStatusBadge';

export default function DashboardServices() {
  // Sample data for KPI cards specific to Services
  const kpiData = {
    activeContracts: 9,
    openTenders: 11,
    pendingQuotes: 6,
    unreadMessages: 4
  };

  // Projets en cours liés aux services spécifiés
  const projects = [
    {
      id: 'project-001',
      name: 'Tour Eiffel - Location de grues mobiles',
      client: 'VINCI',
      type: 'Tertiaire',
      status: 'in-progress' as const,
      progress: 40,
      deadline: '30/07/2024'
    },
    {
      id: 'project-002',
      name: 'Siège Social Michelin - Éclairage temporaire',
      client: 'BOUYGUES',
      type: 'Tertiaire',
      status: 'assigned' as const,
      progress: 15,
      deadline: '15/08/2024'
    },
    {
      id: 'project-003',
      name: 'Hôpital Saint-Louis - Équipements premiers secours',
      client: 'Mairie de Paris',
      type: 'Public',
      status: 'in-progress' as const,
      progress: 60,
      deadline: '05/06/2024'
    }
  ];

  // Appels d'offres liés aux services spécifiés
  const tenderOffers = [
    {
      id: 'tender-001',
      title: 'Location de réservoirs d\'eau temporaire',
      project: 'Éco-quartier Confluence',
      status: 'open' as const,
      deadline: '15/05/2024',
      estimatedValue: '75 000 €'
    },
    {
      id: 'tender-002',
      title: 'Service de déménagement bureaux temporaires',
      project: 'Tour Alto La Défense',
      status: 'open' as const,
      deadline: '20/05/2024',
      estimatedValue: '45 000 €'
    },
    {
      id: 'tender-003',
      title: 'Location d\'équipements contrôle qualité air',
      project: 'Métro Grand Paris Express',
      status: 'open' as const,
      deadline: '25/05/2024',
      estimatedValue: '110 000 €'
    }
  ];

  // Actions prioritaires liées aux services spécifiés
  const priorityActions = [
    {
      id: 'action-001',
      title: 'Soumettre devis Grues Mobiles',
      project: 'Stade de France',
      deadline: '15/05/2024',
      type: 'quote' as const
    },
    {
      id: 'action-002',
      title: 'Commander matériel soudage',
      project: 'Centrale Nucléaire',
      deadline: '12/05/2024',
      type: 'purchase' as const
    },
    {
      id: 'action-003',
      title: 'Intervention nettoyage urbain',
      project: 'Quartier La Part-Dieu',
      deadline: '10/05/2024',
      type: 'service' as const
    }
  ];

  // Devis en attente liés aux services spécifiés
  const pendingQuotes = [
    {
      id: 'quote-001',
      projectName: 'Consultation juridique - Chantier Médipôle',
      lot: 'Services juridiques',
      amount: '12 800 €',
      status: 'in-progress' as const,
      urgency: 'high' as const,
      date: '05/05/2024',
      dueDate: '15/05/2024'
    },
    {
      id: 'quote-002',
      projectName: 'Location grues mobiles - Tour Trinity',
      lot: 'Équipements lourds',
      amount: '85 500 €',
      status: 'to-analyze' as const,
      urgency: 'medium' as const,
      date: '08/05/2024',
      dueDate: '20/05/2024'
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
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/tender-search">
                  <FileText className="mr-2 h-4 w-4" />
                  Rechercher des AO
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/construction-sites-map">
                  <MapPin className="mr-2 h-4 w-4" />
                  Carte des Chantiers
                </Link>
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Voici un aperçu de vos contrats de services en cours et des appels d'offres disponibles.
          </p>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <DashboardKPI title="Contrats actifs" value={kpiData.activeContracts} icon={<Briefcase />} color="bg-primary/10 text-primary" linkTo="/projects" />
            <DashboardKPI title="Appels d'offres" value={kpiData.openTenders} icon={<FileText />} color="bg-status-pending/10 text-status-pending" linkTo="/tender-search" />
            <DashboardKPI title="Devis en attente" value={kpiData.pendingQuotes} icon={<CheckCircle2 />} color="bg-status-assigned/10 text-status-assigned" linkTo="/quotes-to-analyze" />
            <DashboardKPI title="Messages non lus" value={kpiData.unreadMessages} icon={<MessageSquare />} color="bg-status-in-progress/10 text-status-in-progress" linkTo="/messaging?filter=unread" />
          </div>
        </header>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Projects and Quotes */}
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
            
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Devis en attente</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/quotes-to-analyze">Voir tous</Link>
                </Button>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {pendingQuotes.map((quote) => (
                    <div key={quote.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium line-clamp-1">{quote.projectName}</h3>
                          <p className="text-sm text-muted-foreground">Lot: {quote.lot}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <QuoteStatusBadge status={quote.status} />
                          <span className="text-sm font-medium">{quote.amount}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Échéance: {quote.dueDate}</span>
                        </div>
                        <Link to={`/quote-detail/${quote.id}`} className="text-primary text-sm flex items-center hover:underline">
                          <span>Détails</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
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
          
          {/* Right Column - Activity Feed and Quick Actions */}
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
                    description: 'Location d\'équipements contrôle qualité air',
                    timestamp: 'Il y a 2 heures',
                    type: 'tender' as const
                  },
                  {
                    id: 'activity-002',
                    title: 'Nouveau message',
                    description: 'Question technique sur fourniture d\'éclairage',
                    timestamp: 'Il y a 5 heures',
                    type: 'message' as const
                  },
                  {
                    id: 'activity-003',
                    title: 'Contrat signé',
                    description: 'Service juridique pour Consortium BTP',
                    timestamp: 'Hier, 14:30',
                    type: 'document' as const
                  }
                ]} />
              </div>
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Accès rapide</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button className="justify-start" asChild>
                    <Link to="/submit-quote">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Répondre aux appels d'offres
                    </Link>
                  </Button>
                  <Button className="justify-start" asChild>
                    <Link to="/projects">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Voir les projets en cours
                    </Link>
                  </Button>
                  <Button className="justify-start" asChild>
                    <Link to="/quotes-to-analyze">
                      <FileText className="mr-2 h-4 w-4" />
                      Consulter les devis en attente
                    </Link>
                  </Button>
                  <Button className="justify-start" asChild>
                    <Link to="/construction-sites-map">
                      <MapPin className="mr-2 h-4 w-4" />
                      Carte des chantiers
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
