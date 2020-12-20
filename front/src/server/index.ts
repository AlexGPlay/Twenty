import path from 'path';
import express from 'express';
import {isLoggedMiddleware, isNotLoggedMiddleware} from './middleware/authMiddleware';

const appPort = 3000;
const app = express();

app.use('/javascript', express.static(path.join(process.cwd(), 'dist', 'javascript')));
app.use(express.static(path.join(process.cwd(), 'src', 'public')));

app.set('views', path.join(process.cwd(), 'src', 'views'));
app.engine('html', require('ejs').renderFile);

app.use('/login', isLoggedMiddleware);
app.use('/', isNotLoggedMiddleware);

app.get('/', async (_, res) => {
  res.send("Logged in");
});

app.get('/login', async (_, res) => {
  res.render('index.html');
});

app.listen(appPort, () => console.log(`App listening on ${appPort}`));