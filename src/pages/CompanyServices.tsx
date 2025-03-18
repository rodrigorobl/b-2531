
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCompany } from '@/types/company-services';
import { CompanyInfo } from '@/components/company-services/CompanyInfo';
import { ServicesList } from '@/components/company-services/ServicesList';
import { CoverageMap } from '@/components/company-services/CoverageMap';
import { ReviewsList } from '@/components/company-services/ReviewsList';
import { ProjectPortfolio } from '@/components/company-services/ProjectPortfolio';
import { FinancialsCard } from '@/components/company-services/FinancialsCard';
import { QuoteFormDialog } from '@/components/company-services/QuoteFormDialog';

// Mock data - in a real application, this would come from an API
const MOCK_COMPANY: ServiceCompany = {
  id: "service-company-1",
  name: "BTP Services Plus",
  logo: "https://via.placeholder.com/100",
  description: "BTP Services Plus est une entreprise spécialisée dans les services aux chantiers de construction depuis 2010. Notre équipe expérimentée propose des solutions adaptées aux besoins spécifiques de chaque projet, garantissant efficacité et qualité.",
  contact: {
    phone: "01 23 45 67 89",
    email: "contact@btpservicesplus.fr",
    website: "https://www.btpservicesplus.fr",
    linkedin: "https://www.linkedin.com/company/btpservicesplus"
  },
  services: [
    {
      id: "service-1",
      name: "Pilotage de drone pour relevés et inspections",
      description: "Service de pilotage de drone professionnel pour réaliser des relevés topographiques, inspections d'ouvrages, suivi de chantier et prises de vue aériennes. Nos pilotes sont certifiés et nos équipements sont de dernière génération.",
      price: {
        type: 'range',
        value: "600€ - 1200€",
        unit: "par jour"
      },
      duration: {
        value: "1-2 jours"
      },
      requirements: [
        "Certification S1/S3",
        "Assurance spécifique",
        "Autorisation de vol"
      ]
    },
    {
      id: "service-2",
      name: "Nettoyage fin de chantier",
      description: "Service complet de nettoyage professionnel pour les chantiers terminés. Nous prenons en charge l'évacuation des déchets, le nettoyage des surfaces, des vitrages et des espaces extérieurs pour une remise impeccable.",
      price: {
        type: 'fixed',
        value: "12€",
        unit: "par m²"
      },
      duration: {
        value: "2-5 jours selon surface"
      }
    },
    {
      id: "service-3",
      name: "Location d'engins de chantier avec opérateur",
      description: "Service de location d'engins de chantier (mini-pelles, chargeurs, nacelles) avec opérateur qualifié. Nos machines sont régulièrement entretenues et nos opérateurs formés aux dernières normes de sécurité.",
      price: {
        type: 'range',
        value: "500€ - 1500€",
        unit: "par jour"
      },
      duration: {
        value: "À la demande"
      },
      requirements: [
        "CACES à jour",
        "Équipements aux normes CE"
      ]
    },
    {
      id: "service-4",
      name: "Formation sécurité chantier",
      description: "Formation spécialisée pour les équipes de chantier sur les aspects de sécurité, prévention des risques et premiers secours. Nos formateurs sont certifiés et adaptent le contenu aux spécificités de votre chantier.",
      price: {
        type: 'quote',
      },
      duration: {
        value: "1-3 jours"
      },
      requirements: [
        "Certification INRS",
        "Agrément formateur"
      ]
    }
  ],
  coverageAreas: {
    regions: ["Île-de-France", "Hauts-de-France", "Normandie"],
    cities: ["Paris", "Lille", "Rouen", "Amiens", "Beauvais"],
    description: "Nous intervenons principalement en Île-de-France et dans les régions limitrophes. Pour les grands projets, nous pouvons étendre notre zone d'intervention à toute la France métropolitaine."
  },
  reviews: [
    {
      id: "review-1",
      author: "Jean Dupont",
      authorCompany: "Constructions Modernes",
      rating: 5,
      comment: "Excellent service de pilotage de drone pour notre projet immobilier. Les images et relevés fournis étaient d'une grande précision et nous ont permis d'optimiser notre planning de construction.",
      serviceId: "service-1",
      projectId: "project-1",
      date: "2023-07-15"
    },
    {
      id: "review-2",
      author: "Sophie Martin",
      authorCompany: "Promoteur XYZ",
      rating: 4,
      comment: "Le nettoyage de fin de chantier a été réalisé dans les délais et avec professionnalisme. Quelques détails auraient pu être mieux soignés, mais dans l'ensemble nous sommes satisfaits.",
      serviceId: "service-2",
      projectId: "project-2",
      date: "2023-05-22"
    },
    {
      id: "review-3",
      author: "Mohammed Benali",
      authorCompany: "Constructions Durables",
      rating: 5,
      comment: "La location d'engin avec opérateur s'est parfaitement déroulée. L'opérateur était très compétent et a grandement facilité notre travail sur le chantier.",
      serviceId: "service-3",
      date: "2023-09-03"
    }
  ],
  projects: [
    {
      id: "project-1",
      name: "Tour Horizon - Suivi de construction",
      description: "Suivi hebdomadaire par drone de l'avancement de la construction d'une tour de bureaux de 18 étages, permettant un contrôle précis du planning et de la qualité des travaux.",
      date: "2023-02-10",
      client: "Groupe Immobilier Alpha",
      services: ["service-1"],
      images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop"],
      testimonial: {
        author: "Pierre Durand, Directeur de projet",
        text: "Le suivi par drone nous a fait gagner un temps précieux et nous a permis de détecter rapidement plusieurs problèmes qui auraient pu causer des retards importants.",
        rating: 5
      }
    },
    {
      id: "project-2",
      name: "Résidence Les Cerisiers - Nettoyage final",
      description: "Nettoyage complet d'une résidence de 45 appartements avant livraison, incluant parties communes, vitrages et espaces extérieurs.",
      date: "2023-04-18",
      client: "NEXITY",
      services: ["service-2"],
      images: ["https://images.unsplash.com/photo-1545259741-2ea3ebf92fe7?q=80&w=2670&auto=format&fit=crop"],
      testimonial: {
        author: "Marie Lambert, Responsable livraison",
        text: "Le résultat était impeccable, ce qui nous a permis de livrer les appartements dans d'excellentes conditions. Les retours des acquéreurs ont été très positifs.",
        rating: 4
      }
    },
    {
      id: "project-3",
      name: "Chantier Autoroute A86 - Terrassement",
      description: "Mise à disposition d'engins de terrassement avec opérateurs pour un chantier d'extension d'autoroute sur une période de 3 mois.",
      date: "2023-06-05",
      client: "Vinci Autoroutes",
      services: ["service-3"],
      images: ["https://images.unsplash.com/photo-1573571765460-f95ab2035bf8?q=80&w=2670&auto=format&fit=crop"]
    }
  ],
  financials: {
    solvabilityScore: 85,
    administrativeScore: 92,
    lastUpdated: "15/04/2024"
  }
};

export default function CompanyServices() {
  const { companyId } = useParams<{ companyId: string }>();
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  
  // In a real app, you would fetch the company data based on companyId
  const company = MOCK_COMPANY;
  
  const handleRequestQuote = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setQuoteDialogOpen(true);
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link to="/directory">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Services de {company.name}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - 2 columns wide */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company info */}
            <CompanyInfo 
              company={company} 
              onContactClick={() => setQuoteDialogOpen(true)} 
            />
            
            {/* Services list */}
            <ServicesList 
              services={company.services} 
              onRequestQuote={handleRequestQuote} 
            />
            
            {/* Projects portfolio */}
            <ProjectPortfolio 
              projects={company.projects} 
              services={company.services} 
            />
            
            {/* Reviews */}
            <ReviewsList 
              reviews={company.reviews} 
              services={company.services} 
            />
          </div>
          
          {/* Sidebar - 1 column wide */}
          <div className="space-y-6">
            {/* Coverage map */}
            <CoverageMap 
              regions={company.coverageAreas.regions}
              cities={company.coverageAreas.cities}
              description={company.coverageAreas.description}
              centerLocation={{ lat: 48.8566, lng: 2.3522 }} // Paris coordinates as default
            />
            
            {/* Financials */}
            {company.financials && (
              <FinancialsCard 
                solvabilityScore={company.financials.solvabilityScore}
                administrativeScore={company.financials.administrativeScore}
                lastUpdated={company.financials.lastUpdated}
              />
            )}
          </div>
        </div>
        
        {/* Quote request dialog */}
        <QuoteFormDialog 
          open={quoteDialogOpen}
          onOpenChange={setQuoteDialogOpen}
          services={company.services}
          initialServiceId={selectedServiceId}
          companyName={company.name}
        />
      </div>
    </Layout>
  );
}
