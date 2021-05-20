import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "../App";
import { ChatProvider } from "../context/ChatContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <ChatProvider>
        <App />
      </ChatProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Router>,
  document.getElementById("app")
);
