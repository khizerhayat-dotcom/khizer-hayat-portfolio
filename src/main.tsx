import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";

const rootElement = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app, {
    onRecoverableError: () => undefined,
  });
} else {
  createRoot(rootElement).render(app);
}
