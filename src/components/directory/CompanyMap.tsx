import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Company } from '@/types/directory';

interface CompanyMapProps {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 46.6033,
  lng: 2.3522
};

export default function CompanyMap({
  companies,
  selectedCompany,
  setSelectedCompany
}: CompanyMapProps) {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBb7ikdBNJYSpoXkzOFBQlThyfMt9mJa68'
  });

  // Fonction pour obtenir la couleur du marqueur en fonction de la catégorie
  const getMarkerColor = (category: string) => {
    switch (category) {
      case 'architecte': return '#f59e0b';
      case 'bureau-etudes': return '#3b82f6';
      case 'construction': return '#10b981';
      case 'services': return '#8b5cf6';
      case 'industriel': return '#ef4444';
      case 'fournisseur': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  // Fit bounds to contain all markers when companies change or map loads
  useEffect(() => {
    if (mapRef && companies.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      companies.forEach(company => {
        bounds.extend({ lat: company.coordinates.lat, lng: company.coordinates.lng });
      });
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, companies]);

  // Center map on selected company
  useEffect(() => {
    if (selectedCompany && mapRef) {
      const { lng, lat } = selectedCompany.coordinates;
      mapRef.panTo({ lat, lng });
      mapRef.setZoom(14);
      setInfoWindowOpen(selectedCompany.id);
    }
  }, [selectedCompany, mapRef]);

  return (
    <div className="relative w-full h-full">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={5}
          onLoad={onMapLoad}
          options={{
            styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
          }}
        >
          {companies.map(company => (
            <Marker
              key={company.id}
              position={{ lat: company.coordinates.lat, lng: company.coordinates.lng }}
              onClick={() => {
                setSelectedCompany(company);
                setInfoWindowOpen(company.id);
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: getMarkerColor(company.category),
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
              }}
            />
          ))}

          {infoWindowOpen && companies.map(company => (
            company.id === infoWindowOpen && (
              <InfoWindow
                key={`info-${company.id}`}
                position={{ lat: company.coordinates.lat, lng: company.coordinates.lng }}
                onCloseClick={() => setInfoWindowOpen(null)}
              >
                <div className="p-2">
                  <strong>{company.name}</strong><br/>
                  {company.specialty}<br/>
                  <span style={{ fontSize: '12px', color: '#666' }}>{company.location}</span>
                </div>
              </InfoWindow>
            )
          ))}
        </GoogleMap>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="bg-card p-4 rounded-lg shadow-lg max-w-md text-center">
            <h3 className="font-medium mb-2">Chargement de la carte</h3>
            <p className="text-sm text-muted-foreground">
              Veuillez patienter pendant le chargement de l'API Google Maps...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
