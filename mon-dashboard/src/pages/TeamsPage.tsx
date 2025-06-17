// src/pages/TeamsPage.tsx

import * as React from 'react';
import { Link } from 'react-router-dom'; // 1. Importer Link
import { PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from '@/lib/utils';

// --- Données de Démo (Harmonisées) ---
const allTeamsData = [
  { managerId: "dubois", name: "Alpha", effectif: 10, members: [
    // On utilise des IDs qui correspondent à ceux de SalespersonDetailPage
    { id: "A1121", nom: "BENZAHRA", prenom: "Hatim", age: 23, classement: 3 },
    { id: "D1112", nom: "Petit", prenom: "Camille", age: 28, classement: 1 },
  ]},
  { managerId: "martin", name: "Bravo", effectif: 5, members: [
    { id: "B4567", nom: "Dupont", prenom: "Marie", age: 31, classement: 2 },
  ]},
];
const allAvailableSalespeople = [
    { id: "S001", name: "Alice Durand" },
    { id: "S002", name: "Bob Lemoine" },
    { id: "S003", name: "Charlie Garcia" },
];
type Team = typeof allTeamsData[0];
// --- Fin des Données de Démo ---

export function TeamsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  const filteredTeams = React.useMemo(() => {
    return allTeamsData.filter(team => 
      team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  React.useEffect(() => {
    if (filteredTeams.length > 0) {
      setSelectedTeam(filteredTeams[0]);
    } else {
      setSelectedTeam(null);
    }
  }, [filteredTeams]);

  const handleAddCommercial = () => {
      console.log("Logique d'ajout du commercial à l'équipe sera ici...");
      setIsAddDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="rounded-lg bg-black p-4 text-white">
        <h1 className="text-2xl font-semibold">Les équipes & commerciaux</h1>
      </header>

      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une équipe..."
            className="w-full rounded-lg bg-white pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* COLONNE DE GAUCHE : LISTE DES ÉQUIPES */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader><CardTitle>Tableau Équipes</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-normal text-muted-foreground">Nom équipe</TableHead>
                    <TableHead className="text-right font-normal text-muted-foreground">Effectif</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.name} onClick={() => setSelectedTeam(team)}
                      className={cn("cursor-pointer", selectedTeam?.name === team.name && "bg-accent")}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell className="text-right">{team.effectif}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* COLONNE DE DROITE : DÉTAILS DE L'ÉQUIPE */}
        <div className="lg:col-span-2">
          {selectedTeam ? (
            <Card>
              <CardHeader><CardTitle>Équipe : <span className="font-bold">{selectedTeam.name}</span></CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <div className="flex md:justify-start">
                        <Button variant="outline" className="w-full md:w-auto"><PlusCircle className="mr-2 h-4 w-4"/>Ajouter un Commercial</Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: 'white', zIndex: 9999 }}>
                      <DialogHeader>
                        <DialogTitle>Ajouter un commercial à l'équipe "{selectedTeam.name}"</DialogTitle>
                        <DialogDescription>Recherchez un commercial pour l'ajouter à cette équipe.</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Command>
                          <CommandInput placeholder="Rechercher un commercial..." />
                          <CommandList>
                            <CommandEmpty>Aucun résultat.</CommandEmpty>
                            <CommandGroup>
                              {allAvailableSalespeople.map((salesperson) => (
                                <CommandItem key={salesperson.id} value={salesperson.name} onSelect={() => console.log(`Sélectionné: ${salesperson.name}`)}>
                                  {salesperson.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </div>
                      <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                        <Button onClick={handleAddCommercial}>Ajouter</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="flex md:justify-center"><Button variant="outline" className="w-full md:w-auto"><PlusCircle className="mr-2 h-4 w-4"/>Assigner à une zone</Button></div>
                  <div className="flex md:justify-end"><Button variant="outline" className="w-full md:w-auto"><PlusCircle className="mr-2 h-4 w-4"/>Supprimer</Button></div>
                </div>

                {/* Tableau des membres */}
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>ID</TableHead><TableHead>Nom</TableHead><TableHead>Prénom</TableHead><TableHead>Age</TableHead><TableHead>Classement</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTeam.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>{member.id}</TableCell>
                        {/* 2. Rendre le nom et le prénom cliquables */}
                        <TableCell>
                          <Link to={`/salespeople/${member.id}`} className="font-medium hover:underline">
                            {member.nom}
                          </Link>
                        </TableCell>
                        <TableCell>
                           <Link to={`/salespeople/${member.id}`} className="hover:underline">
                            {member.prenom}
                          </Link>
                        </TableCell>
                        <TableCell>{member.age}</TableCell>
                        <TableCell>{member.classement}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex h-full items-center justify-center p-6"><p className="text-muted-foreground">Aucune équipe trouvée ou sélectionnée.</p></Card>
          )}
        </div>
      </div>
    </div>
  );
}