// src/components/custom/PageHeader.tsx
import * as React from 'react';

type PageHeaderProps = {
  title: string;
  children?: React.ReactNode; // Pour ajouter des éléments à droite, comme la date
};

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between rounded-lg bg-black p-4 text-white">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {children}
    </header>
  );
}