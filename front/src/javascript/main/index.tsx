import ReactDOM from "react-dom";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import App from "../App";
import { ChatProvider } from "../context/ChatContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ChatProvider>
      <App />
    </ChatProvider>
  </QueryClientProvider>,
  document.getElementById("app")
);
