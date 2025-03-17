
import React, { useState, useEffect } from 'react';
import { Building, MapPin, Star, Phone, Mail, ExternalLink, Award, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Company } from '@/types/directory';
import CompanyDetailDialog from './CompanyDetailDialog';
import { supabase } from '@/integrations/supabase/client';

interface CompanyListProps {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
}

interface SupabaseCompany {
  id: string;
  nom: string;
  categorie_principale: string;
  specialite: string;
  ville: string;
  adresse: string;
  region: string;
  pays: string;
  telephone: string;
  email: string;
  site_web: string;
  logo: string;
  note_moyenne: number;
  nombre_avis: number;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
}

export default function CompanyList({
  companies,
  selectedCompany,
  setSelectedCompany
}: CompanyListProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supabaseCompanies, setSupabaseCompanies] = useState<SupabaseCompany[]>([]);
  
  // Récupérer les entreprises depuis Supabase
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('entreprises')
          .select('*')
          .order('nom');
        
        if (error) throw error;
        
        if (data) {
          setSupabaseCompanies(data as unknown as SupabaseCompany[]);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des entreprises:', err);
        setError('Impossible de charger les données des entreprises');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanies();
  }, []);

  // Mapper les entreprises Supabase au format Company pour l'interface
  const mapSupabaseToCompanies = (): Company[] => {
    return supabaseCompanies.map(company => ({
      id: company.id,
      name: company.nom,
      logo: company.logo || 'https://github.com/shadcn.png', // Logo par défaut si null
      category: company.categorie_principale.toLowerCase() as any,
      specialty: company.specialite,
      location: company.ville || 'Non spécifié',
      address: company.adresse || '',
      rating: company.note_moyenne,
      reviewCount: company.nombre_avis,
      description: `Entreprise spécialisée en ${company.specialite}`,
      coordinates: company.coordinates || { lat: 48.8566, lng: 2.3522 }, // Default to Paris if no coordinates
      contact: {
        phone: company.telephone || '01 23 45 67 89',
        email: company.email || 'contact@example.com',
        website: company.site_web || 'www.example.com'
      },
      certifications: []
    }));
  };
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'architecte': return 'Architecte';
      case 'moe_bet': return 'Bureau d\'études';
      case 'construction': return 'Construction';
      case 'service': return 'Services';
      case 'industriel': return 'Industriel';
      case 'fournisseur': return 'Fournisseur';
      default: return category;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'architecte': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'moe_bet': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'construction': return 'bg-green-100 text-green-800 border-green-200';
      case 'service': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'industriel': return 'bg-red-100 text-red-800 border-red-200';
      case 'fournisseur': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const handleShowDetail = (company: Company) => {
    setSelectedCompany(company);
    setShowDetail(true);
  };

  const displayCompanies = mapSupabaseToCompanies();
  
  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement des entreprises...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Erreur de chargement</h3>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">
          {displayCompanies.length} entreprise{displayCompanies.length !== 1 ? 's' : ''} trouvée{displayCompanies.length !== 1 ? 's' : ''}
        </h2>
      </div>
      
      <div className="space-y-4">
        {displayCompanies.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucune entreprise ne correspond à vos critères
          </div>
        ) : (
          displayCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row p-4">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{company.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline" className={getCategoryColor(company.category)}>
                            {getCategoryLabel(company.category)}
                          </Badge>
                          <Badge variant="outline">
                            {company.specialty}
                          </Badge>
                          {company.certifications.length > 0 && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Award size={12} />
                              {company.certifications.length} certification{company.certifications.length > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={16} className="fill-amber-500" />
                        <span className="font-medium">{company.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-sm">({company.reviewCount})</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin size={14} />
                      <span>{company.location}</span>
                    </div>
                    
                    <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {company.description}
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Phone size={14} />
                        <span>{company.contact.phone}</span>
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Mail size={14} />
                        <span>Contacter</span>
                      </Button>
                      <Button size="sm" onClick={() => handleShowDetail(company)}>
                        Voir le profil
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {selectedCompany && (
        <CompanyDetailDialog 
          company={selectedCompany} 
          open={showDetail} 
          onOpenChange={setShowDetail} 
        />
      )}
    </div>
  );
}
