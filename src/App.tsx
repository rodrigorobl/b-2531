import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Messaging from "./pages/Messaging";
import TenderOffers from "./pages/TenderOffers";
import TenderSearch from "./pages/TenderSearch";
import Company from "./pages/Company";
import EditCompany from "./pages/EditCompany";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import CreateTender from "./pages/CreateTender";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/tenders" element={<TenderOffers />} />
          <Route path="/tender-search" element={<TenderSearch />} />
          <Route path="/tender-management" element={<Index />} />
          <Route path="/create-tender" element={<CreateTender />} />
          <Route path="/company" element={<Company />} />
          <Route path="/company/edit" element={<EditCompany />} />
          <Route path="/profile/user/:userId" element={<UserProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
