
import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, AlertTriangle, CheckSquare, Mail, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Quote {
  id: string;
  companyName: string;
  submissionDate: string;
  isCompliant: boolean;
  price: number;
  comments: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Category {
  id: string;
  name: string;
  quotes: Quote[];
}

interface Company {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  hasNonCompliantQuote?: boolean;
}

interface RelaunchCompaniesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
}

export function RelaunchCompaniesDialog({ open, onOpenChange, categories }: RelaunchCompaniesDialogProps) {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedCompanies, setSelectedCompanies] = useState<Record<string, boolean>>({});
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});
  
  // Simulate a list of companies that need to be relaunched
  // In a real app, this would come from an API
  const getCompaniesToRelaunch = (): Company[] => {
    const companies: Company[] = [];
    
    // Get all companies with no quotes or non-compliant quotes
    categories.forEach(category => {
      // Companies with non-compliant quotes
      const nonCompliantQuotes = category.quotes.filter(quote => !quote.isCompliant);
      nonCompliantQuotes.forEach(quote => {
        companies.push({
          id: `company-${companies.length + 1}`,
          name: quote.companyName,
          categoryId: category.id,
          categoryName: category.name,
          hasNonCompliantQuote: true
        });
      });
      
      // Simulate companies without quotes (in a real app this would be fetched)
      // For demo purposes, add 1-2 companies per category that don't have quotes
      const companiesWithoutQuotes = [
        { name: `Entreprise A - ${category.name}` },
        { name: `Entreprise B - ${category.name}` }
      ];
      
      companiesWithoutQuotes.forEach(company => {
        companies.push({
          id: `company-${companies.length + 1}`,
          name: company.name,
          categoryId: category.id,
          categoryName: category.name
        });
      });
    });
    
    return companies;
  };
  
  const companiesToRelaunch = getCompaniesToRelaunch();
  
  // Get list of companies filtered by selected tab
  const getFilteredCompanies = () => {
    if (selectedTab === 'all') {
      return companiesToRelaunch;
    }
    return companiesToRelaunch.filter(company => company.categoryId === selectedTab);
  };
  
  // Group companies by category
  const getCompaniesByCategory = () => {
    const grouped: Record<string, Company[]> = {};
    
    companiesToRelaunch.forEach(company => {
      if (!grouped[company.categoryId]) {
        grouped[company.categoryId] = [];
      }
      grouped[company.categoryId].push(company);
    });
    
    return grouped;
  };
  
  const companiesByCategory = getCompaniesByCategory();
  
  // Handle select all companies
  const handleSelectAllCompanies = () => {
    const newSelection: Record<string, boolean> = {};
    const filtered = getFilteredCompanies();
    
    // Check if all are currently selected
    const allSelected = filtered.every(company => selectedCompanies[company.id]);
    
    filtered.forEach(company => {
      newSelection[company.id] = !allSelected;
    });
    
    setSelectedCompanies(prev => ({ ...prev, ...newSelection }));
  };
  
  // Handle select all companies in a category
  const handleSelectCategoryCompanies = (categoryId: string) => {
    const newSelection: Record<string, boolean> = {};
    const categoryCompanies = companiesByCategory[categoryId] || [];
    
    // Check if all are currently selected
    const allSelected = categoryCompanies.every(company => selectedCompanies[company.id]);
    
    categoryCompanies.forEach(company => {
      newSelection[company.id] = !allSelected;
    });
    
    setSelectedCompanies(prev => ({ ...prev, ...newSelection }));
    
    // Also update the category selection
    setSelectedCategories(prev => ({
      ...prev,
      [categoryId]: !allSelected
    }));
  };
  
  // Handle individual company selection
  const handleSelectCompany = (companyId: string, categoryId: string) => {
    setSelectedCompanies(prev => ({
      ...prev,
      [companyId]: !prev[companyId]
    }));
    
    // Check if all companies in the category are selected
    const updatedCompanySelection = {
      ...selectedCompanies,
      [companyId]: !selectedCompanies[companyId]
    };
    
    const categoryCompanies = companiesByCategory[categoryId] || [];
    const allCategorySelected = categoryCompanies.every(company => updatedCompanySelection[company.id]);
    
    setSelectedCategories(prev => ({
      ...prev,
      [categoryId]: allCategorySelected
    }));
  };
  
  // Count selected companies
  const getSelectedCount = () => {
    return Object.values(selectedCompanies).filter(Boolean).length;
  };
  
  // Send relaunch emails
  const handleSendRelaunch = () => {
    const selectedCount = getSelectedCount();
    
    if (selectedCount === 0) {
      toast({
        title: "Aucune entreprise sélectionnée",
        description: "Veuillez sélectionner au moins une entreprise à relancer.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API to send emails
    toast({
      title: "Relance envoyée",
      description: `${selectedCount} entreprise(s) ont été relancées avec succès.`,
      variant: "default"
    });
    
    // Reset selections and close dialog
    setSelectedCompanies({});
    setSelectedCategories({});
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Relancer les entreprises</DialogTitle>
          <DialogDescription>
            Sélectionnez les entreprises à relancer pour l'appel d'offres.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          value={selectedTab} 
          onValueChange={setSelectedTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="all">Tous les lots</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="overflow-y-auto flex-1 pr-2 mb-4">
            <TabsContent value="all" className="m-0 h-full">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSelectAllCompanies}
                    className="flex items-center gap-1"
                  >
                    <CheckSquare size={14} />
                    {getFilteredCompanies().every(company => selectedCompanies[company.id])
                      ? "Désélectionner tout"
                      : "Sélectionner tout"}
                  </Button>
                </div>
                
                {Object.entries(companiesByCategory).map(([categoryId, companies]) => {
                  const category = categories.find(c => c.id === categoryId);
                  return (
                    <div key={categoryId} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id={`category-${categoryId}`} 
                            checked={selectedCategories[categoryId]} 
                            onCheckedChange={() => handleSelectCategoryCompanies(categoryId)}
                          />
                          <label 
                            htmlFor={`category-${categoryId}`} 
                            className="font-medium cursor-pointer"
                          >
                            {category?.name} ({companies.length})
                          </label>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSelectCategoryCompanies(categoryId)}
                          className="text-xs"
                        >
                          {companies.every(company => selectedCompanies[company.id])
                            ? "Désélectionner tout"
                            : "Sélectionner tout"}
                        </Button>
                      </div>
                      
                      <div className="space-y-2 pl-6">
                        {companies.map(company => (
                          <div key={company.id} className="flex items-center gap-2">
                            <Checkbox 
                              id={company.id} 
                              checked={!!selectedCompanies[company.id]} 
                              onCheckedChange={() => handleSelectCompany(company.id, categoryId)}
                            />
                            <label htmlFor={company.id} className="flex items-center gap-2 cursor-pointer text-sm">
                              {company.name}
                              {company.hasNonCompliantQuote && (
                                <span className="inline-flex items-center text-amber-500">
                                  <AlertTriangle size={14} className="mr-1" />
                                  Devis non conforme
                                </span>
                              )}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            {categories.map(category => (
              <TabsContent key={category.id} value={category.id} className="m-0 h-full">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSelectCategoryCompanies(category.id)}
                      className="flex items-center gap-1"
                    >
                      <CheckSquare size={14} />
                      {(companiesByCategory[category.id] || []).every(company => selectedCompanies[company.id])
                        ? "Désélectionner toutes les entreprises"
                        : "Sélectionner toutes les entreprises"}
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="space-y-2">
                      {(companiesByCategory[category.id] || []).map(company => (
                        <div key={company.id} className="flex items-center gap-2">
                          <Checkbox 
                            id={`tab-${company.id}`} 
                            checked={!!selectedCompanies[company.id]} 
                            onCheckedChange={() => handleSelectCompany(company.id, category.id)}
                          />
                          <label htmlFor={`tab-${company.id}`} className="flex items-center gap-2 cursor-pointer text-sm">
                            {company.name}
                            {company.hasNonCompliantQuote && (
                              <span className="inline-flex items-center text-amber-500">
                                <AlertTriangle size={14} className="mr-1" />
                                Devis non conforme
                              </span>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
        
        <DialogFooter className="flex justify-between items-center border-t pt-4">
          <div className="text-sm text-muted-foreground">
            {getSelectedCount()} entreprise(s) sélectionnée(s)
          </div>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={handleSendRelaunch} className="gap-1">
              <Mail size={14} />
              Envoyer les relances
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
