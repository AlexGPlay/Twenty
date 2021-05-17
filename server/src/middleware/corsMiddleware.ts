import {Express} from 'express';
import cors from 'cors';
import { FRONT_SERVER } from '../constants';

export function useCorsMiddleware(app: Express){
  const corsMiddleware = cors({ credentials: true, origin: FRONT_SERVER });
  app.use(corsMiddleware);
}