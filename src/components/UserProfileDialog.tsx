
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Phone, Mail, UserRound, BadgeCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    company?: {
      name: string;
      address: string;
      phone: string;
      siret?: string;
    };
  } | null;
}

export default function UserProfileDialog({ open, onOpenChange, user }: UserProfileProps) {
  const navigate = useNavigate();
  
  if (!user) return null;
  
  // Company data - in a real app, this would come from an API
  const companyData = user.company || {
    name: "Construction Dupont",
    address: "123 Rue de la Construction, 75001 Paris",
    phone: "01 23 45 67 89",
    siret: "12345678900012"
  };

  const handleViewProfile = () => {
    // Close dialog
    onOpenChange(false);
    // Navigate to user profile page (using a fake userId for demo)
    navigate(`/profile/user/${user.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profil utilisateur</DialogTitle>
          <DialogDescription>
            Informations détaillées sur l'utilisateur et son entreprise
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="flex items-start gap-4 cursor-pointer hover:bg-accent/50 transition-colors p-2 rounded-md" onClick={handleViewProfile}>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UserRound className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg flex items-center gap-1">
                {user.name}
                {user.role === "Administrateur" && (
                  <BadgeCheck className="h-4 w-4 text-primary" />
                )}
              </h3>
              <p className="text-sm text-muted-foreground">{user.role}</p>
              <p className="text-sm">{user.email}</p>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
          </div>
          
          <Card>
            <CardContent className="pt-4">
              <h4 className="font-medium mb-3 flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span>Informations d'entreprise</span>
              </h4>
              
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Nom de l'entreprise</p>
                  <p className="font-medium">{companyData.name}</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">Adresse</p>
                  <p>{companyData.address}</p>
                </div>
                
                <div className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  <p>{companyData.phone}</p>
                </div>
                
                {companyData.siret && (
                  <div>
                    <p className="text-muted-foreground">SIRET</p>
                    <p className="font-mono">{companyData.siret}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleViewProfile}>
              Voir la page complète
              <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
