
import React from 'react';
import { Layout } from '@/components/Layout';
import ProjectOverview from '@/components/industry-dashboard/ProjectOverview';
import DesignPhaseProjects from '@/components/industry-dashboard/DesignPhaseProjects';
import ConstructionPhaseProjects from '@/components/industry-dashboard/ConstructionPhaseProjects';
import OpportunitiesOverview from '@/components/industry-dashboard/OpportunitiesOverview';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

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
  },
  {
    id: "ref2",
    projectName: "Centre commercial Grand'Place",
    productName: "Système d'isolation phonique",
    status: 'valide' as const,
    betName: "Acoustics Pro SARL",
    updatedAt: "18/03/2024"
  },
  {
    id: "ref3",
    projectName: "Écoquartier Smartcity",
    productName: "Panneaux solaires intégrés",
    status: 'en-cours' as const,
    betName: "Énergie Conseil",
    updatedAt: "21/03/2024"
  },
  {
    id: "ref4",
    projectName: "Tour Horizon",
    productName: "Vitrage haute performance",
    status: 'non-reference' as const,
    betName: "Glass Experts Inc.",
    updatedAt: "23/03/2024"
  },
  {
    id: "ref5",
    projectName: "Médiathèque Municipale",
    productName: "Système d'aération écologique",
    status: 'en-cours' as const,
    betName: "ClimaSys",
    updatedAt: "25/03/2024"
  },
  {
    id: "ref6",
    projectName: "Hôpital Saint-Georges",
    productName: "Matériaux antiseptiques",
    status: 'valide' as const,
    betName: "Santé BTP",
    updatedAt: "27/03/2024"
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
  },
  {
    id: "quote2",
    projectName: "Centre sportif municipal",
    lot: "Lot 05 - Revêtements",
    contractor: "Surface Pro",
    status: 'approved' as const,
    amount: "72 300 €",
    updatedAt: "20/03/2024"
  },
  {
    id: "quote3",
    projectName: "Réhabilitation Gare Centrale",
    lot: "Lot 08 - Étanchéité",
    contractor: "ImperméaBAT",
    status: 'pending' as const,
    amount: "38 600 €",
    updatedAt: "22/03/2024"
  },
  {
    id: "quote4",
    projectName: "Résidence étudiante",
    lot: "Lot 14 - Plomberie",
    contractor: "AquaServices",
    status: 'rejected' as const,
    amount: "26 450 €",
    updatedAt: "24/03/2024"
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

// Nouvelles opportunités
const newOpportunities = [
  {
    id: "new1",
    name: "Complexe sportif olympique",
    phase: "Conception",
    location: "Marseille",
    publishedDate: "05/04/2024",
  },
  {
    id: "new2",
    name: "Éco-quartier Les Lumières",
    phase: "Conception",
    location: "Nantes",
    publishedDate: "03/04/2024",
  },
  {
    id: "new3",
    name: "Tour d'affaires La Défense",
    phase: "Réalisation",
    location: "Paris",
    publishedDate: "02/04/2024",
  },
  {
    id: "new4",
    name: "Centre commercial Grand'Place",
    phase: "Conception",
    location: "Grenoble",
    publishedDate: "01/04/2024",
  }
];

export default function DashboardIndustry() {
  return (
    <Layout>
      <div className="w-full p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2">Tableau de bord Industriel</h1>
          <p className="text-muted-foreground">
            Suivez vos projets et opportunités de référencement
          </p>
        </header>

        <div className="space-y-6">
          <ProjectOverview projects={projects} />
          
          {/* Nouvelles opportunités */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Nouvelles opportunités</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/product-reference">
                  Voir tous
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {newOpportunities.map((opportunity) => (
                  <div 
                    key={opportunity.id} 
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{opportunity.name}</h3>
                        <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                      </div>
                      <Badge variant={opportunity.phase === "Conception" ? "secondary" : "default"}>
                        {opportunity.phase}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-muted-foreground">Publication: {opportunity.publishedDate}</span>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/product-reference/${opportunity.id}`}>
                          <FileText className="h-4 w-4 mr-1" />
                          Détails
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
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
