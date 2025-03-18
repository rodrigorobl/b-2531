
import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface ProjectMapProps {
  sites: {
    id: string;
    name: string;
    location: {
      address: string;
      lat: number;
      lng: number;
    };
  }[];
  onSiteClick?: (siteId: string) => void;
  selectedSiteId?: string;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function ProjectMap({ sites, onSiteClick, selectedSiteId }: ProjectMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBb7ikdBNJYSpoXkzOFBQlThyfMt9mJa68'
  });

  // Calculate map bounds to fit all markers
  const getBoundsFromSites = () => {
    if (sites.length === 0) return null;
    
    const bounds = new google.maps.LatLngBounds();
    sites.forEach(site => {
      bounds.extend({ lat: site.location.lat, lng: site.location.lng });
    });
    return bounds;
  };

  const handleLoad = (map: google.maps.Map) => {
    const bounds = getBoundsFromSites();
    if (bounds) {
      map.fitBounds(bounds);
      // Don't zoom in too far
      const listener = map.addListener('idle', () => {
        if (map.getZoom() && map.getZoom() > 15) {
          map.setZoom(15);
        }
        google.maps.event.removeListener(listener);
      });
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border h-full relative">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={sites.length > 0 ? { lat: sites[0].location.lat, lng: sites[0].location.lng } : { lat: 45.7578, lng: 4.8320 }}
          zoom={14}
          onLoad={handleLoad}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          }}
        >
          {sites.map(site => (
            <Marker 
              key={site.id}
              position={{ lat: site.location.lat, lng: site.location.lng }}
              title={site.name}
              onClick={() => onSiteClick && onSiteClick(site.id)}
              animation={selectedSiteId === site.id ? google.maps.Animation.BOUNCE : undefined}
              options={{
                animation: selectedSiteId === site.id ? google.maps.Animation.BOUNCE : undefined,
              }}
            />
          ))}
        </GoogleMap>
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-sm text-gray-500">
            Chargement de la carte...
          </div>
        </div>
      )}
    </div>
  );
}
