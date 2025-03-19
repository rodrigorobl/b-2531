
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Building, Users, Package, FileText, ClipboardList } from 'lucide-react';

interface TenderSummaryProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderSummary: React.FC<TenderSummaryProps> = ({ form }) => {
  const formValues = form.getValues();
  const { type, privacy, projectName, description } = formValues;

  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return '-';
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  // Translate tender types to French
  const tenderTypeMap = {
    'design': 'Conception',
    'construction': 'Réalisation',
    'service': 'Services'
  };

  // Translate privacy settings to French
  const privacyMap = {
    'open': 'Ouvert',
    'restricted': 'Restreint',
    'closed': 'Privé'
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Récapitulatif de l'appel d'offres</h2>
      <p className="text-muted-foreground">
        Vérifiez toutes les informations avant de publier votre appel d'offres.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Informations générales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Type d'appel d'offres</p>
              <p className="font-medium">{tenderTypeMap[type as keyof typeof tenderTypeMap]}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Confidentialité</p>
              <p className="font-medium">{privacyMap[privacy as keyof typeof privacyMap]}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm text-muted-foreground">Nom du projet</p>
            <p className="font-medium">{projectName || "-"}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-sm">{description || "-"}</p>
          </div>
        </CardContent>
      </Card>

      {type === 'design' && formValues.design && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Détails du projet de conception
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nature du projet</p>
                <p className="font-medium">
                  {formValues.design.projectNature === 'logement' && 'Logement'}
                  {formValues.design.projectNature === 'tertiaire' && 'Tertiaire'}
                  {formValues.design.projectNature === 'industriel' && 'Industriel'}
                  {formValues.design.projectNature === 'commercial' && 'Commercial'}
                  {formValues.design.projectNature === 'hospitalier' && 'Hospitalier'}
                  {formValues.design.projectNature === 'scolaire' && 'Scolaire'}
                  {formValues.design.projectNature === 'autres' && 'Autres'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Surface</p>
                <p className="font-medium">{formValues.design.area ? `${formValues.design.area} m²` : "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {type === 'construction' && formValues.construction && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Détails du projet de construction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type de construction</p>
                  <p className="font-medium">
                    {formValues.construction.constructionType === 'neuf' && 'Neuf'}
                    {formValues.construction.constructionType === 'réhabilitation' && 'Réhabilitation'}
                    {formValues.construction.constructionType === 'extension' && 'Extension'}
                    {formValues.construction.constructionType === 'renovation' && 'Rénovation'}
                    {formValues.construction.constructionType === 'demolition' && 'Démolition'}
                    {formValues.construction.constructionType === 'amenagement' && 'Aménagement'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Surface</p>
                  <p className="font-medium">{formValues.construction.area ? `${formValues.construction.area} m²` : "-"}</p>
                </div>
              </div>
              
              {formValues.construction.location && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Adresse
                  </p>
                  <p className="font-medium">{formValues.construction.location.address || "-"}</p>
                </div>
              )}
              
              {formValues.construction.buildings && formValues.construction.buildings.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Bâtiments</p>
                  <div className="mt-2 space-y-2">
                    {formValues.construction.buildings.map((building, index) => (
                      <div key={building.id} className="bg-secondary/30 p-2 rounded-md flex justify-between">
                        <span>Bâtiment {index + 1}</span>
                        <span>R+{building.levels}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {formValues.construction.projectTeam && formValues.construction.projectTeam.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Équipe projet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {formValues.construction.projectTeam.map((member, index) => (
                    <div key={index} className="flex justify-between p-2 bg-secondary/30 rounded-md">
                      <span>{member.name}</span>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {formValues.construction.lots && formValues.construction.lots.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Lots de travaux
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {formValues.construction.lots
                    .filter(lot => lot.selected)
                    .map((lot, index) => (
                      <div key={index} className="p-2 bg-secondary/30 rounded-md">
                        <p className="font-medium">{lot.name}</p>
                        {lot.description && <p className="text-xs text-muted-foreground">{lot.description}</p>}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {formValues.construction.keyDates && formValues.construction.keyDates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Dates clés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {formValues.construction.keyDates.map((date, index) => (
                    date.date && (
                      <div key={index} className="flex justify-between p-2 bg-secondary/30 rounded-md">
                        <span>{date.name}</span>
                        <span className="font-medium">{formatDate(date.date)}</span>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {type === 'service' && formValues.service && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Détails du projet de service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Étendue géographique</p>
                <p className="font-medium">
                  {formValues.service.serviceScope === 'local' && 'Local'}
                  {formValues.service.serviceScope === 'départemental' && 'Départemental'}
                  {formValues.service.serviceScope === 'régional' && 'Régional'}
                  {formValues.service.serviceScope === 'national' && 'National'}
                  {formValues.service.serviceScope === 'international' && 'International'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Durée de la prestation</p>
                <p className="font-medium">
                  {formValues.service.serviceDuration === 'ponctuel' && 'Ponctuel'}
                  {formValues.service.serviceDuration === '3mois' && '3 mois'}
                  {formValues.service.serviceDuration === '6mois' && '6 mois'}
                  {formValues.service.serviceDuration === '1an' && '1 an'}
                  {formValues.service.serviceDuration === '2ans' && '2 ans'}
                  {formValues.service.serviceDuration === '3ans' && '3 ans'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {formValues.adminDocuments && formValues.adminDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documents administratifs requis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {formValues.adminDocuments.map((doc, index) => (
                <div key={index} className="p-2 bg-secondary/30 rounded-md">
                  <p>{doc.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {formValues.invitedCompanies && formValues.invitedCompanies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Entreprises invitées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {formValues.invitedCompanies
                .filter(company => company.selected)
                .map((company, index) => (
                  <div key={index} className="p-2 bg-secondary/30 rounded-md flex justify-between items-center">
                    <p>{company.name}</p>
                    {company.lotId && formValues.construction?.lots && (
                      <Badge variant="outline">
                        {formValues.construction.lots.find(lot => lot.name === company.lotId)?.name || company.lotId}
                      </Badge>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TenderSummary;
