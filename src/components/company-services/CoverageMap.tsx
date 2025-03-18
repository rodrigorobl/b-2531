
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from 'lucide-react';
import ProjectMap from '@/components/ProjectMap';
import { Badge } from '@/components/ui/badge';

interface CoverageMapProps {
  regions: string[];
  cities?: string[];
  description?: string;
  centerLocation: {
    lat: number;
    lng: number;
  };
}

export function CoverageMap({ regions, cities, description, centerLocation }: CoverageMapProps) {
  // For a real implementation, you would convert regions/cities to actual coordinates
  // Here we're just showing a sample map centered on the company location

  // Create mock sites for visualization (in a real app, these would be actual coverage areas)
  const coverageSites = regions.map((region, index) => ({
    id: `region-${index}`,
    name: region,
    location: {
      address: region,
      // This is just for demo - normally you'd have real coordinates for each region
      lat: centerLocation.lat + (Math.random() - 0.5) * 0.5,
      lng: centerLocation.lng + (Math.random() - 0.5) * 0.5
    }
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MapPin size={18} />
          Zone d'intervention
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {regions.map((region, index) => (
              <Badge key={index} variant="secondary">
                {region}
              </Badge>
            ))}
            {cities && cities.map((city, index) => (
              <Badge key={`city-${index}`} variant="outline">
                {city}
              </Badge>
            ))}
          </div>
          
          <div className="h-[400px] border rounded-lg overflow-hidden">
            <ProjectMap 
              sites={coverageSites}
              selectedSiteId={null}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
