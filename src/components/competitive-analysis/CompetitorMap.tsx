
import React, { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface CompetitorMapProps {
  region: string;
  timeRange: string;
  projectType: string;
}

const CompetitorMap = ({ region, timeRange, projectType }: CompetitorMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Mock implementation - in a real app, you would use the Mapbox API
    // This is a placeholder to show how the component would be structured
    const initMap = async () => {
      try {
        if (!mapContainer.current) return;
        
        // In a real implementation, we would initialize the map here
        // For now, we'll just show a placeholder message
        const placeholderEl = document.createElement('div');
        placeholderEl.className = 'flex items-center justify-center h-full w-full bg-muted/30 rounded-lg text-muted-foreground';
        placeholderEl.innerHTML = `
          <div class="text-center">
            <p>Carte interactive des projets</p>
            <p class="text-sm mt-2">Filtre actif: ${region !== 'all' ? region : 'Toutes les régions'}</p>
            <p class="text-sm">Cette carte afficherait les emplacements des projets et la concentration des concurrents par région.</p>
          </div>
        `;
        
        mapContainer.current.innerHTML = '';
        mapContainer.current.appendChild(placeholderEl);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };
    
    initMap();
    
    // Cleanup function
    return () => {
      if (mapContainer.current) {
        mapContainer.current.innerHTML = '';
      }
    };
  }, [region, timeRange, projectType]);

  return <div ref={mapContainer} className="w-full h-full rounded-lg border"></div>;
};

export default CompetitorMap;
