
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ExternalLink } from "lucide-react";
import UserProfileDialog from "@/components/UserProfileDialog";

// Données fictives des utilisateurs avec leurs droits
const users = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "Administrateur",
    permissions: {
      tenders: true,
      payment: true,
      users: true,
    },
    company: {
      name: "Construction Dupont",
      address: "123 Rue de la Construction, 75001 Paris",
      phone: "01 23 45 67 89",
      siret: "12345678900012"
    }
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@example.com",
    role: "Gestionnaire",
    permissions: {
      tenders: true,
      payment: false,
      users: false,
    },
    company: {
      name: "Martin & Associés",
      address: "45 Avenue des Fleurs, 69002 Lyon",
      phone: "04 56 78 90 12",
      siret: "98765432100012"
    }
  },
  {
    id: 3,
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    role: "Utilisateur",
    permissions: {
      tenders: true,
      payment: false,
      users: false,
    },
    company: {
      name: "Durand Construction",
      address: "8 Rue de la République, 33000 Bordeaux",
      phone: "05 12 34 56 78",
      siret: "45678912300045"
    }
  }
];

export default function Company() {
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleUserClick = (user: typeof users[0]) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Mon Entreprise</h1>
        
        <div className="grid gap-6 md:grid-cols-2 mb-8">
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

        {/* Section pour les utilisateurs et leurs droits */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Utilisateurs et droits d'administration</CardTitle>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <PlusCircle size={16} />
              <span>Ajouter un utilisateur</span>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Répondre aux appels d'offres</TableHead>
                  <TableHead>Payer l'abonnement</TableHead>
                  <TableHead>Ajouter des utilisateurs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleUserClick(user)}
                  >
                    <TableCell className="font-medium flex items-center gap-1">
                      {user.name}
                      <ExternalLink size={14} className="text-muted-foreground" />
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Checkbox checked={user.permissions.tenders} disabled />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={user.permissions.payment} disabled />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={user.permissions.users} disabled />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Dialog pour afficher les informations de l'entreprise */}
        <UserProfileDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen} 
          user={selectedUser} 
        />
      </main>
    </div>
  );
}
