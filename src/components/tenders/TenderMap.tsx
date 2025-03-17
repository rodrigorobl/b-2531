
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { TenderSearchResult } from '@/pages/TenderSearch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Building, Star } from 'lucide-react';
import TenderViewModeSelector from './TenderViewModeSelector';
import TenderFilterSortMenu from './TenderFilterSortMenu';

interface TenderMapProps {
  tenders: TenderSearchResult[];
  onSelectTender: (tenderId: string) => void;
  selectedTenderId: string | null;
  onViewModeChange: (mode: 'grid' | 'list' | 'map') => void;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Coordonnées des villes françaises (exemples)
const cityCoordinates: Record<string, { lat: number, lng: number }> = {
  'Paris': { lat: 48.8566, lng: 2.3522 },
  'Lyon': { lat: 45.7640, lng: 4.8357 },
  'Marseille': { lat: 43.2965, lng: 5.3698 },
  'Nantes': { lat: 47.2184, lng: -1.5534 },
  'Nice': { lat: 43.7102, lng: 7.2620 },
  'Bordeaux': { lat: 44.8378, lng: -0.5792 },
  'Toulouse': { lat: 43.6047, lng: 1.4442 },
  'Lille': { lat: 50.6292, lng: 3.0573 },
  'Strasbourg': { lat: 48.5734, lng: 7.7521 },
  'Montpellier': { lat: 43.6108, lng: 3.8767 }
};

const TenderMap = ({ tenders, onSelectTender, selectedTenderId, onViewModeChange }: TenderMapProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'location'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBb7ikdBNJYSpoXkzOFBQlThyfMt9mJa68'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#f59e0b'; // amber-500
      case 'closed': return '#6b7280'; // gray-500
      case 'assigned': return '#10b981'; // green-500
      default: return '#6b7280'; // gray-500
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'En cours';
      case 'closed': return 'Clôturé';
      case 'assigned': return 'Attribué';
      default: return 'Inconnu';
    }
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  // Fit bounds to contain all markers when tenders change or map loads
  useEffect(() => {
    if (mapRef && tenders.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      tenders.forEach(tender => {
        const coords = cityCoordinates[tender.location];
        if (coords) {
          bounds.extend(coords);
        }
      });
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, tenders]);

  // Center map on selected tender
  useEffect(() => {
    if (selectedTenderId && mapRef) {
      const selectedTender = tenders.find(tender => tender.id === selectedTenderId);
      if (selectedTender) {
        const coords = cityCoordinates[selectedTender.location];
        if (coords) {
          mapRef.panTo(coords);
          mapRef.setZoom(8);
          setInfoWindowOpen(selectedTenderId);
        }
      }
    }
  }, [selectedTenderId, tenders, mapRef]);

  return (
    <div className="flex-1 rounded-lg shadow-sm mr-4 overflow-hidden flex flex-col">
      {/* En-tête avec le sélecteur de vue et les filtres */}
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {tenders.length} appels d'offres trouvés
        </div>
        
        <div className="flex items-center gap-2">
          <TenderViewModeSelector 
            viewMode="map" 
            onViewModeChange={onViewModeChange} 
          />
          
          <TenderFilterSortMenu
            sortBy={sortBy}
            sortDirection={sortDirection}
            setSortBy={setSortBy}
            setSortDirection={setSortDirection}
          />
        </div>
      </div>

      {/* Liste des tenders sur le côté */}
      <div className="h-1/3 overflow-auto p-3 border-b bg-white">
        <h3 className="text-sm font-medium mb-2">Résultats ({tenders.length})</h3>
        <div className="space-y-2">
          {tenders.map(tender => (
            <Card 
              key={tender.id}
              className={`cursor-pointer p-2 ${selectedTenderId === tender.id ? 'border-primary' : ''}`}
              onClick={() => onSelectTender(tender.id)}
            >
              <CardContent className="p-0">
                <div className="text-sm font-medium mb-1">{tender.projectName}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Building size={12} />
                  <span>{tender.projectType}</span>
                  <span>•</span>
                  <MapPin size={12} />
                  <span>{tender.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-xs">
                    <Calendar size={12} className="text-muted-foreground" />
                    <span>{tender.deadline}</span>
                  </div>
                  <Badge
                    className={`text-xs ${
                      tender.status === 'open' 
                        ? 'bg-amber-500' 
                        : tender.status === 'assigned' 
                          ? 'bg-green-600' 
                          : 'bg-gray-500'
                    }`}
                  >
                    {getStatusText(tender.status)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Carte Google Maps */}
      <div className="h-2/3 relative">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 46.227638, lng: 2.213749 }} // Centre de la France
            zoom={5}
            onLoad={onMapLoad}
            options={{
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
            }}
          >
            {tenders.map(tender => {
              const coords = cityCoordinates[tender.location];
              if (!coords) return null;
              
              return (
                <React.Fragment key={tender.id}>
                  <Marker
                    position={coords}
                    onClick={() => {
                      onSelectTender(tender.id);
                      setInfoWindowOpen(tender.id);
                    }}
                    icon={{
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 10,
                      fillColor: getStatusColor(tender.status),
                      fillOpacity: 1,
                      strokeColor: '#FFFFFF',
                      strokeWeight: 2,
                    }}
                    animation={selectedTenderId === tender.id ? google.maps.Animation.BOUNCE : undefined}
                    title={tender.projectName} // Tooltip quand on survole le marqueur
                  />
                  
                  {(infoWindowOpen === tender.id || selectedTenderId === tender.id) && (
                    <InfoWindow
                      position={coords}
                      onCloseClick={() => setInfoWindowOpen(null)}
                    >
                      <div style={{ width: '250px', padding: '8px' }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{tender.projectName}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px', fontSize: '12px', color: '#666' }}>
                          <span>{tender.projectType}</span>
                          <span style={{ margin: '0 4px' }}>•</span>
                          <span>{tender.location}</span>
                          <span style={{ margin: '0 4px' }}>•</span>
                          <span>{tender.budget}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#666', marginBottom: '6px' }}>
                          {tender.description.length > 100 
                            ? tender.description.substring(0, 100) + '...' 
                            : tender.description}
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '12px' }}>
                          <span style={{ padding: '2px 6px', borderRadius: '9999px', backgroundColor: getStatusColor(tender.status), color: 'white', fontSize: '11px' }}>
                            {getStatusText(tender.status)}
                          </span>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </React.Fragment>
              );
            })}
          </GoogleMap>
        ) : (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white p-4 text-center z-10">
            <div>
              <p className="mb-2 font-bold">Chargement de la carte</p>
              <p className="text-sm">
                Veuillez patienter pendant le chargement de Google Maps...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenderMap;
