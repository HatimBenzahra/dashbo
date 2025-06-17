// src/components/custom/AudioPlayer.tsx
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Pause, Play, Square } from 'lucide-react';
import { type SalespersonStatus } from './LiveTrackingMap'; // On réutilise le type

type AudioPlayerProps = {
  salesperson: SalespersonStatus;
  isListening: boolean;
  onPlay: () => void;
  onStop: () => void;
};

export function AudioPlayer({ salesperson, isListening, onPlay, onStop }: AudioPlayerProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Écoute en direct
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 h-full pb-20">
        <p className="text-lg font-medium">{`${salesperson.prenom} ${salesperson.nom}`}</p>

        <div className="flex items-center gap-2 text-sm">
          <div className={`h-2 w-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
          <span>{isListening ? 'En écoute...' : 'En attente'}</span>
        </div>

        <div className="flex gap-4 mt-4">
          <Button size="icon" onClick={onPlay} disabled={isListening}>
            <Play className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="destructive" onClick={onStop} disabled={!isListening}>
            <Square className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Cliquez pour démarrer le streaming audio.</p>
      </CardContent>
    </Card>
  );
}