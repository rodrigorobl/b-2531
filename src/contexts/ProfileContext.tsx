
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileType } from '@/components/sidebar/ProfileSelector';

type ProfileContextType = {
  activeProfile: ProfileType;
  setActiveProfile: (profile: ProfileType) => void;
};

const defaultProfile: ProfileType = 'entreprise-construction';

const ProfileContext = createContext<ProfileContextType>({
  activeProfile: defaultProfile,
  setActiveProfile: () => {},
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState<ProfileType>(defaultProfile);

  // Charger le profil depuis localStorage au chargement de l'application
  useEffect(() => {
    const storedProfile = localStorage.getItem('activeProfile');
    if (storedProfile) {
      setActiveProfile(storedProfile as ProfileType);
    }
  }, []);

  // Enregistrer le profil dans localStorage à chaque changement
  const handleSetActiveProfile = (profile: ProfileType) => {
    setActiveProfile(profile);
    localStorage.setItem('activeProfile', profile);
  };

  return (
    <ProfileContext.Provider 
      value={{ 
        activeProfile, 
        setActiveProfile: handleSetActiveProfile 
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
