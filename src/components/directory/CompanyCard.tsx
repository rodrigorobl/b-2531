
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Star, Award } from 'lucide-react';
import { Company } from '@/types/directory';

interface CompanyCardProps {
  company: Company;
  onShowDetail: (company: Company) => void;
}

export const getCategoryLabel = (category: string) => {
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

export const getCategoryColor = (category: string) => {
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

export default function CompanyCard({ company, onShowDetail }: CompanyCardProps) {
  return (
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
              <Button size="sm" onClick={() => onShowDetail(company)}>
                Voir le profil
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
