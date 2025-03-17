
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Mail, Phone, Linkedin, FileText, EyeOff } from 'lucide-react';

interface UserProfilePreviewProps {
  userProfile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    city: string;
    linkedIn: string;
    bio: string;
    avatarUrl: string;
    showEmail: boolean;
    showPhone: boolean;
  };
}

export function UserProfilePreview({ userProfile }: UserProfilePreviewProps) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-sm text-muted-foreground p-2 bg-muted rounded-md">
        Ceci est un aperçu de votre profil tel qu'il apparaît pour les autres utilisateurs.
      </div>
      
      <Card>
        <CardHeader className="relative pb-0">
          <div className="absolute top-4 right-6">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Profil Public
            </Badge>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
            <Avatar className="w-24 h-24 border-4 border-background">
              <AvatarImage src={userProfile.avatarUrl} alt="Photo de profil" />
              <AvatarFallback>
                {userProfile.firstName[0]}{userProfile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <CardTitle className="text-2xl">
                {userProfile.firstName} {userProfile.lastName}
              </CardTitle>
              <CardDescription className="text-base mt-1">
                {userProfile.position} {userProfile.company && `chez ${userProfile.company}`}
              </CardDescription>
              
              {userProfile.city && (
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {userProfile.city}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="mt-6 space-y-6">
          {userProfile.bio && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                À propos
              </h3>
              <p className="text-sm">{userProfile.bio}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-dashed overflow-hidden">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">Informations professionnelles</CardTitle>
              </CardHeader>
              <CardContent className="py-0 space-y-3">
                {userProfile.company && (
                  <div className="flex items-start gap-2">
                    <Building className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Entreprise</p>
                      <p className="text-sm">{userProfile.company}</p>
                    </div>
                  </div>
                )}
                
                {userProfile.position && (
                  <div className="flex items-start gap-2">
                    <Building className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Poste</p>
                      <p className="text-sm">{userProfile.position}</p>
                    </div>
                  </div>
                )}
                
                {userProfile.linkedIn && (
                  <div className="flex items-start gap-2">
                    <Linkedin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">LinkedIn</p>
                      <p className="text-sm">
                        <a 
                          href={`https://${userProfile.linkedIn.replace(/^https?:\/\//, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline"
                        >
                          {userProfile.linkedIn.replace(/^https?:\/\//, '')}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="border-dashed overflow-hidden">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">Contact</CardTitle>
              </CardHeader>
              <CardContent className="py-0 space-y-3">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    {userProfile.showEmail ? (
                      <p className="text-sm">{userProfile.email}</p>
                    ) : (
                      <p className="text-sm flex items-center text-muted-foreground italic">
                        <EyeOff className="h-3 w-3 mr-1" />
                        Information privée
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Téléphone</p>
                    {userProfile.showPhone ? (
                      <p className="text-sm">{userProfile.phone}</p>
                    ) : (
                      <p className="text-sm flex items-center text-muted-foreground italic">
                        <EyeOff className="h-3 w-3 mr-1" />
                        Information privée
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
