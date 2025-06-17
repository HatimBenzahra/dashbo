// src/components/custom/PersonalInfoCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type InfoItemProps = {
  label: string;
  value: string | number;
};

// Petit composant interne pour éviter la répétition
function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

type PersonalInfoCardProps = {
  data: {
    nom: string;
    prenom: string;
    dateInscription: string;
    tempsPasse: string;
    manager: string;
    equipe: string;
  }
}

export function PersonalInfoCard({ data }: PersonalInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
          <InfoItem label="Nom" value={data.nom} />
          <InfoItem label="Prénom" value={data.prenom} />
          <InfoItem label="Date d'inscription" value={data.dateInscription} />
          <InfoItem label="Temps passé sur site" value={data.tempsPasse} />
          <InfoItem label="Manager supérieur" value={data.manager} />
          <InfoItem label="Équipe assignée" value={data.equipe} />
        </div>
      </CardContent>
    </Card>
  );
}