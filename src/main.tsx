import { createRoot } from "react-dom/client";
import "virtual:svg-icons-register";
import "nprogress/nprogress.css";
import App from "./App.tsx";
import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
