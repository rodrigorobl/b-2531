
import React from 'react';
import { Layout } from "@/components/Layout";

export default function Register() {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Créer un compte</h1>
        <p className="text-muted-foreground mt-1">
          Inscrivez-vous pour accéder à BTP CONNECT
        </p>
        {/* Form implementation would go here */}
      </div>
    </Layout>
  );
}
