import path from "path";
import express from "express";
import {
  isLoggedMiddleware,
  isNotLoggedMiddleware,
} from "./middleware/authMiddleware";
import ReactDOMServer from "react-dom/server";
import Login from "../javascript/login/Login";
import * as React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

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

app.get("/register", async (_, res) => {
  res.render("main.html", { jsFile: "register" });
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
