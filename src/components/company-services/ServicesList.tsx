
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Info, CheckCircle, Euro } from 'lucide-react';
import { Service } from "@/types/company-services";
import { Badge } from '@/components/ui/badge';

interface ServicesListProps {
  services: Service[];
  onRequestQuote: (serviceId: string) => void;
}

export function ServicesList({ services, onRequestQuote }: ServicesListProps) {
  const formatPrice = (service: Service) => {
    switch (service.price.type) {
      case 'fixed':
        return `${service.price.value} ${service.price.unit || ''}`;
      case 'range':
        return `${service.price.value} ${service.price.unit || ''}`;
      case 'quote':
        return 'Sur devis';
      default:
        return 'Prix sur demande';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Services proposés</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-medium">{service.name}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  
                  <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Euro size={16} className="text-muted-foreground" />
                      <span>Prix: <span className="font-medium">{formatPrice(service)}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <span>Durée: <span className="font-medium">{service.duration.value}</span></span>
                    </div>
                  </div>
                  
                  {service.requirements && service.requirements.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Info size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium">Certifications et exigences:</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pl-6">
                        {service.requirements.map((req, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <CheckCircle size={12} />
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 min-w-[120px]">
                  <Button 
                    onClick={() => onRequestQuote(service.id)}
                    className="w-full"
                  >
                    Demander un devis
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
