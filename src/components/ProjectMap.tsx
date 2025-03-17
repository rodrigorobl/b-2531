
import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface ProjectMapProps {
  location: {
    address: string;
    lat: number;
    lng: number;
  };
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

export default function ProjectMap({ location }: ProjectMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBb7ikdBNJYSpoXkzOFBQlThyfMt9mJa68',
  });

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={{ lat: location.lat, lng: location.lng }}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        <Marker
          position={{ lat: location.lat, lng: location.lng }}
          animation={window.google.maps.Animation.DROP}
        />
      </GoogleMap>
    );
  };

  if (loadError) {
    return (
      <div className="rounded-lg overflow-hidden border border-border h-40 relative">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-sm text-red-500">
            Erreur de chargement de la carte
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border h-40 relative">
      {!isLoaded ? (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-sm text-gray-500">
            Chargement de la carte: {location.address}
          </div>
        </div>
      ) : (
        renderMap()
      )}
    </div>
  );
}
