
import React from "react";
import Sidebar from "@/components/Sidebar";

export default function Company() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Mon Entreprise</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nom de l'entreprise</p>
                <p className="font-medium">Construction Dupont</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">SIRET</p>
                <p className="font-medium">12345678900012</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="font-medium">123 Rue de la Construction, 75001 Paris</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium">01 23 45 67 89</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Informations légales</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Forme juridique</p>
                <p className="font-medium">SARL</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Capital social</p>
                <p className="font-medium">50 000 €</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de création</p>
                <p className="font-medium">01/01/2010</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Code APE</p>
                <p className="font-medium">4120A</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
