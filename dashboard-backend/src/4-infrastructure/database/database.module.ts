// src/4-infrastructure/database/database.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { IUserRepository } from '../../3-domain/repositories/user.repository.interface';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';

@Module({
  providers: [
    PrismaService,
    // C'est ici qu'on fait le lien entre l'interface et l'implémentation
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  // On exporte pour que d'autres modules puissent demander IUserRepository
  exports: [IUserRepository],
})
export class DatabaseModule {}