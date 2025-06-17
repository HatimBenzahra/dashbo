// src/logger.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('\n\n--- [Logger Middleware] NOUVELLE REQUÊTE REÇUE ---');
    console.log('Méthode:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);

    // La ligne la plus importante : on vérifie le corps de la requête
    console.log('Contenu du Body AVANT traitement:', req.body);
    console.log('--------------------------------------------------\n\n');

    // On passe la main à la suite du traitement (vers les pipes et contrôleurs)
    next();
  }
}