
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, Clock, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function CompanyPreview() {
  const [published, setPublished] = useState(true);
  const [lastModified, setLastModified] = useState("Aujourd'hui à 14:32");
  const [versions, setVersions] = useState([
    { id: 1, date: "Aujourd'hui", time: "14:32", user: "Jean Dupont" },
    { id: 2, date: "Hier", time: "16:45", user: "Jean Dupont" },
    { id: 3, date: "15/06/2023", time: "10:15", user: "Marie Martin" },
  ]);

  const handlePreview = () => {
    toast({
      title: "Prévisualisation",
      description: "Ouverture du mode prévisualisation de votre page entreprise."
    });
  };

  const handleRestore = (versionId: number) => {
    toast({
      title: "Version restaurée",
      description: `La version du ${versionId === 2 ? "Hier" : "15/06/2023"} a été restaurée.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Aperçu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-2 border border-dashed rounded-md aspect-[3/4] mb-4 flex flex-col items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Aperçu de la page</p>
              <p className="text-xs">Mise à jour en temps réel</p>
            </div>
          </div>
          <Button className="w-full" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" />
            Afficher l'aperçu complet
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Statut</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full mr-2 ${published ? "bg-green-500" : "bg-amber-500"}`}></div>
            <span>{published ? "Publiée" : "En attente de validation"}</span>
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Dernière modification : {lastModified}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Historique</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {versions.map((version, index) => (
              <div key={version.id}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{version.date} à {version.time}</div>
                    <div className="text-muted-foreground">{version.user}</div>
                  </div>
                  {index > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRestore(version.id)}
                    >
                      Restaurer
                    </Button>
                  )}
                </div>
                {index < versions.length - 1 && <Separator className="my-3" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
