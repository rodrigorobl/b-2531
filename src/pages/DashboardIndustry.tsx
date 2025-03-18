
import React from 'react';
import { Layout } from '@/components/Layout';
import ProjectOverview from '@/components/industry-dashboard/ProjectOverview';
import DesignPhaseProjects from '@/components/industry-dashboard/DesignPhaseProjects';
import ConstructionPhaseProjects from '@/components/industry-dashboard/ConstructionPhaseProjects';
import OpportunitiesOverview from '@/components/industry-dashboard/OpportunitiesOverview';

// Mock data for demonstration
const projects = [
  {
    id: "1",
    name: "Résidence Les Cerisiers",
    location: "Lyon",
    client: "VINCI Immobilier",
    progress: 30,
    phase: 'conception' as const
  },
  {
    id: "2",
    name: "Campus numérique",
    location: "Paris",
    client: "Bouygues Construction",
    progress: 70,
    phase: 'realisation' as const
  }
];

const references = [
  {
    id: "ref1",
    projectName: "Résidence Les Cerisiers",
    productName: "Panneaux isolants A+",
    status: 'en-cours' as const,
    betName: "BET Thermique SA",
    updatedAt: "15/03/2024"
  }
];

const quotes = [
  {
    id: "quote1",
    projectName: "Campus numérique",
    lot: "Lot 12 - Isolation",
    contractor: "ISO PLUS",
    status: 'pending' as const,
    amount: "45 000 €",
    updatedAt: "18/03/2024"
  }
];

const opportunities = [
  {
    id: "opp1",
    type: 'reference' as const,
    projectName: "Résidence Les Cerisiers",
    description: "Opportunité de référencement pour panneaux isolants",
    createdAt: "Il y a 2 jours",
    isNew: true
  },
  {
    id: "opp2",
    type: 'quote' as const,
    projectName: "Campus numérique",
    description: "Demande de devis pour isolation thermique",
    createdAt: "Il y a 1 semaine",
    isNew: false
  }
];

export default function DashboardIndustry() {
  return (
    <Layout>
      <div className="container p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2">Tableau de bord Industriel</h1>
          <p className="text-muted-foreground">
            Suivez vos projets et opportunités de référencement
          </p>
        </header>

        <div className="space-y-6">
          <ProjectOverview projects={projects} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <DesignPhaseProjects references={references} />
              <ConstructionPhaseProjects quotes={quotes} />
            </div>
            <OpportunitiesOverview opportunities={opportunities} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
