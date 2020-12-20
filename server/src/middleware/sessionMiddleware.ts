import connectPgSimple from 'connect-pg-simple';
import {Express} from 'express';
import session from "express-session";
import { COOKIE_NAME, __prod__ } from '../constants';

export function useSessionMiddleware(app: Express){
  const pgSession = connectPgSimple(session);

  app.use(
    session({
      name: COOKIE_NAME,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: __prod__,
        sameSite: 'lax'
      },
      saveUninitialized: false,
      secret: 'veryimportantsecret',
      resave: false,
      store: new pgSession({
        conObject: {
          host: 'localhost',
          database: 'test',
          user: 'test',
          password: 'test'
        },
        tableName: 'session'
      })
    })
  );
}