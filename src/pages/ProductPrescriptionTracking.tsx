
import React from 'react';
import { Layout } from '@/components/Layout';
import { ProductPrescriptionTable } from '@/components/product-prescription/ProductPrescriptionTable';

// Mock data for demonstration - filtered to only show conception phase
const projectPrescriptions = [
  {
    id: "1",
    projectName: "Résidence Les Cerisiers",
    location: "Lyon",
    projectManager: "Cabinet Architecture XYZ",
    contractor: {
      name: "Entreprise Construction ABC",
      contact: "contact@abc-construction.fr",
      phone: "01 23 45 67 89"
    },
    prescriptionStatus: 'to-do' as const,
    sentDate: null,
    productName: "Panneaux isolants A+",
    phase: 'conception' as const
  },
  {
    id: "4",
    projectName: "Éco-quartier Vert",
    location: "Nantes",
    projectManager: "Green Architects",
    contractor: {
      name: "Constructions Durables",
      contact: "contact@constructions-durables.fr",
      phone: "02 40 12 34 56"
    },
    prescriptionStatus: 'in-progress' as const,
    sentDate: null,
    productName: "Panneaux solaires PS200",
    phase: 'conception' as const
  },
  {
    id: "6",
    projectName: "Hôpital Saint-Louis",
    location: "Lille",
    projectManager: "Santé Architecture",
    contractor: {
      name: "BTP Nord",
      contact: "commercial@btp-nord.fr",
      phone: "03 20 45 67 89"
    },
    prescriptionStatus: 'validated' as const,
    sentDate: null,
    productName: "Revêtement antimicrobien AM100",
    phase: 'conception' as const
  },
  {
    id: "8",
    projectName: "Data Center Nord",
    location: "Roubaix",
    projectManager: "Digital Architecture",
    contractor: {
      name: "Tech Build",
      contact: "projets@techbuild.fr",
      phone: "03 59 12 34 56"
    },
    prescriptionStatus: 'lost' as const,
    sentDate: "2024-03-01",
    productName: "Climatisation haute performance CP400",
    phase: 'conception' as const
  }
];

export default function ProductPrescriptionTracking() {
  return (
    <Layout>
      <div className="w-full p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2">Suivi de la prescription produits</h1>
          <p className="text-muted-foreground">
            Gérez et suivez la prescription de vos produits en phase conception
          </p>
        </header>
        <ProductPrescriptionTable prescriptions={projectPrescriptions} />
      </div>
    </Layout>
  );
}
