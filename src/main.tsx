import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Fix for iOS Home Screen / standalone: sometimes pathname is "/" instead of /time-weather-buddy/
const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";
if (base && typeof window !== "undefined") {
  const pathname = window.location.pathname;
  if (pathname === "/" || pathname === "" || !pathname.startsWith(base)) {
    window.location.replace(import.meta.env.BASE_URL || "/");
    throw new Error("redirect"); // avoid rendering during redirect
  }
}

createRoot(document.getElementById("root")!).render(<App />);
