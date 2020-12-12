import path from 'path';
import express from 'express';

const appPort = 3000;
const app = express();

app.use('/javascript', express.static(path.join(process.cwd(), 'dist', 'javascript')));
app.use('/public', express.static(path.join(process.cwd(), 'public')));

app.set('views', path.join(process.cwd(), 'src', 'views'));
app.engine('html', require('ejs').renderFile);

app.get('/', (_, res) => {
  res.render('index.html');
});

app.listen(appPort, () => console.log(`App listening on ${appPort}`));