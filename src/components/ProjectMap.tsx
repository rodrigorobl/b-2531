
import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface ProjectMapProps {
  location: {
    address: string;
    lat: number;
    lng: number;
  };
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function ProjectMap({ location }: ProjectMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBb7ikdBNJYSpoXkzOFBQlThyfMt9mJa68'
  });

  return (
    <div className="rounded-lg overflow-hidden border border-border h-40 relative">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: location.lat, lng: location.lng }}
          zoom={14}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          <Marker position={{ lat: location.lat, lng: location.lng }} />
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
