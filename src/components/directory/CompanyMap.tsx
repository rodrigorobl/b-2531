import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Company, CompanyCategory } from '@/types/directory';
import { Loader2 } from 'lucide-react';
import useCompanyDirectory from '@/hooks/useCompanyDirectory';
import CompanyListStatus from './CompanyListStatus';

interface CompanyMapProps {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  searchQuery?: string;
  selectedCategory?: CompanyCategory | null;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 48.8566, // Paris coordinates
  lng: 2.3522
};

export default function CompanyMap({
  companies: ignoredCompanies,
  selectedCompany,
  setSelectedCompany,
  searchQuery = '',
  selectedCategory = null
}: CompanyMapProps) {
  const [mapRef, setMapRef] = React.useState<google.maps.Map | null>(null);
  const [infoWindowVisible, setInfoWindowVisible] = React.useState<boolean>(false);
  
  const { companies, loading, error } = useCompanyDirectory({
    searchQuery,
    selectedCategory
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAUXXVw8PFFYuRKGIQZGH-vVrLB98_cvLs"
  });

  const handleMarkerClick = (company: Company) => {
    setSelectedCompany(company);
    setInfoWindowVisible(true);
  };

  const handleInfoWindowClose = () => {
    setSelectedCompany(null);
    setInfoWindowVisible(false);
  };

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMapRef(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMapRef(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement de la carte...</span>
      </div>
    );
  }

  if (loading || error) {
    return <CompanyListStatus loading={loading} error={error} />;
  }

  return (
    <div className="h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {companies.map((company) => (
          <Marker
            key={company.id}
            position={company.coordinates}
            onClick={() => handleMarkerClick(company)}
          />
        ))}
        
        {selectedCompany && infoWindowVisible && (
          <InfoWindow
            position={selectedCompany.coordinates}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="p-2 max-w-sm">
              <h3 className="font-medium text-base">{selectedCompany.name}</h3>
              <p className="text-sm mt-1">{selectedCompany.specialty}</p>
              <div className="text-sm mt-1 text-gray-600">{selectedCompany.location}</div>
              <button 
                className="mt-2 text-sm text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  // Keep the marker selected, just close the info window
                  setInfoWindowVisible(false);
                }}
              >
                Voir les détails
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
