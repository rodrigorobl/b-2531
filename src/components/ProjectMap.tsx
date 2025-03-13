
import React from 'react';

interface ProjectMapProps {
  location: {
    address: string;
    lat: number;
    lng: number;
  };
}

export default function ProjectMap({ location }: ProjectMapProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-border h-40 relative">
      {/* This would be replaced with an actual map integration */}
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <div className="text-sm text-gray-500">
          Carte interactive: {location.address}
        </div>
      </div>
      {/* Map location pin */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
      </div>
    </div>
  );
}
