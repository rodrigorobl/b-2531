
import React from 'react';
import { Building, MapPin, Star, Phone, Mail, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Company } from '@/types/directory';
import { useNavigate } from 'react-router-dom';

interface QuotedCompanyListProps {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
}

export default function QuotedCompanyList({
  companies,
  selectedCompany,
  setSelectedCompany
}: QuotedCompanyListProps) {
  const navigate = useNavigate();
  
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
  
  const handleShowDetail = (company: Company) => {
    // Navigate to company detail page
    navigate(`/company-detail/${company.id}`);
  };
  
  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">
          {companies.length} entreprise{companies.length !== 1 ? 's' : ''} trouvée{companies.length !== 1 ? 's' : ''}
        </h2>
      </div>
      
      <div className="space-y-4">
        {companies.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucune entreprise ne correspond à vos critères
          </div>
        ) : (
          companies.map((company) => (
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
                        <span className="font-medium">{company.rating}</span>
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
    </div>
  );
}
