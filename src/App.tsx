
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
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
