// src/2-application/use-cases/auth/login.use-case.ts

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/3-domain/repositories/user.repository.interface';
import { JwtService } from '@nestjs/jwt';

// Type pour les données d'entrée du cas d'usage
type LoginInput = {
  email: string;
  password: string;
};

// Type pour les données de sortie du cas d'usage
type LoginOutput = {
  accessToken: string;
  role: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
};

@Injectable()
export class LoginUseCase {
  // On injecte nos dépendances : le repository (via son interface) et le service JWT de NestJS.
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Exécute la logique de connexion.
   * @param input L'email et le mot de passe de l'utilisateur.
   * @returns Un jeton d'accès et les informations de l'utilisateur.
   * @throws UnauthorizedException si les identifiants sont incorrects.
   */
  async execute(input: LoginInput): Promise<LoginOutput> {
    const { email, password } = input;

    // 1. Trouver l'utilisateur par son email en utilisant le repository.
    const user = await this.userRepository.findByEmail(email);

    // 2. Vérifier si l'utilisateur existe et si le mot de passe est correct.
    // On utilise la méthode de notre entité du Domaine !
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    // 3. Préparer le "payload" du token JWT.
    // Ce sont les informations qu'on stocke dans le token.
    const payload = {
      sub: user.id, // 'sub' (subject) est la convention pour l'ID de l'utilisateur.
      email: user.email,
      role: user.role,
    };
    
    // 4. Créer le jeton d'accès.
    const accessToken = this.jwtService.sign(payload);

    // 5. Retourner les données nécessaires au frontend.
    return {
      accessToken,
      role: user.role,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}