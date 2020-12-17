import { Request, Response } from 'express';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export type ApolloContext = {
  req: Request;
  res: Response;
}