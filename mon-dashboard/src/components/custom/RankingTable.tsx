// src/components/custom/RankingTable.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
  } from "@/components/ui/card"
  
  // Données de démo pour le classement
  const rankingData = [
    { name: "Martin", teamPerformance: "34%" },
    { name: "Dubois", teamPerformance: "31%" },
    { name: "Bernard", teamPerformance: "28%" },
    { name: "Thomas", teamPerformance: "25%" },
    { name: "Robert", teamPerformance: "22%" },
  ];
  
  export function RankingTable() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Classement par manager</CardTitle>
          <CardDescription>Top 5 des managers les plus performants.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nom</TableHead>
                <TableHead className="text-right">Performances Équipe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankingData.map((manager) => (
                <TableRow key={manager.name}>
                  <TableCell className="font-medium">{manager.name}</TableCell>
                  <TableCell className="text-right">{manager.teamPerformance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }