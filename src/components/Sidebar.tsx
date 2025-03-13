
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProfileSelector, ProfileType } from './sidebar/ProfileSelector';
import { UserProfile } from './sidebar/UserProfile';
import { Navigation } from './sidebar/Navigation';

export default function Sidebar() {
  const [activeProfile, setActiveProfile] = useState<ProfileType>('entreprise-construction');

  // Mock user data - this would normally come from your auth system
  const user = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    avatarUrl: "https://github.com/shadcn.png"
  };

  const handleProfileChange = (value: ProfileType) => {
    setActiveProfile(value);
  };

  return (
    <aside className="w-64 h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-sm">
      
      <div className="p-4 flex flex-col gap-3 border-b border-sidebar-border">
        <Link to="/" className="text-xl font-bold text-white">
          BTP CONNECT
        </Link>
        
        <ProfileSelector 
          activeProfile={activeProfile} 
          onProfileChange={handleProfileChange} 
        />
        
        <UserProfile user={user} />
      </div>
      
      <Navigation activeProfile={activeProfile} />
      
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/70">
          © 2023 BTP CONNECT
        </p>
      </div>
    </aside>
  );
}
