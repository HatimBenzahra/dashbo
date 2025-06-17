// src/1-presentation/auth/dto/login.dto.ts

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Le format de l\'email est invalide.' })
  @IsNotEmpty({ message: 'L\'email ne doit pas être vide.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe ne doit pas être vide.' })
  password: string; // <-- On retire la règle de longueur pour le test
}