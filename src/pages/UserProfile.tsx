
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building, Phone, Mail, UserRound, BadgeCheck, FileText, Clock, Calendar, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Sidebar from '../components/Sidebar';
import { Button } from "@/components/ui/button";

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [profileType, setProfileType] = useState<'promoteur' | 'maitre-oeuvre' | 'entreprise-construction' | 'entreprise-services' | 'industriel'>('promoteur');
  
  // Dans une application réelle, vous récupéreriez les données de l'utilisateur via une API
  // Ici nous utilisons des données fictives pour la démonstration
  const user = {
    id: Number(userId),
    name: "Cabinet Durand & Associés",
    initials: "CD",
    email: "contact@durand-archi.fr",
    role: "Architecte",
    joinedDate: "12 janvier 2022",
    lastActive: "Aujourd'hui",
    company: {
      name: "Durand Architecture",
      address: "15 Avenue des Architectes, 75008 Paris",
      phone: "01 42 68 95 32",
      siret: "78945612300057",
      employees: 12,
      foundedYear: 2005,
      specialization: "Architecture d'intérieur, bâtiments publics",
      website: "www.durand-architecture.fr",
      description: "Cabinet d'architecture spécialisé dans la conception de bâtiments publics et l'architecture d'intérieur. Notre approche combine innovation et respect du patrimoine."
    },
    projects: [
      { name: "Rénovation École Jean Moulin", role: "Architecte principal", date: "2023-2024" },
      { name: "Construction Médiathèque", role: "Architecte", date: "2022-2023" },
      { name: "Extension Mairie de Lyon", role: "Consultant", date: "2021-2022" }
    ],
    qualifications: [
      "Ordre des Architectes #12547",
      "Certification HQE",
      "Spécialiste Rénovation Énergétique"
    ]
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-lg font-medium">Profil Utilisateur</h1>
            
            {profileType === 'promoteur' && (
              <Button 
                variant="default" 
                size="sm" 
                className="whitespace-nowrap"
                onClick={() => navigate('/create-tender')}
              >
                <Plus size={16} className="mr-1" />
                Lancer un Appel d'Offres
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Profil</CardTitle>
                <CardDescription>Informations de l'utilisateur</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-lg">{user.initials}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1 text-center">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-1">
                      {user.role}
                      {user.role === "Administrateur" && (
                        <BadgeCheck className="h-4 w-4 text-primary" />
                      )}
                    </p>
                  </div>
                  
                  <div className="w-full space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>Email:</span>
                      </div>
                      <span>{user.email}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Inscrit le:</span>
                      </div>
                      <span>{user.joinedDate}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Dernière activité:</span>
                      </div>
                      <span>{user.lastActive}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Entreprise</CardTitle>
                  <CardDescription>Informations sur l'entreprise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-medium">{user.company.name}</h3>
                    </div>
                    
                    <p className="text-sm">{user.company.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Coordonnées</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">Adresse</div>
                          <div>{user.company.address}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Téléphone</div>
                          <div>{user.company.phone}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Site web</div>
                          <div>{user.company.website}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Informations légales</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">SIRET</div>
                          <div className="font-mono">{user.company.siret}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Fondée en</div>
                          <div>{user.company.foundedYear}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Effectif</div>
                          <div>{user.company.employees} employés</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="projects">
                <TabsList>
                  <TabsTrigger value="projects">Projets</TabsTrigger>
                  <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="projects" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Projets récents</CardTitle>
                      <CardDescription>Projets sur lesquels cet utilisateur a travaillé</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {user.projects.map((project, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{project.name}</div>
                              <div className="text-sm text-muted-foreground">{project.role}</div>
                            </div>
                            <div className="text-sm">{project.date}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="qualifications">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Qualifications & Certifications</CardTitle>
                      <CardDescription>Qualifications professionnelles et certifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {user.qualifications.map((qualification, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{qualification}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
