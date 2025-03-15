
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { TenderSearchResult } from '@/pages/TenderSearch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Building, Star } from 'lucide-react';

interface TenderMapProps {
  tenders: TenderSearchResult[];
  onSelectTender: (tenderId: string) => void;
  selectedTenderId: string | null;
}

// Vous devrez remplacer cette clé par votre propre clé Mapbox
const MAPBOX_TOKEN = 'VOTRE_CLE_MAPBOX_ICI';

const TenderMap = ({ tenders, onSelectTender, selectedTenderId }: TenderMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const popupRefs = useRef<{ [key: string]: mapboxgl.Popup }>({});

  // Coordonnées des villes françaises (exemples)
  const cityCoordinates: Record<string, [number, number]> = {
    'Paris': [2.3522, 48.8566],
    'Lyon': [4.8357, 45.7640],
    'Marseille': [5.3698, 43.2965],
    'Nantes': [-1.5534, 47.2184],
    'Nice': [7.2620, 43.7102],
    'Bordeaux': [-0.5792, 44.8378],
    'Toulouse': [1.4442, 43.6047],
    'Lille': [3.0573, 50.6292],
    'Strasbourg': [7.7521, 48.5734],
    'Montpellier': [3.8767, 43.6108]
  };

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

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialiser la carte Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [2.213749, 46.227638], // Centre de la France
      zoom: 5
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Ajouter les marqueurs quand la carte est chargée ou quand les tenders changent
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Supprimer les popups existantes
    Object.values(popupRefs.current).forEach(popup => popup.remove());
    popupRefs.current = {};

    // Ajouter les nouveaux marqueurs
    tenders.forEach(tender => {
      const coords = cityCoordinates[tender.location];
      if (!coords) return;

      // Créer un élément pour le marqueur
      const el = document.createElement('div');
      el.className = 'tender-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = getStatusColor(tender.status);
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';
      
      if (selectedTenderId === tender.id) {
        el.style.transform = 'scale(1.3)';
        el.style.zIndex = '10';
      }

      // Créer une popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
        <div style="width: 250px; padding: 8px;">
          <h3 style="font-weight: bold; margin-bottom: 4px;">${tender.projectName}</h3>
          <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px; font-size: 12px; color: #666;">
            <span>${tender.projectType}</span>
            <span style="margin: 0 4px;">•</span>
            <span>${tender.budget}</span>
          </div>
          <div style="margin-top: 8px; font-size: 12px;">
            <span style="padding: 2px 6px; border-radius: 9999px; background-color: ${getStatusColor(tender.status)}; color: white; font-size: 11px;">
              ${getStatusText(tender.status)}
            </span>
          </div>
        </div>
      `);

      // Ajouter le marqueur à la carte
      const marker = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map.current!);

      // Gestionnaire d'événements
      el.addEventListener('click', () => {
        onSelectTender(tender.id);
      });

      // Afficher la popup si le tender est sélectionné
      if (selectedTenderId === tender.id) {
        popup.addTo(map.current!);
        
        // Centrer la carte sur le marqueur sélectionné
        map.current!.flyTo({
          center: coords,
          zoom: 8,
          duration: 1000
        });
      }

      popupRefs.current[tender.id] = popup;
    });
  }, [tenders, mapLoaded, selectedTenderId, onSelectTender]);

  // Fonction pour afficher/masquer les popups lors du survol
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tenderId = target.getAttribute('data-tender-id');
      if (tenderId && popupRefs.current[tenderId]) {
        popupRefs.current[tenderId].addTo(map.current!);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tenderId = target.getAttribute('data-tender-id');
      if (tenderId && popupRefs.current[tenderId] && tenderId !== selectedTenderId) {
        popupRefs.current[tenderId].remove();
      }
    };

    const markers = document.querySelectorAll('.tender-marker');
    markers.forEach(marker => {
      marker.addEventListener('mouseenter', handleMouseEnter);
      marker.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      markers.forEach(marker => {
        marker.removeEventListener('mouseenter', handleMouseEnter);
        marker.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [tenders, selectedTenderId]);

  return (
    <div className="flex-1 rounded-lg shadow-sm mr-4 overflow-hidden flex flex-col">
      {/* Liste des tenders sur le côté */}
      <div className="h-1/3 overflow-auto p-3 border-b">
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
      
      {/* Carte Mapbox */}
      <div className="h-2/3 relative">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Notice quand le token n'est pas configuré */}
        {MAPBOX_TOKEN === 'VOTRE_CLE_MAPBOX_ICI' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white p-4 text-center z-10">
            <div>
              <p className="mb-2 font-bold">Configuration requise</p>
              <p className="text-sm">
                Veuillez remplacer 'VOTRE_CLE_MAPBOX_ICI' par votre token Mapbox dans le fichier TenderMap.tsx
              </p>
              <p className="text-xs mt-2">
                Obtenez une clé gratuite sur <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenderMap;
