import {Express} from 'express';
import cors from 'cors';

export function useCorsMiddleware(app: Express){
  const corsMiddleware = cors({ credentials: true, origin: 'http://localhost:3000' });
  app.use(corsMiddleware);
}