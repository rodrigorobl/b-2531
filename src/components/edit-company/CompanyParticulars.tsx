
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload, PlusCircle, MinusCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function CompanyParticulars() {
  const [turnoverPublic, setTurnoverPublic] = useState(false);
  const [employeesCount, setEmployeesCount] = useState(25);
  const [turnoverData, setTurnoverData] = useState([
    { year: "2023", amount: "2450000" },
    { year: "2022", amount: "2280000" },
    { year: "2021", amount: "1950000" },
  ]);

  const handleFileUpload = () => {
    toast({
      title: "Importation de données",
      description: "Cette fonctionnalité vous permettrait d'importer vos données financières."
    });
  };

  const handleTurnoverChange = (index: number, field: 'year' | 'amount', value: string) => {
    const newData = [...turnoverData];
    newData[index][field] = value;
    setTurnoverData(newData);
  };

  const increaseEmployeesCount = () => {
    setEmployeesCount(prev => prev + 1);
  };

  const decreaseEmployeesCount = () => {
    if (employeesCount > 0) {
      setEmployeesCount(prev => prev - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations particulières</CardTitle>
        <CardDescription>
          Informations détaillées sur votre entreprise et vos performances.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="turnover">Chiffre d'affaires des 3 dernières années</Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="turnoverPublic" className="text-sm">Rendre public</Label>
              <Switch 
                id="turnoverPublic" 
                checked={turnoverPublic} 
                onCheckedChange={setTurnoverPublic} 
              />
            </div>
          </div>
          
          <div className="space-y-3">
            {turnoverData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input 
                  value={item.year} 
                  onChange={(e) => handleTurnoverChange(index, 'year', e.target.value)}
                  placeholder="Année"
                  className="w-[100px]"
                />
                <div className="relative flex-1">
                  <Input 
                    value={item.amount} 
                    onChange={(e) => handleTurnoverChange(index, 'amount', e.target.value)}
                    placeholder="Montant"
                    type="number"
                    className="pl-8"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleFileUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Importer des données
          </Button>
        </div>

        <div className="space-y-4">
          <Label htmlFor="employees">Nombre de salariés</Label>
          <div className="flex items-center">
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={decreaseEmployeesCount}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            <Input 
              id="employees" 
              value={employeesCount} 
              onChange={(e) => setEmployeesCount(parseInt(e.target.value) || 0)}
              className="mx-2 text-center"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={increaseEmployeesCount}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
