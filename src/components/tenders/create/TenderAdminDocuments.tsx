
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, X, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DocumentRequirement {
  id: string;
  name: string;
}

interface TenderAdminDocumentsProps {
  form: any;
}

const TenderAdminDocuments: React.FC<TenderAdminDocumentsProps> = ({ form }) => {
  // Default document requirements with the suggested list
  const defaultDocuments: DocumentRequirement[] = [
    { id: 'doc-1', name: 'Extrait Kbis de moins de 6 mois' },
    { id: 'doc-2', name: 'Attestation de régularité fiscale' },
    { id: 'doc-3', name: 'Attestation de vigilance URSSAF' },
    { id: 'doc-4', name: 'Attestation de Responsabilité Civile Professionnelle (RC Pro) 2025' },
    { id: 'doc-5', name: 'Attestation de Garantie Décennale 2025' },
    { id: 'doc-6', name: 'RIB' },
  ];

  const [documents, setDocuments] = useState<DocumentRequirement[]>(
    form.getValues('adminDocuments') || defaultDocuments
  );

  // Update form value when documents change
  React.useEffect(() => {
    form.setValue('adminDocuments', documents);
  }, [documents, form]);

  const addDocument = () => {
    const newDocument = {
      id: `doc-${Date.now()}`,
      name: '',
    };
    setDocuments([...documents, newDocument]);
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const updateDocumentName = (id: string, name: string) => {
    setDocuments(
      documents.map(doc => (doc.id === id ? { ...doc, name } : doc))
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Documents administratifs</h2>
      <p className="text-muted-foreground">
        Spécifiez les documents administratifs que les soumissionnaires doivent fournir avec leur offre.
      </p>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center gap-3">
            <FileText className="text-muted-foreground flex-shrink-0" size={18} />
            <Input
              value={doc.name}
              onChange={(e) => updateDocumentName(doc.id, e.target.value)}
              placeholder="Nom du document requis"
              className="flex-grow"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeDocument(doc.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X size={18} />
              <span className="sr-only">Supprimer</span>
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addDocument}
          className="mt-2"
        >
          <Plus size={16} className="mr-2" />
          Ajouter un document
        </Button>
      </div>

      <div className="bg-muted/50 p-4 rounded-md">
        <h3 className="font-medium mb-2">Note</h3>
        <p className="text-sm text-muted-foreground">
          Les soumissionnaires devront téléverser ces documents lors de la soumission de leur offre.
          Assurez-vous que les documents demandés sont pertinents pour votre appel d'offres.
        </p>
      </div>
    </div>
  );
};

export default TenderAdminDocuments;
