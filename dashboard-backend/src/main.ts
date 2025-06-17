// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './config/cors/cors.config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express'; // <--- ASSUREZ-VOUS QUE CET IMPORT EST LÀ

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CETTE LIGNE EST LA PLUS IMPORTANTE DE TOUTES ---
  // Elle doit être appelée AVANT les pipes et autres middlewares qui dépendent du body.
  // Elle dit à NestJS: "Apprends à lire le format JSON dans les requêtes".
  app.use(express.json());
  // ----------------------------------------------------

  app.enableCors(corsConfig);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(3000);
}
bootstrap();