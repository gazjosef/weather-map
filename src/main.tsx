import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/queryClient.ts";
import { WeatherProvider } from "./context/WeatherContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </QueryClientProvider>
  </StrictMode>
);
