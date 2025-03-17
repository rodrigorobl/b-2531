
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Company } from '@/types/directory';

interface CompanyMapProps {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
}

export default function CompanyMap({
  companies,
  selectedCompany,
  setSelectedCompany
}: CompanyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  // À remplacer par votre token Mapbox
  const mapboxToken = "REMPLACEZ_PAR_VOTRE_TOKEN_MAPBOX";
  
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

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [2.3522, 46.6033], // Centre de la France
        zoom: 5
      });
      
      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
    }
    
    // Wait for map to load
    map.current.on('load', () => {
      // Clear existing markers
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};
      
      // Add markers for each company
      companies.forEach((company) => {
        const { lng, lat } = company.coordinates;
        
        // Create a DOM element for the marker
        const el = document.createElement('div');
        el.className = 'company-marker';
        el.style.backgroundColor = getMarkerColor(company.category);
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        
        // Create and add the marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <strong>${company.name}</strong><br/>
                ${company.specialty}<br/>
                <span style="font-size: 12px; color: #666;">${company.location}</span>
              `)
          )
          .addTo(map.current!);
        
        // Add click handler
        el.addEventListener('click', () => {
          setSelectedCompany(company);
        });
        
        // Store the marker reference
        markersRef.current[company.id] = marker;
      });
      
      // If there are companies, fit the map to show all markers
      if (companies.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        companies.forEach(company => {
          bounds.extend([company.coordinates.lng, company.coordinates.lat]);
        });
        map.current!.fitBounds(bounds, { padding: 50 });
      }
    });
    
    return () => {
      // Don't destroy the map on unmount, just clean up markers
    };
  }, [companies, setSelectedCompany]);
  
  // Center map on selected company
  useEffect(() => {
    if (selectedCompany && map.current) {
      const { lng, lat } = selectedCompany.coordinates;
      map.current.flyTo({
        center: [lng, lat],
        zoom: 14,
        duration: 1000
      });
      
      // Open popup for selected company
      const marker = markersRef.current[selectedCompany.id];
      if (marker) {
        marker.togglePopup();
      }
    }
  }, [selectedCompany]);
  
  return (
    <div className="relative w-full h-full">
      <style jsx>{`
        .mapboxgl-popup-content {
          padding: 15px;
          border-radius: 8px;
        }
      `}</style>
      <div ref={mapContainer} className="absolute inset-0" />
      
      {mapboxToken === "REMPLACEZ_PAR_VOTRE_TOKEN_MAPBOX" && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="bg-card p-4 rounded-lg shadow-lg max-w-md text-center">
            <h3 className="font-medium mb-2">Configuration requise</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Pour afficher la carte, vous devez obtenir un token Mapbox et le remplacer 
              dans le fichier CompanyMap.tsx.
            </p>
            <a 
              href="https://account.mapbox.com/auth/signup/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              Obtenir un token Mapbox
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
