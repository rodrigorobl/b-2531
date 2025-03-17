import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Dashboard from '@/pages/Dashboard';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import TenderOffers from '@/pages/TenderOffers';
import TenderDetail from '@/pages/TenderDetail';
import Messaging from '@/pages/Messaging';
import Profile from '@/pages/Profile';
import Company from '@/pages/Company';
import Directory from '@/pages/Directory';
import TenderSearch from '@/pages/TenderSearch';
import TenderManagement from '@/pages/TenderManagement';
import TenderManagementPromoter from '@/pages/TenderManagementPromoter';
import DashboardPromoter from '@/pages/dashboards/DashboardPromoter';
import DashboardBET from '@/pages/dashboards/DashboardBET';
import DashboardConstruction from '@/pages/dashboards/DashboardConstruction';
import DashboardServices from '@/pages/dashboards/DashboardServices';
import DashboardIndustry from '@/pages/dashboards/DashboardIndustry';
import ProjectManagement from '@/pages/ProjectManagement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
    path: "/projects",
    element: <Projects />
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
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/company",
    element: <Company />
  },
  {
    path: "/directory",
    element: <Directory />
  },
  {
    path: "/tender-search",
    element: <TenderSearch />
  },
  {
    path: "/tender-management",
    element: <TenderManagementPromoter />
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
