import connectPgSimple from 'connect-pg-simple';
import {Express} from 'express';
import session from "express-session";
import { Server } from 'socket.io';
import { getConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from '../constants';

export function useSessionMiddleware(app: Express){
  const pgSession = connectPgSimple(session);
  const pgStore = new pgSession({
    conObject: {
      host: 'localhost',
      database: 'test',
      user: 'test',
      password: 'test'
    },
    tableName: 'session'
  }); 

  const middleware = session({
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
    store: pgStore
  });

  app.use(middleware);
  return { pgStore, middleware };
}

export function useSessionMiddlewareOnSocketIo(io: Server){
  io.use(async (socket, next) => {
    const id = socket.request.headers.cookie?.slice(8, 40);
    if(!id) return next(new Error("Invalid user Id"));
    const qr = getConnection().createQueryRunner();
    const session = await qr.query(`SELECT sess FROM public.session WHERE sid='${id}'`);
    if(!session || !session[0]) return next(new Error("Invalid session"));
    socket.request.userId = session[0].sess.userId;
    next();
  });
}