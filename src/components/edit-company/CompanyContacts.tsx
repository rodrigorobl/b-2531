
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash, Star } from "lucide-react";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  featured: boolean;
}

export default function CompanyContacts() {
  const [websiteUrl, setWebsiteUrl] = useState("https://construction-dupont.fr");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/company/construction-dupont");
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      firstName: "Jean",
      lastName: "Dupont",
      role: "Gérant",
      email: "jean.dupont@example.com",
      phone: "01 23 45 67 89",
      featured: true
    },
    {
      id: 2,
      firstName: "Marie",
      lastName: "Martin",
      role: "Responsable études de prix",
      email: "marie.martin@example.com",
      phone: "01 23 45 67 90",
      featured: false
    }
  ]);

  const addContact = () => {
    const newContact: Contact = {
      id: contacts.length + 1,
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      phone: "",
      featured: false
    };
    setContacts([...contacts, newContact]);
  };

  const removeContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const updateContact = (id: number, field: keyof Contact, value: string | boolean) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const toggleFeatured = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id 
        ? { ...contact, featured: !contact.featured } 
        : contact
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liens et contacts</CardTitle>
        <CardDescription>
          Ajoutez les liens vers votre site web et vos réseaux sociaux, ainsi que les contacts clés de votre entreprise.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website">Site web</Label>
            <Input 
              id="website" 
              value={websiteUrl} 
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://votre-site-web.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input 
              id="linkedin" 
              value={linkedinUrl} 
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/company/votre-entreprise"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Personnes à contacter</Label>
          </div>
          
          <div className="space-y-6">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-4 border rounded-md relative">
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={contact.featured ? "text-yellow-500" : "text-muted-foreground"}
                    onClick={() => toggleFeatured(contact.id)}
                  >
                    <Star size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeContact(contact.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Prénom</Label>
                    <Input 
                      value={contact.firstName} 
                      onChange={(e) => updateContact(contact.id, 'firstName', e.target.value)}
                      placeholder="Prénom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom</Label>
                    <Input 
                      value={contact.lastName} 
                      onChange={(e) => updateContact(contact.id, 'lastName', e.target.value)}
                      placeholder="Nom"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <Label>Fonction</Label>
                  <Input 
                    value={contact.role} 
                    onChange={(e) => updateContact(contact.id, 'role', e.target.value)}
                    placeholder="Fonction dans l'entreprise"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      value={contact.email} 
                      onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input 
                      value={contact.phone} 
                      onChange={(e) => updateContact(contact.id, 'phone', e.target.value)}
                      placeholder="Téléphone"
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                  <Label htmlFor={`featured-${contact.id}`} className="text-sm">
                    {contact.featured 
                      ? "Contact mis en avant" 
                      : "Mettre en avant ce contact"}
                  </Label>
                  <Switch 
                    id={`featured-${contact.id}`} 
                    checked={contact.featured} 
                    onCheckedChange={(checked) => updateContact(contact.id, 'featured', checked)} 
                  />
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addContact}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
