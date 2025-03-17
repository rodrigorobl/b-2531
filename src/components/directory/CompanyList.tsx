import React, { useState, useEffect } from 'react';
import { Company, CompanyCategory, mapSupabaseCategory } from '@/types/directory';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Loader2, MapPin, Phone, Mail, Globe, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import CompanyDetailDialog from './CompanyDetailDialog';

interface CompanyListProps {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  searchQuery?: string;
  selectedCategory?: CompanyCategory | null;
}

export default function CompanyList({
  companies: ignoredCompanies,
  selectedCompany,
  setSelectedCompany,
  searchQuery = '',
  selectedCategory = null
}: CompanyListProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        console.log("Fetching companies from Supabase...");
        let query = supabase
          .from('entreprises')
          .select('*')
          .order('nom');

        if (selectedCategory) {
          let supabaseCategory;
          switch (selectedCategory) {
            case 'architecte': supabaseCategory = 'Architecte'; break;
            case 'moe_bet': supabaseCategory = 'MOE_BET'; break;
            case 'construction': supabaseCategory = 'Construction'; break;
            case 'service': supabaseCategory = 'Service'; break;
            case 'industriel': supabaseCategory = 'Industriel'; break;
            case 'fournisseur': supabaseCategory = 'Fournisseur'; break;
            default: supabaseCategory = null;
          }
          
          if (supabaseCategory) {
            query = query.eq('categorie_principale', supabaseCategory);
          }
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          console.log("Companies data retrieved:", data);
          
          const transformedCompanies = data.map(company => {
            let coordinates = { lat: 48.8566, lng: 2.3522 };
            if (company.coordinates && typeof company.coordinates === 'object') {
              const coords = company.coordinates as any;
              if (coords.lat !== undefined && coords.lng !== undefined) {
                coordinates = {
                  lat: Number(coords.lat),
                  lng: Number(coords.lng)
                };
              }
            }
            
            return {
              id: company.id,
              name: company.nom,
              logo: company.logo || 'https://github.com/shadcn.png',
              category: mapSupabaseCategory(company.categorie_principale),
              specialty: company.specialite,
              location: company.ville || 'Non spécifié',
              address: company.adresse || '',
              rating: company.note_moyenne || 0,
              reviewCount: company.nombre_avis || 0,
              description: `Entreprise spécialisée en ${company.specialite}`,
              coordinates,
              contact: {
                phone: company.telephone || '01 23 45 67 89',
                email: company.email || 'contact@example.com',
                website: company.site_web || 'www.example.com'
              },
              certifications: []
            };
          });
          
          setCompanies(transformedCompanies);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des entreprises:', err);
        toast.error('Impossible de charger les données des entreprises');
        setError('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanies();
  }, [selectedCategory]);
  
  const filteredCompanies = companies.filter(company => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      company.name.toLowerCase().includes(query) ||
      company.specialty.toLowerCase().includes(query) ||
      company.location.toLowerCase().includes(query)
    );
  });

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
          {filteredCompanies.length} entreprise{filteredCompanies.length !== 1 ? 's' : ''} trouvée{filteredCompanies.length !== 1 ? 's' : ''}
        </h2>
      </div>
      
      <div className="space-y-4">
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucune entreprise ne correspond à vos critères
          </div>
        ) : (
          filteredCompanies.map((company) => (
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
