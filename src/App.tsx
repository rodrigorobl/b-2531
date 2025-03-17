
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
import TenderDetail from "./pages/TenderDetail";
import Company from "./pages/Company";
import EditCompany from "./pages/EditCompany";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import UserProfileSettings from "./pages/UserProfileSettings";
import CreateTender from "./pages/CreateTender";
import CompanyDirectory from "./pages/CompanyDirectory";
import ProjectsList from "./pages/ProjectsList";
import LotAnalysis from "./pages/LotAnalysis";
import TenderList from "./pages/TenderList";

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
            <Route path="/tender/:tenderId" element={<TenderDetail />} />
            <Route path="/tender/:projectId/lot/:lotId" element={<LotAnalysis />} />
            <Route path="/tender-specifications" element={<Index />} />
            <Route path="/tender-list" element={<TenderList />} />
            <Route path="/create-tender" element={<CreateTender />} />
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/company" element={<Company />} />
            <Route path="/company/edit" element={<EditCompany />} />
            <Route path="/profile" element={<UserProfileSettings />} />
            <Route path="/profile/user/:userId" element={<UserProfile />} />
            <Route path="/directory" element={<CompanyDirectory />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
