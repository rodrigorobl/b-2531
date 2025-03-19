
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Building, MapPin, Calendar, FileText, MessageSquare, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ServiceTenderSearchResult } from './ServicesTenderSearch';
import TenderOffers from '@/components/TenderOffers';

export default function ServicesTenderDetails() {
  const { tenderId } = useParams<{ tenderId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for a single service tender
  const mockTender: ServiceTenderSearchResult = {
    id: "service-001",
    projectName: "Location de conteneurs de stockage - Chantier Les Ormes",
    serviceType: "LOCATION DE LOCAUX DE STOCKAGE",
    location: "Lyon",
    budget: "15 000 €",
    estimatedAmount: 15000,
    status: "open",
    deadline: "20/06/2024",
    consultationMode: "public",
    clientName: "Nexity",
    clientType: "promoteur",
    competitors: 3,
    isFavorite: false,
    createdAt: "01/05/2024",
    description: "Location de 5 conteneurs de stockage sécurisés pendant 18 mois pour un chantier de construction de 45 logements.",
    viewed: true,
    responded: false
  };

  const handleBack = () => {
    navigate('/services-tender-search');
  };

  const handleSubmitQuote = () => {
    navigate(`/submit-services-quote/${tenderId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <Button variant="outline" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la recherche
        </Button>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{mockTender.projectName}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Building size={16} />
                <span>{mockTender.serviceType}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin size={16} />
                <span>{mockTender.location}</span>
              </div>
              <Badge variant={
                mockTender.status === 'open' ? 'default' : 
                mockTender.status === 'upcoming' ? 'secondary' : 'outline'
              }>
                {mockTender.status === 'open' ? 'En cours' : 
                 mockTender.status === 'upcoming' ? 'À venir' : 'Clôturé'}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {}} className="whitespace-nowrap">
              <FileText className="mr-2 h-4 w-4" />
              Consulter l'Appel d'Offres
            </Button>
            <Button onClick={handleSubmitQuote} className="whitespace-nowrap">
              <Send className="mr-2 h-4 w-4" />
              Soumettre un devis
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="myquotes">Mes offres</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Détails du projet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{mockTender.description}</p>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-1">Client</h3>
                      <p className="text-muted-foreground">{mockTender.clientName}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Type de client</h3>
                      <p className="text-muted-foreground">
                        {mockTender.clientType === 'promoteur' ? 'Promoteur' : 
                         mockTender.clientType === 'moe' ? 'Maître d\'œuvre' : 'Entreprise générale'}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Budget estimé</h3>
                      <p className="text-muted-foreground">{mockTender.budget}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Date limite</h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar size={14} />
                        <span>{mockTender.deadline}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>État de la consultation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Date de création</h3>
                    <p className="text-muted-foreground">{mockTender.createdAt}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Concurrents</h3>
                    <p className="text-muted-foreground">{mockTender.competitors} entreprise(s) ont consulté cet appel d'offres</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Statut</h3>
                    <Badge variant={
                      mockTender.status === 'open' ? 'default' : 
                      mockTender.status === 'upcoming' ? 'secondary' : 'outline'
                    }>
                      {mockTender.status === 'open' ? 'En cours' : 
                       mockTender.status === 'upcoming' ? 'À venir' : 'Clôturé'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="myquotes">
            <Card>
              <CardHeader>
                <CardTitle>Mes offres</CardTitle>
              </CardHeader>
              <CardContent>
                <TenderOffers offers={[]} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-3" />
                    <h3 className="font-medium text-lg mb-1">Aucun message</h3>
                    <p className="text-muted-foreground">
                      Commencez à échanger avec le client au sujet de cet appel d'offres.
                    </p>
                    <Button className="mt-4">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Démarrer la conversation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
