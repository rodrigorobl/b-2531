
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LotAnalysis from '@/pages/LotAnalysis';

export function LotAnalysisRoutes() {
  return (
    <Routes>
      <Route path="/tender/:tenderId/lot/:lotId" element={<LotAnalysis />} />
    </Routes>
  );
}
