
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Company } from '@/types/directory';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface CompanyMapProps {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
}

interface SupabaseCompany {
  id: string;
  nom: string;
  categorie_principale: string;
  specialite: string;
  ville: string;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  note_moyenne: number;
  nombre_avis: number;
}

export default function CompanyMap({
  companies,
  selectedCompany,
  setSelectedCompany
}: CompanyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supabaseCompanies, setSupabaseCompanies] = useState<SupabaseCompany[]>([]);

  // Token Mapbox pour la démonstration
  const mapboxToken = "pk.eyJ1IjoibG92YWJsZS1idHAiLCJhIjoiY2x6dzFsdHVsMDkyYjJrcXppbG5heHp1cCJ9.OdWBcNOJ3dFe0yCu8lTwVQ";
  
  // Fonction pour obtenir la couleur du marqueur en fonction de la catégorie
  const getMarkerColor = (category: string) => {
    switch (category) {
      case 'Architecte': return '#f59e0b';
      case 'MOE_BET': return '#3b82f6';
      case 'Construction': return '#10b981';
      case 'Service': return '#8b5cf6';
      case 'Industriel': return '#ef4444';
      case 'Fournisseur': return '#6b7280';
      default: return '#6b7280';
    }
  };

  // Récupérer les entreprises depuis Supabase
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('entreprises')
          .select('id, nom, categorie_principale, specialite, ville, coordinates, note_moyenne, nombre_avis')
          .order('nom');
        
        if (error) throw error;
        
        if (data) {
          // Filter out companies without coordinates and cast to SupabaseCompany type
          const companiesWithCoordinates = data.filter(company => company.coordinates !== null) as SupabaseCompany[];
          setSupabaseCompanies(companiesWithCoordinates);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des entreprises:', err);
        setError('Impossible de charger les données des entreprises');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanies();
  }, []);

  // Mapper les entreprises Supabase au format Company pour l'interface
  const mapSupabaseToCompanies = (): Company[] => {
    return supabaseCompanies.map(company => ({
      id: company.id,
      name: company.nom,
      logo: 'https://github.com/shadcn.png', // Logo par défaut
      category: company.categorie_principale.toLowerCase() as any,
      specialty: company.specialite,
      location: company.ville || 'Non spécifié',
      address: '', // Adresse complète non disponible
      rating: company.note_moyenne,
      reviewCount: company.nombre_avis,
      description: `Entreprise spécialisée en ${company.specialite}`,
      coordinates: company.coordinates || { lat: 48.8566, lng: 2.3522 }, // Default to Paris if no coordinates
      contact: {
        phone: '01 23 45 67 89', // Données par défaut
        email: 'contact@example.com',
        website: 'www.example.com'
      },
      certifications: []
    }));
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
  }, []);
  
  // Afficher les marqueurs des entreprises une fois que la carte est chargée
  useEffect(() => {
    if (!map.current || loading) return;
    
    const mappedCompanies = mapSupabaseToCompanies();
    
    map.current.on('load', () => {
      // Clear existing markers
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};
      
      // Add markers for each company
      mappedCompanies.forEach((company) => {
        if (company.coordinates) {
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
          el.style.cursor = 'pointer';
          
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
        }
      });
      
      // If there are companies, fit the map to show all markers
      if (mappedCompanies.length > 0 && mappedCompanies.some(c => c.coordinates)) {
        const bounds = new mapboxgl.LngLatBounds();
        mappedCompanies.forEach(company => {
          if (company.coordinates) {
            bounds.extend([company.coordinates.lng, company.coordinates.lat]);
          }
        });
        map.current!.fitBounds(bounds, { padding: 50 });
      }
    });
  }, [loading, supabaseCompanies, setSelectedCompany]);
  
  // Center map on selected company
  useEffect(() => {
    if (selectedCompany && map.current && selectedCompany.coordinates) {
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
  
  if (error) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-center p-6">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Erreur de chargement</h3>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-full">
      {/* Adding styles directly to head instead of using jsx prop */}
      <style>
        {`
          .mapboxgl-popup-content {
            padding: 15px;
            border-radius: 8px;
          }
        `}
      </style>
      <div ref={mapContainer} className="absolute inset-0" />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Chargement de la carte...</span>
        </div>
      )}
      
      {!mapboxToken && (
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
