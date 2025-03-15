
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Lightbulb, Upload, Image, Video } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function CompanyPresentation() {
  const [companyTitle, setCompanyTitle] = useState("Construction Dupont - Expert en rénovation énergétique");
  const [companyDescription, setCompanyDescription] = useState(
    "Fondée en 2010, Construction Dupont est une entreprise spécialisée dans la rénovation énergétique des bâtiments. Notre équipe de professionnels qualifiés met son expertise au service de vos projets pour vous offrir des solutions durables et économiques."
  );

  const handleGenerateAI = () => {
    toast({
      title: "Génération en cours...",
      description: "Notre assistant IA génère une description professionnelle de votre entreprise."
    });
    
    // Simulate AI generation
    setTimeout(() => {
      setCompanyDescription(
        "Fondée en 2010 à Paris, Construction Dupont s'est imposée comme un acteur majeur de la rénovation énergétique en Île-de-France. Forte d'une équipe de 25 professionnels certifiés RGE, notre entreprise accompagne particuliers et professionnels dans l'amélioration de la performance énergétique de leurs bâtiments.\n\nNotre expertise couvre l'isolation thermique, le remplacement de menuiseries, l'installation de systèmes de chauffage écologiques et la ventilation. Chaque projet est mené avec rigueur, de l'étude technique initiale jusqu'à la livraison finale, en passant par l'accompagnement administratif pour l'obtention d'aides financières.\n\nAvec plus de 500 chantiers réalisés et un taux de satisfaction client de 98%, Construction Dupont s'engage à vous offrir des solutions durables, économiques et respectueuses de l'environnement."
      );
      toast({
        title: "Description générée",
        description: "La description a été générée avec succès. Vous pouvez maintenant la personnaliser."
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Présentation de l'entreprise</CardTitle>
        <CardDescription>
          Personnalisez la présentation de votre entreprise pour mettre en valeur votre expertise.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyTitle">Titre de présentation</Label>
          <Input 
            id="companyTitle" 
            value={companyTitle} 
            onChange={(e) => setCompanyTitle(e.target.value)}
            placeholder="Ex: Construction Dupont - Expert en rénovation"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="companyDescription">Description</Label>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-amber-500"
              onClick={handleGenerateAI}
            >
              <Lightbulb size={14} />
              Générer avec IA
            </Button>
          </div>
          <Textarea 
            id="companyDescription" 
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            placeholder="Décrivez votre entreprise, votre expertise, vos services..."
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-3">
          <Label>Médias</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center border-dashed">
              <Image className="h-6 w-6 mb-1" />
              <span>Ajouter une photo</span>
              <span className="text-xs text-muted-foreground mt-1">JPG, PNG (max 5MB)</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center border-dashed">
              <Video className="h-6 w-6 mb-1" />
              <span>Ajouter une vidéo</span>
              <span className="text-xs text-muted-foreground mt-1">MP4, WEBM (max 50MB)</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
