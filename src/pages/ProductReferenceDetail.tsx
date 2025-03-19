import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useParams, Link } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Calendar, 
  Clock, 
  FileText, 
  Users, 
  BookOpen, 
  MessageSquare,
  User,
  File,
  Home,
  HardHat,
  Briefcase,
  CheckCircle,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import ProjectDocuments from '@/components/product-reference/ProjectDocuments';
import ReferenceTimeline, { TimelineEvent } from '@/components/product-reference/ReferenceTimeline';
import CommunicationHistory from '@/components/product-reference/CommunicationHistory';
import { useProfile } from '@/contexts/ProfileContext';

const ProjectDetailHeader = ({ project }: { project: any }) => {
  return (
    <div className="mb-6 border-b pb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Building size={16} className="mr-1" />
              <span>{project.type === 'conception' ? 'Projet en Conception' : 'Projet en Réalisation'}</span>
            </div>
            <div className="flex items-center">
              <Home size={16} className="mr-1" />
              <span>{project.nature}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Badge 
            variant="outline" 
            className={`
              ${project.referenceStatus === 'validated' ? 'border-green-500 text-green-600 bg-green-50' : ''}
              ${project.referenceStatus === 'in-progress' ? 'border-blue-500 text-blue-600 bg-blue-50' : ''}
              ${project.referenceStatus === 'to-start' ? 'border-yellow-500 text-yellow-600 bg-yellow-50' : ''}
              px-3 py-1.5
            `}
          >
            {project.referenceStatus === 'validated' ? (
              <><CheckCircle size={14} className="mr-1" /> Référencement validé</>
            ) : project.referenceStatus === 'in-progress' ? (
              <><Clock size={14} className="mr-1" /> Référencement en cours</>
            ) : (
              <><Clock size={14} className="mr-1" /> Référencement à démarrer</>
            )}
          </Badge>
        </div>
      </div>
      <div className="prose prose-sm max-w-none">
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default function ProductReferenceDetail() {
  const { referenceId } = useParams<{ referenceId: string }>();
  const [activeTab, setActiveTab] = useState("information");
  const { activeProfile } = useProfile();
  const { toast } = useToast();
  
  const [projectData, setProjectData] = useState({
    id: referenceId,
    name: "Résidence Les Cerisiers",
    type: "realisation",
    nature: "Résidentiel",
    location: "Lyon",
    description: "Projet de construction d'une résidence de 45 logements répartis sur 3 bâtiments. Les bâtiments sont conçus pour respecter la norme RT2020 et intégrer des solutions innovantes en matière d'isolation thermique et de ventilation.",
    referenceStatus: "in-progress",
    productName: "Panneaux isolants A+",
    promoter: {
      name: "Immobilier Moderne",
      contacts: [
        { name: "Jean Dupont", role: "Directeur de projet", company: "Immobilier Moderne", email: "j.dupont@immobilier-moderne.fr", phone: "06 12 34 56 78" },
        { name: "Marie Martin", role: "Responsable technique", company: "Immobilier Moderne", email: "m.martin@immobilier-moderne.fr", phone: "06 23 45 67 89" }
      ]
    },
    technicalOffices: [
      {
        name: "Cabinet Architecture XYZ",
        role: "Architecte",
        contacts: [
          { name: "Pierre Leroy", role: "Architecte principal", company: "Cabinet Architecture XYZ", email: "p.leroy@cabinet-xyz.fr", phone: "06 34 56 78 90" }
        ]
      },
      {
        name: "BET Thermique SA",
        role: "Bureau d'études thermiques",
        contacts: [
          { name: "Sophie Blanc", role: "Ingénieure thermicienne", company: "BET Thermique SA", email: "s.blanc@bet-thermique.fr", phone: "06 45 67 89 01" }
        ]
      }
    ],
    contractor: {
      name: "Entreprise Construction ABC",
      contacts: [
        { name: "Thomas Noir", role: "Chef de projet", company: "Entreprise Construction ABC", email: "t.noir@construction-abc.fr", phone: "06 56 78 90 12" },
        { name: "Julie Vert", role: "Responsable achats", company: "Entreprise Construction ABC", email: "j.vert@construction-abc.fr", phone: "06 67 89 01 23" }
      ]
    },
    timeline: [
      { date: "2024-01-10", title: "Première présentation du produit", description: "Présentation des panneaux isolants A+ au cabinet d'architecture", status: "completed" },
      { date: "2024-02-15", title: "Validation technique par le BET", description: "Le bureau d'études thermiques a validé la conformité du produit", status: "completed" },
      { date: "2024-03-05", title: "Demande de devis", description: "L'entreprise Construction ABC a demandé un devis pour les panneaux", status: "completed" },
      { date: "2024-03-15", title: "Envoi du devis", description: "Devis envoyé à l'entreprise Construction ABC", status: "completed" },
      { date: "2024-04-01", title: "Signature du devis prévue", description: "Date prévisionnelle pour la signature du devis", status: "pending" },
      { date: "2024-05-15", title: "Début des travaux", description: "Date prévisionnelle pour le début de l'installation", status: "pending" }
    ],
    messages: [
      { 
        id: "1", 
        date: "2024-01-12", 
        sender: "Pierre Leroy", 
        senderRole: "Architecte principal", 
        content: "Bonjour, suite à notre réunion, pourriez-vous m'envoyer les fiches techniques détaillées de vos panneaux isolants A+ ?",
        isRead: true,
        recipient: "bet"
      },
      { 
        id: "2", 
        date: "2024-01-13", 
        sender: "Mon Équipe", 
        senderRole: "Responsable commercial", 
        content: "Bonjour Pierre, voici les fiches techniques demandées. N'hésitez pas si vous avez besoin d'informations complémentaires.",
        isRead: true,
        recipient: "bet"
      },
      { 
        id: "3", 
        date: "2024-02-10", 
        sender: "Sophie Blanc", 
        senderRole: "Ingénieure thermicienne", 
        content: "Après analyse, vos panneaux isolants répondent parfaitement aux exigences thermiques du projet. Pourriez-vous nous préciser les délais de livraison pour une commande en mai ?",
        isRead: true,
        recipient: "bet"
      },
      { 
        id: "4", 
        date: "2024-03-01", 
        sender: "Thomas Noir", 
        senderRole: "Chef de projet", 
        content: "Suite à la validation du BET, nous souhaiterions recevoir un devis pour l'ensemble des panneaux nécessaires au projet, selon le métré joint.",
        isRead: true,
        recipient: "contractor"
      },
      { 
        id: "5", 
        date: "2024-03-02", 
        sender: "Mon Équipe", 
        senderRole: "Responsable commercial", 
        content: "Bonjour Thomas, je vous prépare ce devis dans les meilleurs délais. Avez-vous des contraintes particulières concernant les délais de livraison ?",
        isRead: true,
        recipient: "contractor"
      },
      { 
        id: "6", 
        date: "2024-02-05", 
        sender: "Jean Dupont", 
        senderRole: "Directeur de projet", 
        content: "Pouvez-vous nous indiquer si vos produits sont compatibles avec la certification HQE que nous visons sur ce projet ?",
        isRead: true,
        recipient: "promoter"
      },
      { 
        id: "7", 
        date: "2024-02-06", 
        sender: "Mon Équipe", 
        senderRole: "Directeur technique", 
        content: "Bonjour Jean, nos panneaux disposent de toutes les certifications nécessaires pour les projets HQE. Je vous fais parvenir les documents correspondants.",
        isRead: true,
        recipient: "promoter"
      }
    ],
    documents: [
      { id: "doc1", name: "Fiche technique panneaux A+.pdf", type: "technical", uploadDate: "2024-01-13", size: "2.4 MB" },
      { id: "doc2", name: "Certificat conformité RT2020.pdf", type: "certification", uploadDate: "2024-01-20", size: "1.1 MB" },
      { id: "doc3", name: "Métré détaillé projet.xlsx", type: "measurement", uploadDate: "2024-03-01", size: "850 KB" },
      { id: "doc4", name: "Devis Panneaux A+ v1.pdf", type: "quote", uploadDate: "2024-03-15", size: "1.8 MB" }
    ]
  });

  const promoterContacts = projectData.promoter.contacts;
  
  const betContacts = projectData.technicalOffices.flatMap(office => 
    office.contacts.map(contact => ({
      ...contact,
      company: office.name
    }))
  );
  
  const contractorContacts = projectData.type === 'realisation' && projectData.contractor 
    ? projectData.contractor.contacts 
    : [];
    
  const handleContactClick = (contactType: string, contactId: string) => {
    setActiveTab("communications");
    console.log(`Contact clicked: ${contactType} - ${contactId}`);
  };

  const handleTimelineChange = (newTimeline: TimelineEvent[]) => {
    setProjectData(prev => ({
      ...prev,
      timeline: newTimeline
    }));
    
    console.log('Timeline updated:', newTimeline);
    
    if (activeProfile === 'industriel') {
      toast({
        title: "Planification mise à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
    }
  };

  const ContactHoverCard = ({ contact }: { contact: any }) => {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="font-medium hover:text-primary hover:underline focus:outline-none">
            {contact.name}
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{contact.name}</h4>
              <div className="flex items-center pt-2">
                <Briefcase className="h-4 w-4 text-muted-foreground mr-1" />
                <p className="text-sm text-muted-foreground">{contact.company}</p>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 text-muted-foreground mr-1" />
                <p className="text-sm text-muted-foreground">{contact.role}</p>
              </div>
              <div className="pt-2">
                <Link 
                  to={`/contacts/${contact.name.replace(/\s+/g, '-').toLowerCase()}`}
                  className="text-sm text-primary flex items-center hover:underline"
                >
                  Voir la fiche détaillée
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <Layout>
      <div className="container p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/product-reference" className="hover:text-primary">Suivi des référencements</Link>
          <span>/</span>
          <span>Projet {projectData.name}</span>
        </div>

        <ProjectDetailHeader project={projectData} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="information">
              <Building className="w-4 h-4 mr-2" />
              Informations
            </TabsTrigger>
            <TabsTrigger value="timeline">
              <Calendar className="w-4 h-4 mr-2" />
              Suivi & Planning
            </TabsTrigger>
            <TabsTrigger value="communications">
              <MessageSquare className="w-4 h-4 mr-2" />
              Communications
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="information" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Promoteur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="font-medium text-lg mb-2">
                      <Link to={`/company-detail/${projectData.promoter.name.replace(/\s+/g, '-').toLowerCase()}`} className="text-primary hover:underline">
                        {projectData.promoter.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{projectData.type === 'conception' ? 'Maître d\'ouvrage' : 'Maître d\'ouvrage'}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Contacts</h4>
                    {projectData.promoter.contacts.map((contact, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User size={16} className="text-primary" />
                            </div>
                            <div>
                              <ContactHoverCard contact={contact} />
                              <p className="text-sm text-muted-foreground">{contact.role}</p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleContactClick('promoter', contact.name)}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Contacter
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardHat className="w-5 h-5" />
                    {projectData.type === 'conception' ? 'Entreprise Titulaire' : 'Entreprise Titulaire du Lot'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {projectData.type === 'realisation' && projectData.contractor && (
                    <div className="mb-6">
                      <h3 className="font-medium text-lg mb-2">
                        <Link to={`/company-detail/${projectData.contractor.name.replace(/\s+/g, '-').toLowerCase()}`} className="text-primary hover:underline">
                          {projectData.contractor.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">Entreprise titulaire</p>
                      
                      <div className="space-y-3 mt-3">
                        <h4 className="text-sm font-medium">Contacts</h4>
                        {projectData.contractor.contacts.map((contact, index) => (
                          <div key={index} className="border rounded-md p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <User size={16} className="text-primary" />
                                </div>
                                <div>
                                  <ContactHoverCard contact={contact} />
                                  <p className="text-sm text-muted-foreground">{contact.role}</p>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleContactClick('contractor', contact.name)}
                              >
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Contacter
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Bureaux d'Études Impliqués
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">{projectData.type === 'conception' ? 'Liste des BET' : 'Bureaux d\'Études'}</h4>
                  {projectData.technicalOffices.map((office, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <Link to={`/company-detail/${office.name.replace(/\s+/g, '-').toLowerCase()}`} className="font-medium text-primary hover:underline">
                            {office.name}
                          </Link>
                          <Badge variant="outline">{office.role}</Badge>
                        </div>
                        
                        {office.contacts.map((contact, idx) => (
                          <div key={idx} className="pl-3 border-l-2 border-muted mt-2 flex justify-between items-center">
                            <div>
                              <ContactHoverCard contact={{...contact, company: office.name}} />
                              <p className="text-xs text-muted-foreground">{contact.role}</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleContactClick('bet', contact.name)}
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Contacter
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline">
            <ReferenceTimeline 
              timeline={projectData.timeline} 
              onTimelineChange={handleTimelineChange}
            />
          </TabsContent>
          
          <TabsContent value="communications">
            <CommunicationHistory 
              messages={projectData.messages} 
              promoterContacts={promoterContacts}
              betContacts={betContacts}
              contractorContacts={contractorContacts}
            />
          </TabsContent>
          
          <TabsContent value="documents">
            <ProjectDocuments documents={projectData.documents} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
