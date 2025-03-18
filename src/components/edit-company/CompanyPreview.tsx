
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Users, Award } from "lucide-react";

export default function CompanyPreview() {
  const handlePreview = () => {
    toast({
      title: "Prévisualisation",
      description: "Ouverture du mode prévisualisation de votre page entreprise."
    });
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Nos projets récents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-400">
              Photo du projet
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">Résidence Les Cerisiers</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin size={14} className="mr-1" />
                <span>Paris, France</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Construction d'un immeuble résidentiel de 40 appartements.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span>Achevé en 2023</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-400">
              Photo du projet
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">Centre commercial Beau Rivage</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin size={14} className="mr-1" />
                <span>Lyon, France</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Construction d'un centre commercial de 15 000 m².
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span>Achevé en 2022</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
