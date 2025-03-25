
import React from 'react';
import { Layout } from "@/components/Layout";

export default function Profile() {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Profil</h1>
        <p className="text-muted-foreground mt-1">
          Gérez votre profil et vos préférences
        </p>
        {/* Profile implementation would go here */}
      </div>
    </Layout>
  );
}
