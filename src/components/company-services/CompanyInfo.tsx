
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Phone, Mail, Globe, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ServiceCompany } from "@/types/company-services";

interface CompanyInfoProps {
  company: ServiceCompany;
  onContactClick: () => void;
}

export function CompanyInfo({ company, onContactClick }: CompanyInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="h-12 w-12 object-contain" 
              />
            ) : (
              <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                <Building size={24} />
              </div>
            )}
            <CardTitle className="text-xl">{company.name}</CardTitle>
          </div>
          <Button onClick={onContactClick}>Demander un devis</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">{company.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-muted-foreground" />
              <span>{company.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-muted-foreground" />
              <a href={`mailto:${company.contact.email}`} className="text-primary hover:underline">
                {company.contact.email}
              </a>
            </div>
            {company.contact.website && (
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-muted-foreground" />
                <a 
                  href={company.contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  Site web <ExternalLink size={12} />
                </a>
              </div>
            )}
            {company.contact.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={16} className="text-muted-foreground" />
                <a 
                  href={company.contact.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  LinkedIn <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
