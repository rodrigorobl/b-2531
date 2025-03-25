
import React from 'react';
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Layout>
      <div className="container py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">BTP CONNECT</h1>
            <p className="text-muted-foreground">
              Bienvenue sur la plateforme de gestion des projets de construction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/tender-list">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                <span className="text-lg">Appels d'offres</span>
              </Button>
            </Link>
            <Link to="/create-tender">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                <span className="text-lg">Créer un appel d'offres</span>
              </Button>
            </Link>
            <Link to="/invite-companies">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                <span className="text-lg">Inviter des entreprises</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
