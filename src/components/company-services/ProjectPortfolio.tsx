
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Star } from 'lucide-react';
import { Project, Service } from "@/types/company-services";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ProjectPortfolioProps {
  projects: Project[];
  services: Service[];
}

export function ProjectPortfolio({ projects, services }: ProjectPortfolioProps) {
  // Helper to get service names by IDs
  const getServiceNames = (serviceIds: string[]) => {
    return serviceIds.map(id => {
      const service = services.find(s => s.id === id);
      return service ? service.name : '';
    }).filter(Boolean);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileText size={18} />
          Portfolio des projets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-1">{project.name}</h3>
                <div className="text-sm text-muted-foreground mb-3">
                  Client: {project.client} | {new Date(project.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </div>
                
                <p className="text-muted-foreground mb-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {getServiceNames(project.services).map((name, idx) => (
                    <Badge key={idx} variant="outline">{name}</Badge>
                  ))}
                </div>
                
                {project.testimonial && (
                  <>
                    <Separator className="my-3" />
                    <div className="bg-muted/50 rounded-md p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{project.testimonial.author}</div>
                        <div className="flex items-center">
                          {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < project.testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm italic">"{project.testimonial.text}"</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
