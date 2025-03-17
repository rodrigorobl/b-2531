
import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Company, CompanyCategory } from '@/types/directory';
import useCompanyDirectory from '@/hooks/useCompanyDirectory';
import CompanyListStatus from './CompanyListStatus';

interface CompanyMapProps {
  companies?: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  searchQuery?: string;
  selectedCategory?: CompanyCategory | null;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 48.8566, // Paris latitude
  lng: 2.3522, // Paris longitude
};

export default function CompanyMap({
  selectedCompany,
  setSelectedCompany,
  searchQuery = '',
  selectedCategory = null
}: CompanyMapProps) {
  const [activeCompany, setActiveCompany] = useState<Company | null>(null);
  
  const { companies, loading, error } = useCompanyDirectory({
    searchQuery,
    selectedCategory
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDUJcZMahLqhK9vPGaiskse-2hDH0zAIgA',
  });

  const handleMarkerClick = (company: Company) => {
    setActiveCompany(company);
  };

  const handleInfoWindowClose = () => {
    setActiveCompany(null);
  };

  const handleViewDetail = (company: Company) => {
    setSelectedCompany(company);
  };

  if (loading || error) {
    return <CompanyListStatus loading={loading} error={error} />;
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-full">Chargement de la carte...</div>;
  }

  return (
    <div className="h-full w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
      >
        {companies.map((company) => (
          <Marker
            key={company.id}
            position={{
              lat: company.coordinates.lat,
              lng: company.coordinates.lng
            }}
            onClick={() => handleMarkerClick(company)}
          />
        ))}

        {activeCompany && (
          <InfoWindow
            position={{
              lat: activeCompany.coordinates.lat,
              lng: activeCompany.coordinates.lng
            }}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="p-2 max-w-[200px]">
              <p className="font-bold truncate">{activeCompany.name}</p>
              <p className="text-sm">{activeCompany.specialty}</p>
              <p className="text-sm truncate">{activeCompany.location}</p>
              <button
                className="mt-2 text-sm text-blue-600 hover:underline"
                onClick={() => handleViewDetail(activeCompany)}
              >
                Voir détails
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
