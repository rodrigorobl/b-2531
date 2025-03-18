import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, Save, RotateCcw, Lightbulb, Upload, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import EditSidebar from "@/components/edit-company/EditSidebar";
import CompanyPresentation from "@/components/edit-company/CompanyPresentation";
import CompanyParticulars from "@/components/edit-company/CompanyParticulars";
import CompanyContacts from "@/components/edit-company/CompanyContacts";
import CompanyPreview from "@/components/edit-company/CompanyPreview";
export default function EditCompany() {
  const navigate = useNavigate();
  const [completionPercentage, setCompletionPercentage] = useState(75);
  const [activeSection, setActiveSection] = useState("presentation");
  const handlePreview = () => {
    toast({
      title: "Prévisualisation",
      description: "Ouverture du mode prévisualisation de votre page entreprise."
    });
  };
  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Vos modifications ont été enregistrées avec succès."
    });
  };
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };
  return <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background border-b p-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Édition de la page entreprise</h1>
                <div className="flex items-center mt-2">
                  <Progress value={completionPercentage} className="w-48 h-2" />
                  <span className="ml-2 text-sm text-muted-foreground">{completionPercentage}% complété</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2" onClick={handlePreview}>
                  <Eye size={16} />
                  Prévisualiser
                </Button>
                <Button className="flex items-center gap-2" onClick={handleSave}>
                  <Save size={16} />
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="container mx-auto py-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left column - Navigation and editing tools */}
            <div className="md:col-span-3">
              <EditSidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
            </div>

            {/* Middle column - Editable content */}
            <div className="md:col-span-6 space-y-6">
              {activeSection === "presentation" && <CompanyPresentation />}
              {activeSection === "particulars" && <CompanyParticulars />}
              {activeSection === "contacts" && <CompanyContacts />}
              {activeSection === "projects" && <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Projets réalisés</h2>
                  <p className="text-muted-foreground mb-4">Ajoutez vos projets réalisés pour mettre en valeur votre expertise.</p>
                  <Button className="flex items-center gap-2">
                    <PlusCircle size={16} />
                    Ajouter un projet
                  </Button>
                </div>}
              {activeSection === "certifications" && <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Certifications et qualifications</h2>
                  <p className="text-muted-foreground mb-4">Ajoutez vos certifications pour mettre en avant votre professionnalisme.</p>
                  <Button className="flex items-center gap-2">
                    <PlusCircle size={16} />
                    Ajouter une certification
                  </Button>
                </div>}
              {activeSection === "testimonials" && <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Avis et recommandations</h2>
                  <p className="text-muted-foreground mb-4">Ajoutez des témoignages de clients satisfaits.</p>
                  <Button className="flex items-center gap-2">
                    <PlusCircle size={16} />
                    Ajouter un témoignage
                  </Button>
                </div>}
              {activeSection === "documents" && <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Documents</h2>
                  <p className="text-muted-foreground mb-4">Ajoutez des documents à télécharger (plaquettes, brochures, etc.).</p>
                  <Button className="flex items-center gap-2">
                    <Upload size={16} />
                    Ajouter un document
                  </Button>
                </div>}
            </div>

            {/* Right column - Preview and validation */}
            
          </div>
        </div>
      </main>
    </div>;
}