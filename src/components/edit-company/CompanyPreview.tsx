
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function CompanyPreview() {
  const handlePreview = () => {
    toast({
      title: "Prévisualisation",
      description: "Ouverture du mode prévisualisation de votre page entreprise."
    });
  };

  return (
    <div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" />
            Afficher l'aperçu complet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
