// src/4-infrastructure/database/prisma/prisma.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Cette méthode est appelée automatiquement par NestJS lorsque le module est initialisé.
  async onModuleInit() {
    // On établit la connexion à la base de données.
    await this.$connect();
  }
}