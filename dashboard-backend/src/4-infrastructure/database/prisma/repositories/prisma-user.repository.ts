// src/4-infrastructure/database/prisma/repositories/prisma-user.repository.ts

import { Injectable } from '@nestjs/common';
import { IUserRepository, CreateUserPayload } from 'src/3-domain/repositories/user.repository.interface';
import { User } from 'src/3-domain/entities/user.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  // On injecte le service Prisma pour pouvoir l'utiliser
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const userFromDb = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userFromDb) {
      return null;
    }

    // On "mappe" le résultat de la BDD vers notre entité du Domaine.
    // C'est une étape cruciale pour garder les couches découplées.
    const domainUser = new User();
    Object.assign(domainUser, userFromDb); // Copie les propriétés
    return domainUser;
  }

  async create(payload: CreateUserPayload): Promise<User> {
    // On sépare le mot de passe du reste des données
    const { password, ...userData } = payload;
    
    // On utilise la méthode statique de notre entité pour hacher le mot de passe
    const passwordHash = await User.hashPassword(password);

    const newUserFromDb = await this.prisma.user.create({
      data: {
        ...userData,
        passwordHash, // On stocke le hash, pas le mot de passe en clair
      },
    });
    
    const domainUser = new User();
    Object.assign(domainUser, newUserFromDb);
    return domainUser;
  }
}