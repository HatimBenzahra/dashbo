// src/pages/SalespeoplePage.tsx

import * as React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/custom/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/custom/DataTable';

// Données de démo
const allSalespeopleData = [
  { id: "A1121", nom: "BENZAHRA", prenom: "Hatim", email: "benzahrahatim2001@XX.com", equipe: "A", manager: "Dubois" },
  { id: "B4567", nom: "Dupont", prenom: "Marie", email: "marie.dupont@XX.com", equipe: "B", manager: "Martin" },
  { id: "C8910", nom: "Leroy", prenom: "Lucas", email: "lucas.leroy@XX.com", equipe: "C", manager: "Dubois" },
  { id: "D1112", nom: "Petit", prenom: "Camille", email: "camille.petit@XX.com", equipe: "A", manager: "Martin" },
];

type Salesperson = typeof allSalespeopleData[0];

// Définition des colonnes pour les commerciaux
const columns: DataTableColumn<Salesperson>[] = [
  { key: 'id', header: 'Id', className: "font-normal text-muted-foreground" },
  { key: 'nom', header: 'Nom', className: "font-normal text-muted-foreground" },
  { key: 'prenom', header: 'Prénom', className: "font-normal text-muted-foreground" },
  { key: 'email', header: 'Email', className: "font-normal text-muted-foreground" },
  { key: 'manager', header: 'Manager', className: "font-normal text-muted-foreground" },
  { key: 'equipe', header: 'Équipe', className: "font-normal text-muted-foreground" },
  { key: 'actions', header: 'Action', className: "text-right font-normal text-muted-foreground" },
];

export function SalespeoplePage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return allSalespeopleData;
    return allSalespeopleData.filter(person =>
      person.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const renderCell = (person: Salesperson, columnKey: keyof Salesperson | 'actions') => {
    switch (columnKey) {
        case 'nom':
            return (
              <Link to={`/salespeople/${person.id}`} className="font-medium hover:underline">
                {person.nom}
              </Link>
            );
        case 'actions':
            return (
              <div className="text-right">
                <Button asChild variant="link" className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700 hover:underline">
                  <Link to={`/salespeople/${person.id}`}>Voir profil</Link>
                </Button>
              </div>
            );
        // --- CORRECTION : Suppression de la déclaration lexicale ---
        default:
            // On évite la déclaration 'const' en utilisant directement l'expression
            // pour ne pas enfreindre la règle no-case-declarations d'ESLint.
            return <span className="text-muted-foreground">{person[columnKey as keyof Salesperson]}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Commerciaux" />

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
            Ajouter un Commercial
          </Button>
          <Button variant="outline" className="justify-start w-full sm:w-auto">
            <PlusCircle />
            Supprimer un Commercial
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        renderCell={renderCell}
      />
    </div>
  );
}