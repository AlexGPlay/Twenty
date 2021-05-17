import ReactDOM from "react-dom";
import React from "react";
import Login from "./Login";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Login />
  </QueryClientProvider>,
  document.getElementById("app")
);
