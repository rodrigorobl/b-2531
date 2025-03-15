import React from "react";
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
      {/* Component intentionally left empty as per user request */}
    </div>
  );
}
