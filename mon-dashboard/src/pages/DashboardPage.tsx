// src/pages/DashboardPage.tsx

import { StatCard } from '@/components/custom/StatCard';
import { SalesLineChart } from '@/components/custom/SalesLineChart';
import { ManagerDonutChart } from '@/components/custom/ManagerDonutChart';
import { RankingTable } from '@/components/custom/RankingTable';
import { ManagerBarChart } from '@/components/custom/ManagerBarChart';
import { PageHeader } from '@/components/custom/PageHeader';

export function DashboardPage() {
  // --- CORRECTION : Logique pour obtenir la date actuelle ---

  // 1. Obtenir la date d'aujourd'hui
  const today = new Date();

  // 2. Créer un formateur pour avoir la date en format "jour mois année" en français
  const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // 3. Formater la date pour l'affichage
  const formattedDate = dateFormatter.format(today);
  
  // --- FIN DE LA CORRECTION ---

  return (
    <div className="flex flex-col gap-8">
      {/* Utilisation du composant PageHeader avec la date dynamique */}
      <PageHeader title="Espace Admin">
        <p className="text-lg">{formattedDate}</p>
      </PageHeader>

      {/* Section des statistiques d'ensemble */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Statistique d'ensemble</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Les StatCards seront animées grâce aux modifications dans leur propre fichier */}
          <StatCard title="Portes visitées cette semaine" value={15} />
          <StatCard title="RDV pris" value={15} />
          <StatCard title="Contrats signés" value={15} />
          <StatCard title="Taux d'ouverture moyen" value="15%" />
        </div>
      </div>

      {/* Grille principale pour les graphiques et le tableau */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Colonne de gauche (2/3 de la largeur) */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <SalesLineChart />
          <ManagerBarChart />
        </div>

        {/* Colonne de droite (1/3 de la largeur) */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <ManagerDonutChart />
          <RankingTable />
        </div>
        
      </div>
    </div>
  );
}