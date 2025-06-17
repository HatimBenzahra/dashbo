// src/config/cors/cors.config.ts
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// À terme, ces valeurs viendront de votre fichier .env
const allowedOrigins = [
    'http://localhost:5173', // Port par défaut de Vite/React
    // Ajoutez ici les URL de vos autres frontends si nécessaire
];

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
};