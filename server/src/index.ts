import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import path from 'path';
import session from "express-session";
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloContext } from "./types";
import { COOKIE_NAME, __prod__ } from './constants';
import connectPgSimple from 'connect-pg-simple';

const main = async () => {
  const conn = await createConnection();
  //await conn.runMigrations();
  const pgSession = connectPgSimple(session);

  const appPort = 4000;
  const app = express();

  const corsConfig = cors({
    origin: '*',
    credentials: true
  });
  app.use(corsConfig);

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
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [path.join(__dirname, 'resolvers/*.js')],
      validate: true
    }),
    context: ({ req, res }): ApolloContext => ({ req, res })
  });

  apolloServer.applyMiddleware({ app });
  app.listen(appPort, () => console.log(`Server listening on ${appPort}`));
}

main().catch(e => console.log(e));