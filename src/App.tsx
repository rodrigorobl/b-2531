
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "./components/ui/toaster";
import { ProfileProvider } from './contexts/ProfileContext';
import Home from './pages/Home';
import TenderList from './pages/TenderList';
import TenderDetails from './pages/TenderDetails';
import CreateTender from './pages/CreateTender';
import CreateTenderConception from './pages/CreateTenderConception';
import CreateTenderRealisation from './pages/CreateTenderRealisation';
import CreateTenderServices from './pages/CreateTenderServices';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import InviteCompanies from './pages/InviteCompanies';
import DashboardPromoteur from './pages/DashboardPromoteur';
import DashboardConstruction from './pages/DashboardConstruction';
import DashboardBET from './pages/DashboardBET';
import DashboardIndustry from './pages/DashboardIndustry';
import Dashboard from './pages/Dashboard';
import DashboardServices from './pages/DashboardServices';
import ProductPrescriptionTracking from './pages/ProductPrescriptionTracking';
import ProductReferenceTracking from './pages/ProductReferenceTracking';
import ProjectsSearch from './pages/ProjectsSearch';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <ProfileProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tender-list" element={<TenderList />} />
          <Route path="/tender-details/:id" element={<TenderDetails />} />
          <Route path="/create-tender" element={<CreateTender />} />
          <Route path="/create-tender-conception" element={<CreateTenderConception />} />
          <Route path="/create-tender-realisation" element={<CreateTenderRealisation />} />
          <Route path="/create-tender-services" element={<CreateTenderServices />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/invite-companies" element={<InviteCompanies />} />
          <Route path="/dashboard-promoteur" element={<DashboardPromoteur />} />
          <Route path="/dashboard-construction" element={<DashboardConstruction />} />
          <Route path="/dashboard-bet" element={<DashboardBET />} />
          <Route path="/dashboard-industry" element={<DashboardIndustry />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-services" element={<DashboardServices />} />
          <Route path="/product-prescription" element={<ProductPrescriptionTracking />} />
          <Route path="/product-reference" element={<ProductReferenceTracking />} />
          <Route path="/projects-search" element={<ProjectsSearch />} />
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
