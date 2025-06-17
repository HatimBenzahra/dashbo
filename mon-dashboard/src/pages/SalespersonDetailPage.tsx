// src/pages/SalespersonDetailPage.tsx

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/custom/PageHeader';
import { PersonalInfoCard } from '@/components/custom/PersonalInfoCard';
import { DataTable, type DataTableColumn } from '@/components/custom/DataTable';
import { WeeklyProspectingChart } from '@/components/custom/WeeklyProspectingChart';
import { StatCard } from '@/components/custom/StatCard';

// --- MISE À JOUR : Création d'une "base de données" de démo ---
const allSalespeopleMockData = {
  "A1121": {
    details: {
      nom: "BENZAHRA", prenom: "Hatim", dateInscription: "13/06/2025",
      tempsPasse: "01:22:33", manager: "Dubois", equipe: "A",
    },
    prospectingHistory: [
      { id: 'H1', date: '12/06/2025', zone: 'Paris 15e', portes: 40, rdv: 4, contrats: 1 },
      { id: 'H2', date: '11/06/2025', zone: 'Paris 15e', portes: 30, rdv: 2, contrats: 0 },
    ],
    stats: {
      weeklyProspecting: {
        weekDescription: "Semaine du 10 Juin",
        data: [ { day: "Lundi", value: 25 }, { day: "Mardi", value: 35 }, { day: "Mercredi", value: 30 }, { day: "Jeudi", value: 40 }, { day: "Vendredi", value: 16 } ]
      },
      summary: [ { title: "RDV pris (semaine)", value: 15 }, { title: "Taux d'ouverture moyen", value: "21%" }, { title: "Taux de conversion", value: "12%" }, { title: "Contrats signés (semaine)", value: 3 } ]
    }
  },
  "B4567": { // Ajoutons les données de Marie Dupont pour tester
    details: {
      nom: "Dupont", prenom: "Marie", dateInscription: "01/02/2024",
      tempsPasse: "03:45:10", manager: "Martin", equipe: "B",
    },
    prospectingHistory: [
      { id: 'H5', date: '12/06/2025', zone: 'Lyon 2e', portes: 50, rdv: 8, contrats: 2 },
      { id: 'H6', date: '11/06/2025', zone: 'Lyon 3e', portes: 45, rdv: 5, contrats: 1 },
    ],
    stats: {
      weeklyProspecting: {
        weekDescription: "Semaine du 10 Juin",
        data: [ { day: "Lundi", value: 30 }, { day: "Mardi", value: 40 }, { day: "Mercredi", value: 22 }, { day: "Jeudi", value: 38 }, { day: "Vendredi", value: 25 } ]
      },
      summary: [ { title: "RDV pris (semaine)", value: 20 }, { title: "Taux d'ouverture moyen", value: "25%" }, { title: "Taux de conversion", value: "15%" }, { title: "Contrats signés (semaine)", value: 5 } ]
    }
  }
};

type SalespersonData = typeof allSalespeopleMockData[keyof typeof allSalespeopleMockData];
type HistoryEntry = SalespersonData['prospectingHistory'][0];

const historyColumns: DataTableColumn<HistoryEntry>[] = [
  { key: 'date', header: 'Date' }, { key: 'zone', header: 'Zone' },
  { key: 'portes', header: 'Portes' }, { key: 'rdv', header: 'RDV' },
  { key: 'contrats', header: 'Contrats' },
];

export function SalespersonDetailPage() {
  const { salespersonId } = useParams();

  // --- CORRECTION : On utilise l'ID pour trouver les données ---
  const data = React.useMemo(() => {
    // Si l'ID existe et qu'on le trouve dans notre "DB", on retourne les données.
    if (salespersonId && salespersonId in allSalespeopleMockData) {
      return allSalespeopleMockData[salespersonId as keyof typeof allSalespeopleMockData];
    }
    // Sinon, on retourne null.
    return null;
  }, [salespersonId]); // Ce calcul se refait uniquement si salespersonId change.

  const renderHistoryCell = (item: HistoryEntry, columnKey: keyof HistoryEntry | 'actions') => {
    switch (columnKey) {
      case 'actions': return null;
      default: return <span className="text-muted-foreground">{item[columnKey]}</span>;
    }
  };

  // --- GESTION DU CAS OÙ LES DONNÉES NE SONT PAS TROUVÉES ---
  if (!data) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader title="Erreur" />
        <p className="text-center text-muted-foreground mt-8">
          Le commercial avec l'ID "{salespersonId}" n'a pas été trouvé.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={`Profil de ${data.details.prenom} ${data.details.nom}`} />

      <PersonalInfoCard data={data.details} />

      <div>
        <h2 className="text-xl font-semibold mb-4">Historique de prospection</h2>
        <DataTable
          columns={historyColumns}
          data={data.prospectingHistory}
          renderCell={renderHistoryCell}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyProspectingChart 
            data={data.stats.weeklyProspecting.data} 
            weekDescription={data.stats.weeklyProspecting.weekDescription}
          />
          <div className="flex flex-col gap-6">
            {data.stats.summary.map(stat => (
              <StatCard key={stat.title} title={stat.title} value={stat.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}