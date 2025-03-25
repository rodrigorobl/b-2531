
import React from 'react';
import { Layout } from "@/components/Layout";

export default function TenderDetails() {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Détails de l'Appel d'Offres</h1>
        <p className="text-muted-foreground mt-1">
          Informations détaillées sur l'appel d'offres sélectionné
        </p>
        {/* Detailed tender information will be implemented later */}
      </div>
    </Layout>
  );
}
