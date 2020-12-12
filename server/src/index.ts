import express from 'express';
import cors from 'cors';

const appPort = 4000;
const app = express();

const corsConfig = cors({
  origin: '*',
  credentials: true
});

app.use(corsConfig);

app.get("/", (_, res) => {
  res.send({
    msg: 'Test'
  });
})

app.listen(appPort, () => console.log(`Server listening on ${appPort}`));