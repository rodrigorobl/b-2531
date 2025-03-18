
import React from 'react';
import { Layout } from '@/components/Layout';
import { ProductReferenceTable } from '@/components/product-reference/ProductReferenceTable';

// Mock data for demonstration
const projectReferences = [
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
    quoteStatus: 'to-send' as const,
    sentDate: null,
    productName: "Panneaux isolants A+"
  },
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
    productName: "Revêtement sol B2"
  }
];

export default function ProductReferenceTracking() {
  return (
    <Layout>
      <div className="container p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2">Suivi des référencements produits</h1>
          <p className="text-muted-foreground">
            Gérez vos devis et suivez le référencement de vos produits
          </p>
        </header>
        <ProductReferenceTable references={projectReferences} />
      </div>
    </Layout>
  );
}
