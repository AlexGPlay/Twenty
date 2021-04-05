import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { useBullController } from './controller/bullController';
import { useValidationController } from './controller/validationController';
import { useApolloMiddleware } from './middleware/apolloMiddleware';
import { useCorsMiddleware } from './middleware/corsMiddleware';
import { useSessionMiddleware } from './middleware/sessionMiddleware';

const main = async () => {
  await createConnection();
  //await conn.runMigrations();

  const appPort = 4000;
  const app = express();
  
  useCorsMiddleware(app);
  useSessionMiddleware(app);
  await useApolloMiddleware(app);

  useValidationController(app);
  useBullController(app);

  app.listen(appPort, () => console.log(`Server listening on ${appPort}`));
}

main().catch(e => console.log(e));