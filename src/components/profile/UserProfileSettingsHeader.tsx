
import React from 'react';
import { Eye, PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserProfileSettingsHeaderProps {
  activeTab: 'edit' | 'preview';
  setActiveTab: (tab: 'edit' | 'preview') => void;
}

export function UserProfileSettingsHeader({ 
  activeTab, 
  setActiveTab 
}: UserProfileSettingsHeaderProps) {
  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <h1 className="text-lg font-medium">Mon Profil</h1>
        
        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === 'edit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('edit')}
          >
            <PenSquare className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <Button
            variant={activeTab === 'preview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('preview')}
          >
            <Eye className="mr-2 h-4 w-4" />
            Aperçu public
          </Button>
        </div>
      </div>
    </div>
  );
}
