
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileProvider } from "./contexts/ProfileContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DashboardPromoteur from "./pages/DashboardPromoteur";
import DashboardBET from "./pages/DashboardBET";
import DashboardConstruction from "./pages/DashboardConstruction";
import DashboardServices from "./pages/DashboardServices";
import DashboardIndustry from "./pages/DashboardIndustry";
import Messaging from "./pages/Messaging";
import TenderOffers from "./pages/TenderOffers";
import TenderSearch from "./pages/TenderSearch";
import OpportunitiesSearch from "./pages/OpportunitiesSearch";
import TenderDetail from "./pages/TenderDetail";
import Company from "./pages/Company";
import CompanyServices from "./pages/CompanyServices";
import CompanyServicesEdit from "./pages/CompanyServicesEdit";
import EditCompany from "./pages/EditCompany";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import UserProfileSettings from "./pages/UserProfileSettings";
import CreateTender from "./pages/CreateTender";
import CompanyDirectory from "./pages/CompanyDirectory";
import QuotedDirectory from "./pages/QuotedDirectory";
import CompanyDetail from "./pages/CompanyDetail";
import ProjectsList from "./pages/ProjectsList";
import LotAnalysis from "./pages/LotAnalysis";
import TenderList from "./pages/TenderList";
import MoeList from "./pages/MoeList";
import QuotesToAnalyze from "./pages/QuotesToAnalyze";
import QuoteDetail from "./pages/QuoteDetail";
import QuoteAnalysis from "./pages/QuoteAnalysis";
import SubmitQuote from "./pages/SubmitQuote";
import ProjectSpecifications from "./pages/ProjectSpecifications";
import ProductReferenceTracking from "./pages/ProductReferenceTracking";
import ProjectsSearch from "./pages/ProjectsSearch";
import ProductReferenceDetail from "./pages/ProductReferenceDetail";
import QuantitySurveyRequest from "./pages/QuantitySurveyRequest";
import TenderAlert from "./pages/TenderAlert";
import AlertManagement from "./pages/AlertManagement";
import ConstructionSitesMap from "./pages/ConstructionSitesMap";
import ConstructionSiteDetail from "./pages/ConstructionSiteDetail";
import ServicesDetails from "./pages/ServicesDetails";
import ServicesQuoteManagement from "./pages/ServicesQuoteManagement";
import ServicesQuoteTracking from "./pages/ServicesQuoteTracking";
import ViewCompany from "./pages/ViewCompany";
import ViewCompanyServices from "./pages/ViewCompanyServices";
import CompanyDetailsTender from "./pages/CompanyDetailsTender";
import ServicesTenderSearch from "./pages/ServicesTenderSearch";
import ServicesTenderDetails from "./pages/ServicesTenderDetails";
import SubmitServicesQuote from "./pages/SubmitServicesQuote";
import ServicesDetailTender from "./pages/ServicesDetailTender";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProfileProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard-promoteur" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-promoteur" element={<DashboardPromoteur />} />
            <Route path="/dashboard-bet" element={<DashboardBET />} />
            <Route path="/dashboard-construction" element={<DashboardConstruction />} />
            <Route path="/dashboard-services" element={<DashboardServices />} />
            <Route path="/dashboard-industry" element={<DashboardIndustry />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/tenders" element={<TenderOffers />} />
            <Route path="/tender-search" element={<TenderSearch />} />
            <Route path="/opportunities-search" element={<OpportunitiesSearch />} />
            <Route path="/tender/:tenderId" element={<TenderDetail />} />
            <Route path="/tender/:projectId/lot/:lotId" element={<LotAnalysis />} />
            <Route path="/tender-specifications" element={<Index />} />
            <Route path="/project-specifications" element={<ProjectSpecifications />} />
            <Route path="/tender-list" element={<TenderList />} />
            <Route path="/moe-list" element={<MoeList />} />
            <Route path="/create-tender" element={<CreateTender />} />
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/projects-search" element={<ProjectsSearch />} />
            <Route path="/company" element={<Company />} />
            <Route path="/view-company" element={<ViewCompany />} />
            <Route path="/view-company-services" element={<ViewCompanyServices />} />
            <Route path="/company/edit" element={<EditCompany />} />
            <Route path="/company-services" element={<CompanyServices />} />
            <Route path="/company-services/edit" element={<CompanyServicesEdit />} />
            <Route path="/services-details/:companyId" element={<ServicesDetails />} />
            <Route path="/profile" element={<UserProfileSettings />} />
            <Route path="/profile/user/:userId" element={<UserProfile />} />
            <Route path="/directory" element={<CompanyDirectory />} />
            <Route path="/quoted-directory" element={<QuotedDirectory />} />
            <Route path="/company-detail/:companyId" element={<CompanyDetail />} />
            <Route path="/edit-tender/:tenderId" element={<CreateTender isEditing />} />
            <Route path="/product-reference" element={<ProductReferenceTracking />} />
            <Route path="/product-reference/:referenceId" element={<ProductReferenceDetail />} />
            <Route path="/quantity-survey-request" element={<QuantitySurveyRequest />} />
            <Route path="/tender-alerte" element={<TenderAlert />} />
            <Route path="/alerte-management" element={<AlertManagement />} />
            <Route path="/construction-sites-map" element={<ConstructionSitesMap />} />
            <Route path="/construction-site/:siteId" element={<ConstructionSiteDetail />} />
            <Route path="/submit-quote" element={<SubmitQuote />} />
            <Route path="/submit-quote/:tenderId" element={<SubmitQuote />} />
            <Route path="/submit-quote/:tenderId/:lotId" element={<SubmitQuote />} />
            <Route path="/services-quote-management" element={<ServicesQuoteManagement />} />
            <Route path="/services-quote-tracking/:quoteId" element={<ServicesQuoteTracking />} />
            <Route path="/quotes-to-analyze" element={<QuotesToAnalyze />} />
            <Route path="/quote-analysis/:quoteId" element={<QuoteAnalysis />} />
            <Route path="/company-details-tender/:quoteId" element={<CompanyDetailsTender />} />
            <Route path="/services-tender-search" element={<ServicesTenderSearch />} />
            <Route path="/services-tender-details/:tenderId" element={<ServicesTenderDetails />} />
            <Route path="/submit-services-quote/:tenderId" element={<SubmitServicesQuote />} />
            <Route path="/services-detail-tender/:quoteId" element={<ServicesDetailTender />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
