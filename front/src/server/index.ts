import path from "path";
import express from "express";
import fetch from 'node-fetch';
import {
  isLoggedMiddleware,
  isNotLoggedMiddleware,
} from "./middleware/authMiddleware";
import { BACKEND_SERVER } from "./constants";

const appPort = 3000;
const app = express();

app.use(
  "/javascript",
  express.static(path.join(process.cwd(), "dist", "javascript"))
);
app.use(express.static(path.join(process.cwd(), "src", "public")));

app.set("views", path.join(process.cwd(), "src", "views"));
app.engine("html", require("ejs").renderFile);

app.use("/login", isLoggedMiddleware);
app.use("/", isNotLoggedMiddleware);

app.get("/", async (_, res) => {
  res.render("main.html", { jsFile: "main" });
});

app.get("/register/:key", async (req, res) => {
  const key = req.params.key;
  const response = await fetch(`${BACKEND_SERVER}/invitation/${key}`);
  const json = await response.json();
  const valid = json.valid;

  if(valid){
    return res.render("main.html", { jsFile: "register" });
  }
  res.redirect('/');
});

app.get("/login", async (_, res) => {
  // const data = ReactDOMServer.renderToString(
  //   <QueryClientProvider client={new QueryClient()}>
  //     <Login />
  //   </QueryClientProvider>
  // );
  res.render("index.html", { data: "" });
});

app.listen(appPort, () => console.log(`App listening on ${appPort}`));
