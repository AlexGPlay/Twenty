import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import path from 'path';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloContext } from "./types";

const main = async () => {
  const conn = await createConnection();
  await conn.runMigrations();

  const appPort = 4000;
  const app = express();

  const corsConfig = cors({
    origin: '*',
    credentials: true
  });
  app.use(corsConfig);
  
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