
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ExternalLink, Eye, Edit, Wrench, FileSpreadsheet } from 'lucide-react';
import UserProfileDialog from "@/components/UserProfileDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Mock data for services offered by the company
const companyServices = [
  {
    id: "service-1",
    name: "Pilotage de drone pour relevés et inspections",
    category: "Inspection",
    pricing: "600€ - 1200€ par jour",
    status: "active"
  },
  {
    id: "service-2",
    name: "Nettoyage fin de chantier",
    category: "Nettoyage",
    pricing: "12€ par m²",
    status: "active"
  },
  {
    id: "service-3",
    name: "Location d'engins de chantier avec opérateur",
    category: "Location",
    pricing: "500€ - 1500€ par jour",
    status: "active"
  },
  {
    id: "service-4",
    name: "Formation sécurité chantier",
    category: "Formation",
    pricing: "Sur devis",
    status: "inactive"
  }
];

export default function CompanyServices() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleViewAsVisitor = () => {
    navigate("/services-details/service-company-1");
  };

  const handleViewQuotes = () => {
    navigate("/services-quote-management");
  };

  const handleAddService = () => {
    toast({
      title: "Ajout de service",
      description: "Fonctionnalité d'ajout de service à venir."
    });
  };

  const handleEditService = (serviceId: string) => {
    toast({
      title: "Modification de service",
      description: "Fonctionnalité de modification de service à venir."
    });
  };

  const handleToggleServiceStatus = (serviceId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast({
      title: `Service ${newStatus === 'active' ? 'activé' : 'désactivé'}`,
      description: `Le service a été ${newStatus === 'active' ? 'activé' : 'désactivé'} avec succès.`
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mes Services</h1>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleViewAsVisitor}
              className="flex items-center gap-2"
            >
              <Eye size={16} />
              Voir en tant que visiteur
            </Button>
            <Button
              variant="outline"
              onClick={handleViewQuotes}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet size={16} />
              Gérer mes devis
            </Button>
            <Button 
              onClick={handleAddService}
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Ajouter un service
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Statistiques des services</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Services actifs</p>
                <p className="font-medium">3 services</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Devis en cours</p>
                <p className="font-medium">5 devis</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Taux d'acceptation</p>
                <p className="font-medium">78%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenu moyen par service</p>
                <p className="font-medium">2 500 €</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Couverture géographique</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Régions couvertes</p>
                <p className="font-medium">Île-de-France, Hauts-de-France, Normandie</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Villes principales</p>
                <p className="font-medium">Paris, Lille, Rouen, Amiens, Beauvais</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Rayon d'intervention</p>
                <p className="font-medium">200 km</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Déplacements spécifiques</p>
                <p className="font-medium">Disponible sur demande (France entière)</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Services proposés</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du service</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Tarification</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companyServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      {service.name}
                    </TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>{service.pricing}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        service.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditService(service.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleServiceStatus(service.id, service.status)}
                        >
                          <Eye size={16} className={service.status === 'active' ? 'text-green-500' : 'text-gray-500'} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Avis clients récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">Jean Dupont</div>
                    <div className="text-sm text-muted-foreground">Constructions Modernes</div>
                  </div>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Excellent service de pilotage de drone pour notre projet immobilier. Les images et relevés fournis étaient d'une grande précision et nous ont permis d'optimiser notre planning de construction."
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  Service: Pilotage de drone pour relevés et inspections • 15 juillet 2023
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">Sophie Martin</div>
                    <div className="text-sm text-muted-foreground">Promoteur XYZ</div>
                  </div>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Le nettoyage de fin de chantier a été réalisé dans les délais et avec professionnalisme. Quelques détails auraient pu être mieux soignés, mais dans l'ensemble nous sommes satisfaits."
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  Service: Nettoyage fin de chantier • 22 mai 2023
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
