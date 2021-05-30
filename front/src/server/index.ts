import path from "path";
import express from "express";
import fetch from "node-fetch";
import { isLoggedMiddleware, isNotLoggedMiddleware } from "./middleware/authMiddleware";
import { BACKEND_SERVER, DEVELOPMENT } from "./constants";
import proxy from "express-http-proxy";
import httpProxy from "http-proxy";
import http from "http";

const appPort = 3000;
const app = express();
const server = http.createServer(app);

if (!DEVELOPMENT) {
  app.use("/javascript", express.static(path.join(process.cwd(), "dist", "javascript")));
} else {
  app.use(
    "/javascript",
    proxy("localhost:9000", { proxyReqPathResolver: (req) => req.originalUrl })
  );
  app.use(
    "/sockjs-node",
    proxy("localhost:9000", { proxyReqPathResolver: (req) => req.originalUrl })
  );
  app.use("/", (req, res, next) => {
    if (req.url.includes(".hot-update.")) {
      return proxy("localhost:9000", {
        proxyReqPathResolver: (req) => "/javascript/" + req.originalUrl,
      })(req, res, next);
    }
    next();
  });

  const proxyServer = httpProxy.createProxyServer({ target: "http://localhost:9000", ws: true });
  server.on("upgrade", (req, socket, head) => {
    proxyServer.ws(req, socket, head);
  });
}

app.use(express.static(path.join(process.cwd(), "src", "public")));

app.set("views", path.join(process.cwd(), "src", "views"));
app.engine("html", require("ejs").renderFile);

app.use("/login", isLoggedMiddleware);
app.use("/", isNotLoggedMiddleware);

app.get("/", async (_, res) => {
  res.render("main.html", { jsFile: "main" });
});

app.get("/profile/:user", async (_, res) => {
  res.render("main.html", { jsFile: "main" });
});

app.get("/register/:key", async (req, res) => {
  const key = req.params.key;
  const response = await fetch(`${BACKEND_SERVER}/invitation/${key}`);
  const json = await response.json();
  const valid = json.valid;

  if (valid) {
    return res.render("main.html", { jsFile: "register" });
  }
  res.redirect("/");
});

app.get("/login", async (_, res) => {
  // const data = ReactDOMServer.renderToString(
  //   <QueryClientProvider client={new QueryClient()}>
  //     <Login />
  //   </QueryClientProvider>
  // );
  res.render("index.html", { data: "" });
});

server.listen(appPort, () => console.log(`App listening on ${appPort}`));
