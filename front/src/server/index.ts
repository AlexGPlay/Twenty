import path from 'path';
import express from 'express';
import React from "react";
import ReactDOMServer from 'react-dom/server';
import Login from '../javascript/login/login';

const appPort = 3000;
const app = express();

app.use('/javascript', express.static(path.join(process.cwd(), 'dist', 'javascript')));
app.use(express.static(path.join(process.cwd(), 'src', 'public')));

app.set('views', path.join(process.cwd(), 'src', 'views'));
app.engine('html', require('ejs').renderFile);

app.get('/', (_, res) => {
  const htmlCode = ReactDOMServer.renderToString(React.createElement(Login));
  res.render('index.html', { htmlCode });
});

app.listen(appPort, () => console.log(`App listening on ${appPort}`));