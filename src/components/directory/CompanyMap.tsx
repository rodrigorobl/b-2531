
import React, { useEffect, useState } from 'react';
import { Company, CompanyCategory, mapSupabaseCategory } from '@/types/directory';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

interface CompanyMapProps {
  companies: Company[]; // This will be ignored as we fetch directly
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  searchQuery?: string;
  selectedCategory?: CompanyCategory | null;
}

export default function CompanyMap({
  companies: ignoredCompanies, // Renamed to indicate we don't use this prop
  selectedCompany,
  setSelectedCompany,
  searchQuery = '',
  selectedCategory = null
}: CompanyMapProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
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
      case 'architecte': return '#f59e0b';
      case 'moe_bet': return '#3b82f6';
      case 'construction': return '#10b981';
      case 'service': return '#8b5cf6';
      case 'industriel': return '#ef4444';
      case 'fournisseur': return '#6b7280';
      default: return '#6b7280';
    }
  };

  // Fetch companies from Supabase
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        console.log("Fetching companies for map from Supabase...");
        let query = supabase
          .from('entreprises')
          .select('*')
          .order('nom');

        // Apply category filter if selected
        if (selectedCategory) {
          // Convert our internal category back to Supabase format
          let supabaseCategory;
          switch (selectedCategory) {
            case 'architecte': supabaseCategory = 'Architecte'; break;
            case 'moe_bet': supabaseCategory = 'MOE_BET'; break;
            case 'construction': supabaseCategory = 'Construction'; break;
            case 'service': supabaseCategory = 'Service'; break;
            case 'industriel': supabaseCategory = 'Industriel'; break;
            case 'fournisseur': supabaseCategory = 'Fournisseur'; break;
            default: supabaseCategory = null;
          }
          
          if (supabaseCategory) {
            query = query.eq('categorie_principale', supabaseCategory);
          }
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          console.log("Companies data for map retrieved:", data);
          
          // Transform data to match our Company interface and filter for companies with coordinates
          const transformedCompanies = data
            .filter(company => company.coordinates !== null)
            .map(company => {
              // Handle coordinates
              let coordinates = { lat: 48.8566, lng: 2.3522 }; // Default to Paris
              if (company.coordinates && typeof company.coordinates === 'object') {
                const coords = company.coordinates as any;
                if (coords.lat !== undefined && coords.lng !== undefined) {
                  coordinates = {
                    lat: Number(coords.lat),
                    lng: Number(coords.lng)
                  };
                }
              }
              
              return {
                id: company.id,
                name: company.nom,
                logo: company.logo || 'https://github.com/shadcn.png',
                category: mapSupabaseCategory(company.categorie_principale),
                specialty: company.specialite,
                location: company.ville || 'Non spécifié',
                address: company.adresse || '',
                rating: company.note_moyenne || 0,
                reviewCount: company.nombre_avis || 0,
                description: `Entreprise spécialisée en ${company.specialite}`,
                coordinates,
                contact: {
                  phone: company.telephone || '01 23 45 67 89',
                  email: company.email || 'contact@example.com',
                  website: company.site_web || 'www.example.com'
                },
                certifications: []
              };
            });
          
          setCompanies(transformedCompanies);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des entreprises pour la carte:', err);
        setError('Impossible de charger les données des entreprises');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanies();
  }, [selectedCategory]); // Re-fetch when category changes
  
  // Apply search filter on the client side
  const filteredCompanies = companies.filter(company => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      company.name.toLowerCase().includes(query) ||
      company.specialty.toLowerCase().includes(query) ||
      company.location.toLowerCase().includes(query)
    );
  });

  // Handle marker click
  const handleMarkerClick = (companyId: string) => {
    setActiveInfoWindow(companyId);
    const company = companies.find(c => c.id === companyId);
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
  
  // Calculate bounds for the map to fit all markers
  const getBounds = () => {
    const bounds = new window.google.maps.LatLngBounds();
    filteredCompanies.forEach(company => {
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
          if (filteredCompanies.length > 0) {
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
        {filteredCompanies.map((company) => {
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
      
      {filteredCompanies.length === 0 && !loading && (
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
