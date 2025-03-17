
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Dashboard from '@/pages/Dashboard';
import ProjectDetail from '@/pages/ProjectDetail';
import TenderOffers from '@/pages/TenderOffers';
import TenderDetail from '@/pages/TenderDetail';
import Messaging from '@/pages/Messaging';
import Company from '@/pages/Company';
import TenderSearch from '@/pages/TenderSearch';
import TenderManagementPromoter from '@/pages/TenderManagementPromoter';
import ProjectManagement from '@/pages/ProjectManagement';
import DashboardPromoter from '@/pages/dashboards/DashboardPromoter';
import DashboardBET from '@/pages/dashboards/DashboardBET';
import DashboardConstruction from '@/pages/dashboards/DashboardConstruction';
import DashboardServices from '@/pages/dashboards/DashboardServices';
import DashboardIndustry from '@/pages/dashboards/DashboardIndustry';
import CreateTender from '@/pages/CreateTender';
import CompanyDirectory from '@/pages/CompanyDirectory';
import NotFound from '@/pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard-promoteur" replace />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="/dashboard-promoteur" replace />,
  },
  {
    path: "/dashboard-promoteur",
    element: <DashboardPromoter />,
  },
  {
    path: "/dashboard-bet",
    element: <DashboardBET />,
  },
  {
    path: "/dashboard-construction",
    element: <DashboardConstruction />,
  },
  {
    path: "/dashboard-services",
    element: <DashboardServices />,
  },
  {
    path: "/dashboard-industry",
    element: <DashboardIndustry />,
  },
  {
    path: "/project-detail/:id",
    element: <ProjectDetail />
  },
  {
    path: "/project-management",
    element: <ProjectManagement />
  },
  {
    path: "/tender-offers",
    element: <TenderOffers />
  },
  {
    path: "/tender-detail/:id",
    element: <TenderDetail />
  },
  {
    path: "/messaging",
    element: <Messaging />
  },
  {
    path: "/company",
    element: <Company />
  },
  {
    path: "/directory",
    element: <CompanyDirectory />
  },
  {
    path: "/tender-search",
    element: <TenderSearch />
  },
  {
    path: "/tender-management",
    element: <TenderManagementPromoter />
  },
  {
    path: "/create-tender",
    element: <CreateTender />
  },
  {
    path: "*",
    element: <NotFound />
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
