
import React from 'react';
import { Layout } from '@/components/Layout';
import { ProductReferenceTable } from '@/components/product-reference/ProductReferenceTable';

// Mock data for demonstration - filtered to only show realization phase
const projectReferences = [
  {
    id: "2",
    projectName: "Campus numérique",
    location: "Paris",
    projectManager: "Studio Design 123",
    contractor: {
      name: "Bâtiment Plus",
      contact: "contact@batimentplus.fr",
      phone: "01 98 76 54 32"
    },
    quoteStatus: 'sent' as const,
    sentDate: "2024-03-15",
    productName: "Revêtement sol B2",
    phase: 'realisation' as const
  },
  {
    id: "3",
    projectName: "Tour Horizon",
    location: "Marseille",
    projectManager: "Atelier Architecture Med",
    contractor: {
      name: "Construction du Sud",
      contact: "info@constructionsud.fr",
      phone: "04 91 23 45 67"
    },
    quoteStatus: 'signed' as const,
    sentDate: "2024-02-28",
    productName: "Vitrage intelligent V3",
    phase: 'realisation' as const
  },
  {
    id: "5",
    projectName: "Centre Commercial Étoile",
    location: "Bordeaux",
    projectManager: "Bureau d'études Tech+",
    contractor: {
      name: "Grands Travaux SA",
      contact: "devis@grands-travaux.fr",
      phone: "05 56 78 90 12"
    },
    quoteStatus: 'sent' as const,
    sentDate: "2024-03-10",
    productName: "Système ventilation ECO+",
    phase: 'realisation' as const
  },
  {
    id: "7",
    projectName: "Résidence Élégance",
    location: "Nice",
    projectManager: "Côte d'Azur Architectes",
    contractor: {
      name: "Azur Construction",
      contact: "contact@azur-construction.fr",
      phone: "04 93 12 34 56"
    },
    quoteStatus: 'signed' as const,
    sentDate: "2024-01-20",
    productName: "Système domotique D500",
    phase: 'realisation' as const
  },
  {
    id: "9",
    projectName: "Complexe sportif Olympia",
    location: "Toulouse",
    projectManager: "Sport Architecture",
    contractor: {
      name: "BTP Sud-Ouest",
      contact: "commercial@btp-sudouest.fr",
      phone: "05 61 23 45 67"
    },
    quoteStatus: 'to-send' as const,
    sentDate: null,
    productName: "Revêtement de sol sportif SR200",
    phase: 'realisation' as const,
    isMarketAssigned: false
  },
  {
    id: "10",
    projectName: "Centre commercial Grand Place",
    location: "Grenoble",
    projectManager: "Urban Concept",
    contractor: {
      name: "Batiments Modernes",
      contact: "devis@batimentsmodernes.fr",
      phone: "04 76 12 34 56"
    },
    quoteStatus: 'to-send' as const,
    sentDate: null,
    productName: "Système d'éclairage intelligent E300",
    phase: 'realisation' as const,
    isMarketAssigned: false
  }
];

export default function ProductReferenceTracking() {
  return (
    <Layout>
      <div className="w-full p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2">Suivi du référencement produits</h1>
          <p className="text-muted-foreground">
            Gérez vos devis et suivez le référencement de vos produits
          </p>
        </header>
        <ProductReferenceTable references={projectReferences} />
      </div>
    </Layout>
  );
}
