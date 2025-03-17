
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from '@/components/Sidebar';
import { UserProfileSettingsHeader } from '@/components/profile/UserProfileSettingsHeader';
import { UserProfileForm } from '@/components/profile/UserProfileForm';
import { UserProfilePreview } from '@/components/profile/UserProfilePreview';

export default function UserProfileSettings() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  
  // In a real application, this would come from an API/context
  const [userProfile, setUserProfile] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '06 12 34 56 78',
    company: 'Constructions Dupont',
    position: 'Directeur des opérations',
    city: 'Lyon',
    linkedIn: 'linkedin.com/in/jeandupont',
    bio: 'Professionnel du BTP avec 15 ans d\'expérience dans la gestion de projets de construction.',
    avatarUrl: 'https://github.com/shadcn.png',
    showEmail: true,
    showPhone: false
  });

  const handleProfileUpdate = (updatedProfile: typeof userProfile) => {
    setUserProfile(updatedProfile);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <UserProfileSettingsHeader 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <div className="flex-1 container py-6">
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as 'edit' | 'preview')}
            className="space-y-4"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="edit">Modifier mon profil</TabsTrigger>
              <TabsTrigger value="preview">Aperçu public</TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="space-y-4 animate-in fade-in">
              <UserProfileForm 
                userProfile={userProfile}
                onProfileUpdate={handleProfileUpdate}
              />
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-4 animate-in fade-in">
              <UserProfilePreview userProfile={userProfile} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
