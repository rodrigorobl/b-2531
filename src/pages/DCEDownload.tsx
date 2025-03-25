
import React from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FeaturedDocuments } from '@/components/dce-download/FeaturedDocuments';
import { FileTree } from '@/components/dce-download/FileTree';
import { FileSearch } from '@/components/dce-download/FileSearch';
import { RevisionHistory } from '@/components/dce-download/RevisionHistory';
import { ChevronLeft, Home, Search, FolderTree, History, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DCEDownload = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project') || '';
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="container p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4 mr-1" />
                    Accueil
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/?project=${projectId}`}>
                    Projet {projectId}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>Dossier de Consultation des Entreprises</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold">Dossier de Consultation des Entreprises (DCE)</h1>
            <p className="text-muted-foreground">
              Projet {projectId} - Construction d'un immeuble de bureaux à Lyon Part-Dieu
            </p>
          </div>
          <Button variant="outline" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour au projet
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FolderTree className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">268 fichiers</p>
                  <p className="text-sm text-muted-foreground">12 dossiers</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <History className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Dernière mise à jour</p>
                  <p className="text-sm text-muted-foreground">12 mai 2023</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Téléchargements</p>
                  <p className="text-sm text-muted-foreground">145 téléchargements</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Documents importants</h2>
          <FeaturedDocuments />
        </div>

        <Tabs defaultValue="explorer" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="explorer">
              <FolderTree className="h-4 w-4 mr-2" />
              Explorateur de fichiers
            </TabsTrigger>
            <TabsTrigger value="search">
              <Search className="h-4 w-4 mr-2" />
              Recherche de fichiers
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              Historique des révisions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="explorer" className="min-h-[400px]">
            <FileTree />
          </TabsContent>
          <TabsContent value="search" className="min-h-[400px]">
            <FileSearch />
          </TabsContent>
          <TabsContent value="history" className="min-h-[400px]">
            <RevisionHistory />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DCEDownload;
