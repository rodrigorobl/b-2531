
import React, { useEffect, useState } from 'react';
import { Company } from '@/types/directory';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

interface CompanyMapProps {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
}

// Define a type that matches what we expect from Supabase
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supabaseCompanies, setSupabaseCompanies] = useState<SupabaseCompany[]>([]);
  const [activeInfoWindow, setActiveInfoWindow] = useState<string | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBb7ikdBNJYSpoXkzOFBQlThyfMt9mJa68',
  });

  // Map container style
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  // Default center (France)
  const center = {
    lat: 46.6033,
    lng: 2.3522,
  };
  
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
          // Filter out companies without coordinates and safely type cast
          const companiesWithCoordinates = data
            .filter(company => company.coordinates !== null)
            .map(company => {
              // Ensure coordinates are properly typed
              let safeCompany = {...company} as unknown as SupabaseCompany;
              
              // Ensure coordinates have proper structure
              if (company.coordinates && typeof company.coordinates === 'object') {
                const coords = company.coordinates as any;
                if (coords.lat !== undefined && coords.lng !== undefined) {
                  safeCompany.coordinates = {
                    lat: Number(coords.lat),
                    lng: Number(coords.lng)
                  };
                } else {
                  safeCompany.coordinates = null;
                }
              } else {
                safeCompany.coordinates = null;
              }
              
              return safeCompany;
            })
            .filter(company => company.coordinates !== null);
            
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

  // Handle marker click
  const handleMarkerClick = (companyId: string) => {
    setActiveInfoWindow(companyId);
    const company = mapSupabaseToCompanies().find(c => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
    }
  };

  // Update active info window when selected company changes
  useEffect(() => {
    if (selectedCompany) {
      setActiveInfoWindow(selectedCompany.id);
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

  if (loadError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-center p-6">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Erreur de chargement de la carte</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Impossible de charger Google Maps. Veuillez vérifier votre connexion ou la clé API.
          </p>
        </div>
      </div>
    );
  }
  
  if (!isLoaded || loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement de la carte...</span>
      </div>
    );
  }

  const mappedCompanies = mapSupabaseToCompanies();
  
  // Calculate bounds for the map to fit all markers
  const getBounds = () => {
    const bounds = new window.google.maps.LatLngBounds();
    mappedCompanies.forEach(company => {
      if (company.coordinates) {
        bounds.extend({
          lat: company.coordinates.lat,
          lng: company.coordinates.lng
        });
      }
    });
    return bounds;
  };

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={5}
        onLoad={(map) => {
          if (mappedCompanies.length > 0) {
            map.fitBounds(getBounds());
          }
        }}
        options={{
          fullscreenControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: true,
        }}
      >
        {mappedCompanies.map((company) => {
          if (company.coordinates) {
            return (
              <Marker
                key={company.id}
                position={{
                  lat: company.coordinates.lat,
                  lng: company.coordinates.lng
                }}
                onClick={() => handleMarkerClick(company.id)}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: getMarkerColor(company.category),
                  fillOpacity: 1,
                  strokeColor: 'white',
                  strokeWeight: 2,
                }}
              >
                {activeInfoWindow === company.id && (
                  <InfoWindow
                    onCloseClick={() => setActiveInfoWindow(null)}
                  >
                    <div style={{ padding: '5px', maxWidth: '200px' }}>
                      <strong>{company.name}</strong><br/>
                      <span>{company.specialty}</span><br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>{company.location}</span>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          }
          return null;
        })}
      </GoogleMap>
      
      {mappedCompanies.length === 0 && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center p-6">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Aucune entreprise</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Aucune entreprise avec des coordonnées géographiques n'a été trouvée.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
