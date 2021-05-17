import ReactDOM from "react-dom";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import Register from "./Register";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
      <Register />
  </QueryClientProvider>,
  document.getElementById("app")
);
