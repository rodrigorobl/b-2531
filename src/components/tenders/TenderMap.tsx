
import React, { useEffect, useState } from 'react';
import { TenderSearchResult } from '@/pages/TenderSearch';
import { Card, CardContent } from '@/components/ui/card';
import { MapIcon, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface TenderMapProps {
  tenders: TenderSearchResult[];
  selectedTenderId: string | null;
  onSelectTender: (tenderId: string) => void;
}

export default function TenderMap({ tenders, selectedTenderId, onSelectTender }: TenderMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [projectLocations, setProjectLocations] = useState<any[]>([]);
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  
  // À remplacer par votre token Mapbox réel
  const mapboxToken = "pk.eyJ1IjoibG92YWJsZS1idHAiLCJhIjoiY2x6dzFsdHVsMDkyYjJrcXppbG5heHp1cCJ9.OdWBcNOJ3dFe0yCu8lTwVQ";
  
  useEffect(() => {
    // Récupérer les données des projets et leurs localisations depuis Supabase
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
          setProjectLocations(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des localisations:', error);
      }
    };
    
    fetchProjectLocations();
  }, []);
  
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;
    
    if (!map.current) {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [2.3522, 46.6033], // Centre de la France
        zoom: 5
      });
      
      map.current.on('load', () => {
        setMapLoaded(true);
      });
      
      // Ajouter les contrôles de navigation
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);
  
  // Ajouter les marqueurs des projets une fois que la carte est chargée
  useEffect(() => {
    if (mapLoaded && map.current && projectLocations.length > 0) {
      // Supprimer les marqueurs existants
      const markers = document.querySelectorAll('.mapboxgl-marker');
      markers.forEach(marker => marker.remove());
      
      const bounds = new mapboxgl.LngLatBounds();
      
      projectLocations.forEach(project => {
        if (project.entreprises && project.entreprises.coordinates) {
          const coordinates = project.entreprises.coordinates;
          
          // Créer un élément DOM pour le marqueur
          const el = document.createElement('div');
          el.className = 'project-marker';
          el.style.backgroundColor = getStatusColor(project.statut);
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.border = '2px solid white';
          el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          el.style.cursor = 'pointer';
          
          // Créer une popup avec les informations du projet
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="padding: 5px;">
              <strong>${project.nom}</strong><br/>
              <span>${project.type_projet}</span><br/>
              <span>Budget: ${formatBudget(project.budget_estime)}</span><br/>
              <span style="color: ${getStatusColor(project.statut)}">
                ${getStatusLabel(project.statut)}
              </span>
            </div>
          `);
          
          // Ajouter le marqueur à la carte
          new mapboxgl.Marker(el)
            .setLngLat([coordinates.lng, coordinates.lat])
            .setPopup(popup)
            .addTo(map.current!);
          
          // Étendre les limites pour inclure ce marqueur
          bounds.extend([coordinates.lng, coordinates.lat]);
          
          // Ajouter un gestionnaire d'événements au marqueur
          el.addEventListener('click', () => {
            // Trouver le tender correspondant au projet et le sélectionner
            const matchingTender = tenders.find(t => t.projectName === project.nom);
            if (matchingTender) {
              onSelectTender(matchingTender.id);
            }
          });
        }
      });
      
      // Ajuster la vue pour afficher tous les marqueurs
      if (!bounds.isEmpty()) {
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 12
        });
      }
    }
  }, [mapLoaded, projectLocations, tenders, onSelectTender]);
  
  // Fonctions utilitaires
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
  
  if (!mapboxToken || mapboxToken === "pk.eyJ1IjoibG92YWJsZS1idHAiLCJhIjoiY2x6dzFsdHVsMDkyYjJrcXppbG5heHp1cCJ9.OdWBcNOJ3dFe0yCu8lTwVQ") {
    return (
      <div className="w-full h-full">
        <Card className="h-full border-dashed flex items-center justify-center">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-medium">Token Mapbox requis</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Veuillez utiliser votre propre token Mapbox pour afficher la carte des appels d'offres.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full rounded-md overflow-hidden" />
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
