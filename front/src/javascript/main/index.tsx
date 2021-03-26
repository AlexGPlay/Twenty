import ReactDOM from "react-dom";
import React from "react";
import Template from "../components/Template";
import { QueryClientProvider, QueryClient } from "react-query";
import Main from "./Main";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Template>
      <Main />
    </Template>
  </QueryClientProvider>,
  document.getElementById("app")
);
