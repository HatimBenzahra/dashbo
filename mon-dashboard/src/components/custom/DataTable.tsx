// src/components/custom/DataTable.tsx
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Type pour définir la structure d'une colonne
export type DataTableColumn<T> = {
  key: keyof T | 'actions'; // La clé dans l'objet de données, ou 'actions' pour les boutons
  header: string; // Le titre affiché dans le aableau
  className?: string; // Classes CSS optionnelles pour la colonne
};

// Props pour le composant DataTable
type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  // Une fonction pour rendre le contenu de chaque cellule, offrant une flexibilité maximale
  renderCell: (item: T, columnKey: keyof T | 'actions') => React.ReactNode;
};

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  renderCell,
}: DataTableProps<T>) {
  return (
    <Card>
      <CardContent className="p-0"> {/* p-0 pour que la table prenne toute la largeur */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {/* On retire la surbrillance au survol pour l'en-tête */}
              <TableRow className="border-b hover:bg-transparent">
                {columns.map((column) => (
                  <TableHead key={String(column.key)} className={column.className}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id} className="border-b">
                    {columns.map((column) => (
                      <TableCell key={String(column.key)} className="py-4">
                        {renderCell(item, column.key)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    Aucun résultat.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}