
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, MapPin, Phone, Mail, Globe, Star, MessageSquare, Award } from 'lucide-react';
import { Company } from '@/types/directory';

interface CompanyDetailDialogProps {
  company: Company;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CompanyDetailDialog({
  company,
  open,
  onOpenChange
}: CompanyDetailDialogProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{company.name}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className={getCategoryColor(company.category)}>
                  {getCategoryLabel(company.category)}
                </Badge>
                <Badge variant="outline">
                  {company.specialty}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} className="fill-amber-500" />
                <span className="font-medium">{company.rating}</span>
                <span className="text-muted-foreground text-sm">({company.reviewCount} avis)</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <MapPin size={14} />
                <span>{company.address}</span>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-2">À propos</h3>
                <p className="text-sm text-muted-foreground">{company.description}</p>
              </div>
              
              {company.certifications.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Award size={16} />
                    Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {company.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Building size={16} />
                  Spécialité
                </h3>
                <p className="text-sm">{company.specialty}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Coordonnées</h3>
                <div className="space-y-2">
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
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Adresse</h3>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-muted-foreground mt-0.5" />
                  <span>{company.address}</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">
                  <Mail size={16} className="mr-2" />
                  Contacter cette entreprise
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Avis clients</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} className="fill-amber-500" />
                    <span className="font-medium">{company.rating}</span>
                    <span className="text-muted-foreground text-sm">({company.reviewCount})</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Avis client (fictif) */}
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">Jean Dupont</div>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < 4 ? "fill-amber-500 text-amber-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Très bonne expérience avec cette entreprise. Travail soigné et respect des délais.
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Il y a 2 mois
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">Marie Martin</div>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < 5 ? "fill-amber-500 text-amber-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Excellent service, équipe professionnelle et à l'écoute. Je recommande vivement.
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Il y a 3 mois
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <MessageSquare size={14} />
                    Voir tous les avis
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
