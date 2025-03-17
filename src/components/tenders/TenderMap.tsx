
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

interface ProjectLocation {
  id: string;
  nom: string;
  localisation: string;
  type_projet: string;
  statut: string;
  budget_estime: number;
  entreprises: {
    id: string;
    nom: string;
    ville: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export default function TenderMap({ tenders, selectedTenderId, onSelectTender }: TenderMapProps) {
  const [projectLocations, setProjectLocations] = useState<ProjectLocation[]>([]);
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
  
  // Récupérer les données des projets et leurs localisations depuis Supabase
  useEffect(() => {
    const fetchProjectLocations = async () => {
      try {
        const { data, error } = await supabase
          .from('projets')
          .select(`
            id,
            nom,
            localisation,
            type_projet,
            statut,
            budget_estime,
            entreprises!inner(
              id,
              nom,
              ville,
              coordinates
            )
          `)
          .limit(10);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setProjectLocations(data as ProjectLocation[]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des localisations:', error);
      }
    };
    
    fetchProjectLocations();
  }, []);

  // Set active marker when selected tender changes
  useEffect(() => {
    if (selectedTenderId) {
      setActiveMarker(selectedTenderId);
    }
  }, [selectedTenderId]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return '#3b82f6'; // blue
      case 'Attribué': return '#10b981'; // green
      case 'Clôturé': return '#6b7280'; // gray
      default: return '#6b7280';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'En cours': return 'En cours';
      case 'Attribué': return 'Attribué';
      case 'Clôturé': return 'Clôturé';
      default: return status;
    }
  };
  
  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(budget);
  };

  const handleMarkerClick = (projectId: string) => {
    setActiveMarker(projectId);
    
    // Find the matching tender and select it
    const matchingTender = tenders.find(t => t.projectName === 
      projectLocations.find(p => p.id === projectId)?.nom);
    
    if (matchingTender) {
      onSelectTender(matchingTender.id);
    }
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
        {projectLocations.map((project) => {
          if (project.entreprises && project.entreprises.coordinates) {
            const coordinates = project.entreprises.coordinates;
            
            return (
              <Marker
                key={project.id}
                position={{
                  lat: coordinates.lat,
                  lng: coordinates.lng
                }}
                onClick={() => handleMarkerClick(project.id)}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: getStatusColor(project.statut),
                  fillOpacity: 1,
                  strokeColor: 'white',
                  strokeWeight: 2,
                }}
              >
                {activeMarker === project.id && (
                  <InfoWindow
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div style={{ padding: '5px', maxWidth: '200px' }}>
                      <strong>{project.nom}</strong><br/>
                      <span>{project.type_projet}</span><br/>
                      <span>Budget: {formatBudget(project.budget_estime)}</span><br/>
                      <span style={{ color: getStatusColor(project.statut) }}>
                        {getStatusLabel(project.statut)}
                      </span>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          }
          return null;
        })}
      </GoogleMap>
      
      {projectLocations.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center p-6">
            <MapIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Aucun projet à afficher</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Aucun projet avec des coordonnées géographiques n'a été trouvé.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
