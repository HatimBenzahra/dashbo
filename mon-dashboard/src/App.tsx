// src/App.tsx

import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/custom/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ManagersPage } from './pages/ManagersPage'; 
import { SalespeoplePage } from './pages/SalespeoplePage';
import { TeamsPage } from './pages/TeamsPage';
// Importer la nouvelle page
import { SalespersonDetailPage } from './pages/SalespersonDetailPage'; 
import { SuiviPage } from './pages/SuiviPage';

function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="suivi" element={<SuiviPage />} />
        <Route path="managers" element={<ManagersPage />} />
        {/* On garde la liste des commerciaux */}
        <Route path="salespeople" element={<SalespeoplePage />} />
        {/* On ajoute la route de détail avec un ID dynamique */}
        <Route path="salespeople/:salespersonId" element={<SalespersonDetailPage />} />
        <Route path="teams" element={<TeamsPage />} />
      </Route>
    </Routes>
  );
}

export default App;