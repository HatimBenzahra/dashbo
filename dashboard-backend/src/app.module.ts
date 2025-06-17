// src/app.module.ts

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthModule } from './1-presentation/auth/auth.module';
import { DatabaseModule } from './4-infrastructure/database/database.module';
import { LoggerMiddleware } from './logger.middleware'; // <--- 1. IMPORTER L'ESPION

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
// 2. FAIRE EN SORTE QUE LE MODULE UTILISE LES MIDDLEWARES
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 3. APPLIQUER NOTRE ESPION À TOUTES LES ROUTES
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // '*' signifie "pour toutes les routes"
  }
}