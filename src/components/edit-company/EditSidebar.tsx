
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Info, 
  Phone, 
  Building, 
  Award, 
  Star, 
  FileIcon, 
  RotateCcw, 
  Lightbulb,
  Wrench
} from "lucide-react";

interface EditSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function EditSidebar({ activeSection, onSectionChange }: EditSidebarProps) {
  const navItems = [
    { id: "presentation", label: "Présentation", icon: FileText },
    { id: "particulars", label: "Informations particulières", icon: Info },
    { id: "contacts", label: "Liens et contacts", icon: Phone },
    { id: "services", label: "Liste des services", icon: Wrench },
    { id: "projects", label: "Projets réalisés", icon: Building },
    { id: "coverage", label: "Zone de couverture", icon: Building },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "testimonials", label: "Avis clients", icon: Star },
    { id: "documents", label: "Documents", icon: FileIcon },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-24">
      <div className="space-y-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeSection === item.id ? "" : "text-muted-foreground"
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium text-sm">Outils</h3>
          <Button 
            variant="outline" 
            className="w-full justify-start text-amber-500"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            Assistant IA
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-muted-foreground"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Version précédente
          </Button>
        </div>
      </div>
    </div>
  );
}
