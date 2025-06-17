// src/pages/ManagersPage.tsx

import * as React from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/custom/PageHeader';
// LA CORRECTION EST ICI :
import { DataTable, type DataTableColumn } from '@/components/custom/DataTable';

// ... (le reste du fichier est correct)

// Données de démo (inchangées)
const allManagersData = [
  { id: "M1121", nom: "Dubois", prenom: "Jean", email: "jean.dubois@XX.com", equipes: 10 },
  { id: "M1122", nom: "Martin", prenom: "Sophie", email: "sophie.martin@XX.com", equipes: 5 },
  { id: "M1123", nom: "Bernard", prenom: "Luc", email: "luc.bernard@XX.com", equipes: 8 },
  { id: "M1124", nom: "Robert", prenom: "Jeanne", email: "jeanne.robert@XX.com", equipes: 12 },
];

// Définir le type pour un manager pour plus de sécurité
type Manager = typeof allManagersData[0];

// Définir les colonnes pour notre DataTable
const columns: DataTableColumn<Manager>[] = [
  { key: 'id', header: 'Id', className: "w-[100px] font-normal text-muted-foreground" },
  { key: 'nom', header: 'Nom', className: "font-normal text-muted-foreground" },
  { key: 'equipes', header: "Nombre d'équipes", className: "font-normal text-muted-foreground" },
  { key: 'actions', header: 'Action', className: "text-right font-normal text-muted-foreground" },
];

export function ManagersPage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return allManagersData;
    return allManagersData.filter(manager =>
      manager.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Fonction pour définir comment chaque cellule est rendue
  const renderCell = (manager: Manager, columnKey: keyof Manager | 'actions') => {
    switch (columnKey) {
      case 'id':
        return <span className="font-medium text-muted-foreground">{manager.id}</span>;
      case 'nom':
        return (
          <a href="#" className="group">
            <div className="font-medium group-hover:underline">{manager.nom} {manager.prenom}</div>
            <div className="text-sm text-muted-foreground">{manager.email}</div>
          </a>
        );
      case 'equipes':
        return <span className="text-muted-foreground">{manager.equipes}</span>;
      case 'actions':
        return (
          <div className="text-right">
            <Button
              variant="link"
              className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Voir équipes
            </Button>
          </div>
        );
      default:
        return manager[columnKey];
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Managers" />

      {/* Barre d'outils avec Recherche et Boutons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher par nom ou prénom..."
            className="w-full rounded-lg bg-white pl-8 sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" className="justify-start w-full sm:w-auto">
            <PlusCircle />
            Ajouter un manager
          </Button>
          <Button variant="outline" className="justify-start w-full sm:w-auto">
            <PlusCircle />
            Supprimer un manager
          </Button>
        </div>
      </div>

      {/* Appel du composant DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        renderCell={renderCell}
      />
    </div>
  );
}