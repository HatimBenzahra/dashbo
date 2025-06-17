// src/pages/SuiviPage.tsx
import * as React from 'react';
import { PageHeader } from '@/components/custom/PageHeader';
import { LiveTrackingMap, type SalespersonStatus } from '@/components/custom/LiveTrackingMap';
import { AudioPlayer } from '@/components/custom/AudioPlayer';

// --- Données de démo (prêtes pour le backend) ---
// Dans une vraie application, ces données viendraient d'un WebSocket.
const mockSalespeopleStatus: SalespersonStatus[] = [
    { id: 'A1121', nom: 'BENZAHRA', prenom: 'Hatim', coordinates: [2.33, 48.86], enProspection: true },
    { id: 'B4567', nom: 'Dupont', prenom: 'Marie', coordinates: [2.36, 48.85], enProspection: false },
    { id: 'C8910', nom: 'Leroy', prenom: 'Lucas', coordinates: [2.34, 48.87], enProspection: true },
  ];

export function SuiviPage() {
  // 1. Gérer l'état : quel commercial est sélectionné et si on est en train d'écouter
  const [selectedSalesperson, setSelectedSalesperson] = React.useState<SalespersonStatus | null>(null);
  const [isListening, setIsListening] = React.useState(false);

  // 2. Fonctions de rappel (handlers)
  const handleSelectSalesperson = (salesperson: SalespersonStatus | null) => {
    setSelectedSalesperson(salesperson);
    // Si on change de commercial, on arrête l'écoute en cours
    if (isListening) {
      handleStopListening();
    }
  };

  const handleStartListening = () => {
    if (selectedSalesperson) {
      console.log(`[BACKEND-SIM] Demande de streaming audio pour ${selectedSalesperson.nom}...`);
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (selectedSalesperson) {
      console.log(`[BACKEND-SIM] Arrêt du streaming audio pour ${selectedSalesperson.nom}.`);
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] gap-6">
      <PageHeader title="Suivi en direct des Commerciaux" />

      {/* 3. Layout principal : grille pour la carte et le panneau de contrôle */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        
        {/* Colonne de la carte (prend 2/3 de la largeur sur grand écran) */}
        <div className="lg:col-span-2 h-full min-h-[400px]">
          <LiveTrackingMap 
            salespeople={mockSalespeopleStatus} 
            selectedSalesperson={selectedSalesperson}
            onSelectSalesperson={handleSelectSalesperson}
          />
        </div>

        {/* Colonne du lecteur audio (prend 1/3 de la largeur) */}
        <div className="lg:col-span-1 h-full min-h-[400px]">
          {selectedSalesperson ? (
            <AudioPlayer 
              salesperson={selectedSalesperson}
              isListening={isListening}
              onPlay={handleStartListening}
              onStop={handleStopListening}
            />
          ) : (
            <div className="flex items-center justify-center h-full rounded-lg border bg-card text-card-foreground p-6">
              <p className="text-center text-muted-foreground">
                Cliquez sur un commercial sur la carte pour commencer le suivi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}