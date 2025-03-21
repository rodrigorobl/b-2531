import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectMap from '@/components/ProjectMap';
import ProjectInfo from '@/components/ProjectInfo';
import { ArrowLeft, MapPin, Building, Calendar, MessageSquare, ClipboardList, User, Briefcase, DraftingCompass, HardHat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Communication from '@/components/Communication';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/contexts/ProfileContext';

const getSiteData = (id: string) => ({
  id,
  name: 'Résidence Les Cerisiers',
  type: 'Résidentiel',
  status: 'in-progress' as const,
  location: {
    address: '15 Rue des Cerisiers, 69003 Lyon, France',
    lat: 45.7578137,
    lng: 4.8320114
  },
  description: 'Projet de construction d\'une résidence de 45 logements répartis sur 5 étages avec parking souterrain. Le bâtiment répond aux normes RT2020 et intègre des systèmes énergétiques performants.',
  surface: '4 500 m²',
  budget: '6,2 M€',
  lots: 12,
  startDate: '15/03/2024',
  endDate: '30/11/2024',
  promoter: {
    name: 'NEXITY',
    contact: 'Philippe Martin',
    email: 'p.martin@nexity.fr',
    phone: '04 72 XX XX XX'
  },
  moe: {
    name: 'Cabinet Durand Architecture',
    contact: 'Marie Durand',
    email: 'm.durand@durand-archi.fr',
    phone: '04 78 XX XX XX'
  },
  bet: [
    {
      name: 'BET Structure',
      contact: 'Jean Leclerc',
      email: 'j.leclerc@betstructure.fr',
      phone: '04 72 XX XX XX',
      role: 'Structure'
    },
    {
      name: 'BET Fluides',
      contact: 'Sophie Bertrand',
      email: 's.bertrand@fluides-ing.fr',
      phone: '04 78 XX XX XX',
      role: 'Fluides'
    }
  ],
  contractors: [
    {
      name: 'Électricité Moderne',
      contact: 'Luc Dupont',
      email: 'l.dupont@electricite-moderne.fr',
      phone: '04 72 XX XX XX',
      lot: 'Lot 5 - Électricité'
    },
    {
      name: 'Plomberie du Rhône',
      contact: 'Paul Moreau',
      email: 'p.moreau@plomberie-rhone.fr',
      phone: '04 78 XX XX XX',
      lot: 'Lot 7 - Plomberie'
    },
    {
      name: 'Maçonnerie Lyon',
      contact: 'Alexandre Bernard',
      email: 'a.bernard@macon-lyon.fr',
      phone: '04 72 XX XX XX',
      lot: 'Lot 1 - Gros œuvre'
    }
  ],
  milestones: [
    {
      date: '15/03/2024',
      title: 'Démarrage du chantier',
      completed: true
    },
    {
      date: '30/05/2024',
      title: 'Fin du gros œuvre',
      completed: false
    },
    {
      date: '15/08/2024',
      title: 'Second œuvre terminé',
      completed: false
    },
    {
      date: '30/10/2024',
      title: 'Finitions intérieures',
      completed: false
    },
    {
      date: '30/11/2024',
      title: 'Livraison du bâtiment',
      completed: false
    }
  ],
  documents: [
    { id: 'doc1', name: 'Plans d\'exécution', type: 'PDF', date: '10/03/2024' },
    { id: 'doc2', name: 'Cahier des charges électricité', type: 'PDF', date: '12/03/2024' },
    { id: 'doc3', name: 'Planning général', type: 'XLSX', date: '15/03/2024' },
    { id: 'doc4', name: 'Compte-rendu réunion #1', type: 'PDF', date: '22/03/2024' }
  ]
});

const mockMessages = [
  {
    id: 'msg1',
    date: '22/03/2024 10:30',
    sender: 'Marie Durand',
    senderRole: 'Architecte',
    content: 'Bonjour, suite à notre réunion de chantier, je vous confirme les modifications demandées pour l\'installation électrique au niveau 2.',
    isRead: true,
    recipient: 'contractor'
  },
  {
    id: 'msg2',
    date: '22/03/2024 14:45',
    sender: 'Mon Équipe',
    senderRole: 'Chef de projet',
    content: 'Nous avons bien noté ces modifications. Nous vous enverrons un devis modificatif d\'ici demain.',
    isRead: true,
    recipient: 'bet'
  },
  {
    id: 'msg3',
    date: '23/03/2024 09:15',
    sender: 'Philippe Martin',
    senderRole: 'Promoteur',
    content: 'Pouvez-vous me confirmer que ces modifications n\'auront pas d\'impact sur le planning de livraison?',
    isRead: true,
    recipient: 'promoter'
  },
  {
    id: 'msg4',
    date: '23/03/2024 11:30',
    sender: 'Mon Équipe',
    senderRole: 'Chef de projet',
    content: 'Ces modifications seront intégrées dans notre planning actuel, sans impact sur la date de livraison prévue.',
    isRead: true,
    recipient: 'promoter'
  }
];

export default function ConstructionSiteDetail() {
  const { siteId } = useParams<{ siteId: string }>();
  const site = getSiteData(siteId || 'unknown');
  const [activeTab, setActiveTab] = useState('info');
  const [messages, setMessages] = useState(mockMessages);
  const { toast } = useToast();
  const { activeProfile } = useProfile();
  
  const promoterContacts = [
    { name: site.promoter.contact, role: 'Promoteur', company: site.promoter.name, email: site.promoter.email, phone: site.promoter.phone }
  ];
  
  const betContacts = [
    ...site.bet.map(bet => ({ name: bet.contact, role: bet.role, company: bet.name, email: bet.email, phone: bet.phone })),
    { name: site.moe.contact, role: 'Architecte', company: site.moe.name, email: site.moe.email, phone: site.moe.phone }
  ];
  
  const contractorContacts = site.contractors.map(contractor => ({ 
    name: contractor.contact, 
    role: contractor.lot, 
    company: contractor.name, 
    email: contractor.email, 
    phone: contractor.phone 
  }));
  
  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: `msg${messages.length + 1}`,
      date: new Date().toLocaleString('fr-FR'),
      sender: 'Mon Équipe',
      senderRole: 'Chef de projet',
      content: content,
      isRead: true,
      recipient: 'promoter'
    };
    
    setMessages([...messages, newMessage]);
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès."
    });
  };
  
  const handleSendQuote = (quoteData: {
    message: string;
    service: string;
    price: string;
    document?: File;
  }) => {
    const newMessage = {
      id: `msg${messages.length + 1}`,
      date: new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      sender: 'Mon Équipe',
      senderRole: 'Chef de projet',
      content: quoteData.message,
      isRead: true,
      recipient: 'promoter',
      quoteInfo: {
        service: quoteData.service,
        price: quoteData.price
      },
      attachments: quoteData.document ? [
        {
          name: quoteData.document.name,
          size: `${Math.round(quoteData.document.size / 1024)} Ko`,
          type: 'PDF'
        }
      ] : undefined
    };
    
    setMessages([...messages, newMessage]);
    
    console.log('Quote sent, would be tracked in services-quote-management:', quoteData);
    
    toast({
      title: "Devis envoyé",
      description: "Votre devis a été envoyé avec succès et sera suivi dans la gestion des devis."
    });
  };

  const formattedDocuments = site.documents.map(doc => ({
    id: doc.id,
    name: doc.name,
    type: doc.type,
    size: `${Math.round(Math.random() * 10)}MB`,
    uploadDate: doc.date
  }));

  const handleContactClick = () => {
    setActiveTab('communications');
  };

  const isServicesProfile = activeProfile === 'entreprise-services';

  const ContactSection = ({ title, contacts, icon }: { title: string; contacts: any[]; icon: React.ReactNode }) => {
    return (
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div 
                key={index} 
                className="border rounded-md p-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{contact.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.role}</p>
                      <p className="text-sm text-muted-foreground">{contact.company}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleContactClick}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contacter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/construction-sites-map">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{site.name}</h1>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              {site.location.address}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge className="bg-blue-500">{site.type}</Badge>
          <Badge className="bg-status-in-progress">En cours</Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar size={14} />
            <span>Début: {site.startDate}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar size={14} />
            <span>Fin: {site.endDate}</span>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className={`grid w-full ${isServicesProfile ? 'grid-cols-2' : 'grid-cols-4'} max-w-md`}>
            <TabsTrigger value="info">
              <Building className="mr-2 h-4 w-4" />
              Informations
            </TabsTrigger>
            {!isServicesProfile && (
              <TabsTrigger value="team">
                <ClipboardList className="mr-2 h-4 w-4" />
                Intervenants
              </TabsTrigger>
            )}
            <TabsTrigger value="communications">
              <MessageSquare className="mr-2 h-4 w-4" />
              Communications
            </TabsTrigger>
            {!isServicesProfile && (
              <TabsTrigger value="map">
                <MapPin className="mr-2 h-4 w-4" />
                Carte
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProjectInfo 
                info={{
                  description: site.description,
                  surface: site.surface,
                  budget: site.budget,
                  lots: site.lots,
                  startDate: site.startDate,
                  endDate: site.endDate,
                  milestones: site.milestones,
                  technicalTeam: !isServicesProfile ? undefined : []
                }}
                onContactClick={handleContactClick}
              />
              
              {isServicesProfile ? (
                <div className="h-[500px] border rounded-lg overflow-hidden">
                  <ProjectMap location={site.location} />
                </div>
              ) : (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Building size={16} />
                      Documents du projet
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {site.documents.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="flex items-center">
                            <div className="bg-primary/10 text-primary w-8 h-8 rounded-md flex items-center justify-center mr-3">
                              {doc.type}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.date}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {isServicesProfile && (
              <>
                <ContactSection 
                  title="Promoteur" 
                  contacts={[{
                    name: site.promoter.contact,
                    role: "Maître d'ouvrage",
                    company: site.promoter.name
                  }]}
                  icon={<Briefcase className="w-5 h-5" />}
                />
                
                <ContactSection 
                  title="Bureaux d'Études Impliqués" 
                  contacts={[
                    {
                      name: site.moe.contact,
                      role: "Architecte",
                      company: site.moe.name
                    },
                    ...site.bet.map(bet => ({
                      name: bet.contact,
                      role: bet.role,
                      company: bet.name
                    }))
                  ]}
                  icon={<DraftingCompass className="w-5 h-5" />}
                />
                
                <ContactSection 
                  title="Entreprises titulaires" 
                  contacts={site.contractors.map(contractor => ({
                    name: contractor.contact,
                    role: contractor.lot,
                    company: contractor.name
                  }))}
                  icon={<HardHat className="w-5 h-5" />}
                />
              </>
            )}
          </TabsContent>
          
          {!isServicesProfile && (
            <TabsContent value="team" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Promoteur</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{site.promoter.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{site.promoter.name}</p>
                        <p className="text-sm text-muted-foreground">{site.promoter.contact}</p>
                        <div className="flex flex-col gap-1 mt-2 text-sm">
                          <p>{site.promoter.email}</p>
                          <p>{site.promoter.phone}</p>
                        </div>
                        <Button size="sm" variant="outline" className="mt-3">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contacter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Maître d'œuvre</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{site.moe.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{site.moe.name}</p>
                        <p className="text-sm text-muted-foreground">{site.moe.contact}</p>
                        <div className="flex flex-col gap-1 mt-2 text-sm">
                          <p>{site.moe.email}</p>
                          <p>{site.moe.phone}</p>
                        </div>
                        <Button size="sm" variant="outline" className="mt-3">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contacter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {site.bet.map((bet, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">BET {bet.role}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{bet.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{bet.name}</p>
                          <p className="text-sm text-muted-foreground">{bet.contact}</p>
                          <div className="flex flex-col gap-1 mt-2 text-sm">
                            <p>{bet.email}</p>
                            <p>{bet.phone}</p>
                          </div>
                          <Button size="sm" variant="outline" className="mt-3">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contacter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Entreprises titulaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {site.contractors.map((contractor, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{contractor.lot}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{contractor.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contractor.name}</p>
                          <p className="text-sm text-muted-foreground">{contractor.contact}</p>
                          <div className="flex flex-col gap-1 mt-2 text-sm">
                            <p>{contractor.email}</p>
                            <p>{contractor.phone}</p>
                          </div>
                          <Button size="sm" variant="outline" className="mt-3">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contacter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="communications">
            <div className="max-w-4xl mx-auto">
              <Communication
                messages={messages}
                notifications={[]} // You could add real notifications here
                documents={formattedDocuments}
                onSendMessage={handleSendMessage}
                onSendQuote={handleSendQuote}
              />
            </div>
          </TabsContent>
          
          {!isServicesProfile && (
            <TabsContent value="map">
              <div className="h-[600px] border rounded-lg overflow-hidden">
                <ProjectMap location={site.location} />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
