import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { useBullController } from './controller/bullController';
import { useValidationController } from './controller/validationController';
import { useApolloMiddleware } from './middleware/apolloMiddleware';
import { useCorsMiddleware } from './middleware/corsMiddleware';
import { useSessionMiddleware, useSessionMiddlewareOnSocketIo } from './middleware/sessionMiddleware';
import httpServer from 'http';
import { Server } from 'socket.io';
import { FRONT_SERVER } from './constants';
import { useSocketController } from './controller/socketController';

const main = async () => {
  await createConnection();
  //await conn.runMigrations();

  const appPort = 4000;
  const app = express();
  const server = httpServer.createServer(app);
  const io = new Server(server, { cors: { origin: FRONT_SERVER, credentials: true } });
  
  useCorsMiddleware(app);
  useSessionMiddleware(app);
  useSessionMiddlewareOnSocketIo(io);

  await useApolloMiddleware(app);

  useValidationController(app);
  useBullController(app);
  useSocketController(io);

  server.listen(appPort, () => console.log(`Server listening on ${appPort}`));
}

main().catch(e => console.log(e));