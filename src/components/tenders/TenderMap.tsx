
import React, { useEffect, useState } from 'react';
import { TenderSearchResult } from '@/types/tenders';
import { Card, CardContent } from '@/components/ui/card';
import { MapIcon, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';

interface TenderMapProps {
  tenders: TenderSearchResult[];
  selectedTenderId: string | null;
  onSelectTender: (tenderId: string) => void;
}

interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
  budget: string;
  projectType: string;
}

export default function TenderMap({ tenders, selectedTenderId, onSelectTender }: TenderMapProps) {
  const [mapLocations, setMapLocations] = useState<MapLocation[]>([]);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBb7ikdBNJYSpoXkzOFBQlThyfMt9mJa68',
  });

  // Styles for the Google Map container
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };
  
  // Default center (France)
  const center = {
    lat: 46.6033,
    lng: 2.3522,
  };
  
  // Create dummy locations from tender data for demonstration
  useEffect(() => {
    if (tenders.length > 0) {
      // Create mock coordinates for each tender (for demonstration)
      const locations: MapLocation[] = tenders.map((tender, index) => {
        // Generate random offsets around the center of France
        const latOffset = (Math.random() - 0.5) * 8;
        const lngOffset = (Math.random() - 0.5) * 8;
        
        return {
          id: tender.id,
          name: tender.projectName,
          lat: center.lat + latOffset,
          lng: center.lng + lngOffset,
          status: tender.status,
          budget: tender.budget,
          projectType: tender.projectType
        };
      });
      
      setMapLocations(locations);
    } else {
      setMapLocations([]);
    }
  }, [tenders]);

  // Set active marker when selected tender changes
  useEffect(() => {
    if (selectedTenderId) {
      setActiveMarker(selectedTenderId);
    }
  }, [selectedTenderId]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#3b82f6'; // blue
      case 'assigned': return '#10b981'; // green
      case 'closed': return '#6b7280'; // gray
      default: return '#6b7280';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'En cours';
      case 'assigned': return 'Attribué';
      case 'closed': return 'Clôturé';
      default: return status;
    }
  };

  const handleMarkerClick = (tenderId: string) => {
    setActiveMarker(tenderId);
    onSelectTender(tenderId);
  };

  // If API key is not valid or Google Maps failed to load
  if (loadError) {
    return (
      <div className="w-full h-full">
        <Card className="h-full border-dashed flex items-center justify-center">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-medium">Erreur de chargement</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Impossible de charger la carte Google Maps. Veuillez vérifier votre connexion internet ou la clé API.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!isLoaded) {
    return (
      <div className="w-full h-full">
        <Card className="h-full border-dashed flex items-center justify-center">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-medium">Chargement de la carte</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Veuillez patienter pendant le chargement de la carte Google Maps.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={center}
        options={{
          fullscreenControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: true,
        }}
      >
        {mapLocations.map((location) => (
          <Marker
            key={location.id}
            position={{
              lat: location.lat,
              lng: location.lng
            }}
            onClick={() => handleMarkerClick(location.id)}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: getStatusColor(location.status),
              fillOpacity: 1,
              strokeColor: 'white',
              strokeWeight: 2,
            }}
          >
            {activeMarker === location.id && (
              <InfoWindow
                onCloseClick={() => setActiveMarker(null)}
              >
                <div style={{ padding: '5px', maxWidth: '200px' }}>
                  <strong>{location.name}</strong><br/>
                  <span>{location.projectType}</span><br/>
                  <span>Budget: {location.budget}</span><br/>
                  <span style={{ color: getStatusColor(location.status) }}>
                    {getStatusLabel(location.status)}
                  </span>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
      
      {mapLocations.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center p-6">
            <MapIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Aucun projet à afficher</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Aucun projet correspondant à vos critères de recherche n'a été trouvé.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
