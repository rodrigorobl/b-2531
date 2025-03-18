
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CompanyPreview from "@/components/edit-company/CompanyPreview";

export default function ViewCompany() {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate("/company");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBackClick} className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Retour
            </Button>
            <h1 className="text-lg font-semibold">Aperçu de votre page entreprise</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Vue visiteur
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                Logo
              </div>
              <div>
                <h1 className="text-2xl font-bold">Construction Dupont</h1>
                <p className="text-muted-foreground">Entreprise de construction générale</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">À propos de nous</h2>
                <p className="text-gray-700">
                  Construction Dupont est une entreprise familiale fondée en 2010, spécialisée dans la construction de bâtiments résidentiels et commerciaux. Notre équipe expérimentée s'engage à fournir des services de haute qualité, en respectant les délais et les budgets.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="font-medium">123 Rue de la Construction, 75001 Paris</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium">01 23 45 67 89</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">contact@construction-dupont.fr</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Site web</p>
                    <p className="font-medium">www.construction-dupont.fr</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">Notre expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Construction résidentielle</h3>
                      <p className="text-sm text-gray-700">Maisons individuelles, immeubles collectifs, rénovations</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Construction commerciale</h3>
                      <p className="text-sm text-gray-700">Bureaux, commerces, restaurants, hôtels</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Rénovation</h3>
                      <p className="text-sm text-gray-700">Rénovation complète, extension, surélévation</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Gros œuvre</h3>
                      <p className="text-sm text-gray-700">Fondations, structure, maçonnerie</p>
                    </CardContent>
                  </Card>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">Informations légales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">SIRET</p>
                    <p className="font-medium">12345678900012</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Forme juridique</p>
                    <p className="font-medium">SARL</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Capital social</p>
                    <p className="font-medium">50 000 €</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Code APE</p>
                    <p className="font-medium">4120A</p>
                  </div>
                </div>
              </section>
              
              <CompanyPreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
