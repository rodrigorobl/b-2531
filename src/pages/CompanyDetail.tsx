
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Star, 
  FileText, 
  Award, 
  Briefcase,
  TrendingUp,
  Shield,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import CompanyProjects from '@/components/quoted-directory/CompanyProjects';
import CompanyTeamMembers from '@/components/quoted-directory/CompanyTeamMembers';
import CompanyRatings from '@/components/quoted-directory/CompanyRatings';
import CompanyFinancials from '@/components/quoted-directory/CompanyFinancials';

export default function CompanyDetail() {
  const { companyId } = useParams<{ companyId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, you would fetch company data based on companyId
  // For now, we'll use a mock company object
  const company = {
    id: companyId || '1',
    name: 'Architecture Moderne',
    logo: 'https://github.com/shadcn.png',
    category: 'architecte',
    specialty: 'Logement',
    location: 'Paris',
    address: '15 Rue de la Paix, 75001 Paris',
    rating: 4.8,
    reviewCount: 24,
    description: 'Cabinet d\'architecture spécialisé dans les bâtiments résidentiels modernes et écologiques.',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    contact: {
      phone: '01 23 45 67 89',
      email: 'contact@architecture-moderne.fr',
      website: 'www.architecture-moderne.fr'
    },
    certifications: ['HQE', 'BREEAM', 'ISO 14001'],
    presentation: 'Fondée en 2010 à Paris, Architecture Moderne s\'est imposée comme un acteur majeur de l\'architecture écologique en Île-de-France. Forte d\'une équipe de 15 architectes certifiés, notre cabinet accompagne particuliers et professionnels dans la conception de bâtiments à haute performance énergétique.\n\nNotre expertise couvre la conception d\'habitations passives, la rénovation énergétique, et l\'aménagement d\'espaces urbains durables. Chaque projet est mené avec rigueur, de l\'étude technique initiale jusqu\'à la livraison finale, en privilégiant l\'intégration environnementale et le confort des utilisateurs.\n\nAvec plus de 200 projets réalisés et un taux de satisfaction client de 98%, Architecture Moderne s\'engage à vous offrir des solutions architecturales innovantes, esthétiques et respectueuses de l\'environnement.',
    financials: {
      solvabilityScore: 82,
      administrativeScore: 91,
      lastUpdated: '2023-05-15'
    }
  };
  
  // Get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'architecte': return 'Architecte';
      case 'bureau-etudes': return 'Bureau d\'études';
      case 'construction': return 'Construction';
      case 'services': return 'Services';
      case 'industriel': return 'Industriel';
      case 'fournisseur': return 'Fournisseur';
      default: return category;
    }
  };
  
  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'architecte': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'bureau-etudes': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'construction': return 'bg-green-100 text-green-800 border-green-200';
      case 'services': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'industriel': return 'bg-red-100 text-red-800 border-red-200';
      case 'fournisseur': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white py-6 px-4 border-b sticky top-0 z-10">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{company.name}</h1>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={20} className="fill-amber-500" />
                      <span className="font-medium text-lg">{company.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={getCategoryColor(company.category)}>
                      {getCategoryLabel(company.category)}
                    </Badge>
                    <Badge variant="outline">
                      {company.specialty}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin size={14} />
                      <span>{company.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Mail size={16} />
                  Contacter
                </Button>
                <Button className="flex items-center gap-1">
                  <Briefcase size={16} />
                  Inviter à un AO
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Tabs */}
        <div className="container mx-auto py-6 px-4">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Présentation</TabsTrigger>
              <TabsTrigger value="team">Membres</TabsTrigger>
              <TabsTrigger value="projects">Projets</TabsTrigger>
              <TabsTrigger value="ratings">Notation & Avis</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            {/* Présentation tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Présentation */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building size={18} />
                      Présentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-line">
                      {company.presentation}
                    </div>
                    
                    {company.certifications.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                          <Award size={18} />
                          Certifications
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {company.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-sm py-1">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Information financière */}
                <div className="space-y-6">
                  <CompanyFinancials financials={company.financials} />
                  
                  {/* Coordonnées */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Phone size={16} />
                        Coordonnées
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-muted-foreground" />
                        <span>{company.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-muted-foreground" />
                        <span>{company.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-muted-foreground" />
                        <span>{company.contact.email}</span>
                      </div>
                      {company.contact.website && (
                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-muted-foreground" />
                          <a 
                            href={`https://${company.contact.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {company.contact.website}
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Membres tab */}
            <TabsContent value="team">
              <CompanyTeamMembers companyId={company.id} />
            </TabsContent>
            
            {/* Projets tab */}
            <TabsContent value="projects">
              <CompanyProjects companyId={company.id} />
            </TabsContent>
            
            {/* Notation & Avis tab */}
            <TabsContent value="ratings">
              <CompanyRatings companyId={company.id} />
            </TabsContent>
            
            {/* Documents tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Aucun document disponible
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
