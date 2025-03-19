
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Building, Briefcase } from 'lucide-react';

// Define the base TenderFormValues type
export type TenderFormValues = {
  type: 'design' | 'construction' | 'service';
  privacy: 'open' | 'restricted' | 'closed';
  projectName: string;
  description: string;
  // Add more common fields as needed
  invitedCompanies: Array<{
    id: string;
    name: string;
    lotId?: string;
    selected: boolean;
  }>;
  adminDocuments?: Array<{
    id: string;
    name: string;
  }>;
};

interface CreateTenderProps {
  isEditing?: boolean;
}

export default function CreateTender({ isEditing = false }: CreateTenderProps) {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Créer un Appel d'Offres</h1>
            <p className="text-muted-foreground mt-1">
              Sélectionnez le type d'appel d'offres que vous souhaitez créer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow" 
              onClick={() => navigate('/create-tender-conception')}
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <PenTool className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Conception</CardTitle>
                <CardDescription>Architecte, Bureau d'études</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Créez un appel d'offres pour des services de conception, architecture ou bureau d'études.
                </p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow" 
              onClick={() => navigate('/create-tender-realisation')}
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Réalisation</CardTitle>
                <CardDescription>Entreprise de construction</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Créez un appel d'offres pour des travaux de construction, rénovation ou aménagement.
                </p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow" 
              onClick={() => navigate('/create-tender-services')}
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Services</CardTitle>
                <CardDescription>Maintenance, Sécurité, Nettoyage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Créez un appel d'offres pour des services de maintenance, sécurité ou nettoyage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
