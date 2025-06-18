// src/1-presentation/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { LoginUseCase } from 'src/2-application/use-cases/auth/login.use-case';
import { DatabaseModule } from 'src/4-infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule,
    // On importe le module Database pour avoir accès au IUserRepository
    DatabaseModule,
    // On configure le module JWT
    JwtModule.registerAsync({
      global: true, // Rend le JwtService disponible dans toute l'application
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' }, // Le token expirera après 8 heures
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    // On déclare le cas d'usage pour qu'il soit injectable dans le contrôleur
    LoginUseCase,
  ],
})
export class AuthModule {}