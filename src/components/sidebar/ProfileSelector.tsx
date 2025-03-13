
import React from 'react';
import { 
  TrendingUp, 
  DraftingCompass, 
  Hammer, 
  Briefcase, 
  Factory 
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export type ProfileType = 'promoteur' | 'maitre-oeuvre' | 'entreprise-construction' | 'entreprise-services' | 'industriel';

interface ProfileSelectorProps {
  activeProfile: ProfileType;
  onProfileChange: (value: ProfileType) => void;
}

export const getProfileIcon = (profile: ProfileType) => {
  switch (profile) {
    case 'promoteur':
      return <TrendingUp size={18} />;
    case 'maitre-oeuvre':
      return <DraftingCompass size={18} />;
    case 'entreprise-construction':
      return <Hammer size={18} />;
    case 'entreprise-services':
      return <Briefcase size={18} />;
    case 'industriel':
      return <Factory size={18} />;
    default:
      return <Briefcase size={18} />;
  }
};

export const getProfileName = (profile: ProfileType) => {
  switch (profile) {
    case 'promoteur':
      return 'Promoteur';
    case 'maitre-oeuvre':
      return 'Maître d\'Œuvre/BET';
    case 'entreprise-construction':
      return 'Entreprise de construction';
    case 'entreprise-services':
      return 'Entreprise de services';
    case 'industriel':
      return 'Industriel';
    default:
      return 'Profil';
  }
};

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ activeProfile, onProfileChange }) => {
  return (
    <Select value={activeProfile} onValueChange={(value) => onProfileChange(value as ProfileType)}>
      <SelectTrigger className="w-full bg-sidebar-accent text-sidebar-foreground">
        <div className="flex items-center gap-2">
          {getProfileIcon(activeProfile)}
          <SelectValue placeholder="Sélectionner un profil" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="promoteur">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Promoteur</span>
          </div>
        </SelectItem>
        <SelectItem value="maitre-oeuvre">
          <div className="flex items-center gap-2">
            <DraftingCompass size={16} />
            <span>Maître d'Œuvre/BET</span>
          </div>
        </SelectItem>
        <SelectItem value="entreprise-construction">
          <div className="flex items-center gap-2">
            <Hammer size={16} />
            <span>Entreprise de construction</span>
          </div>
        </SelectItem>
        <SelectItem value="entreprise-services">
          <div className="flex items-center gap-2">
            <Briefcase size={16} />
            <span>Entreprise de services</span>
          </div>
        </SelectItem>
        <SelectItem value="industriel">
          <div className="flex items-center gap-2">
            <Factory size={16} />
            <span>Industriel</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
