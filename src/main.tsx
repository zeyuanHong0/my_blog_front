import { createRoot } from "react-dom/client";
import "virtual:svg-icons-register";
import "nprogress/nprogress.css";
import App from "./App.tsx";
import "@/styles/index.css";

import { WebMonitor } from "web-observer-sdk";
import { MonitorErrorBoundary } from "web-observer-react-sdk";

// 初始化监控 SDK
WebMonitor.init({
  appId: "zheliyuan",
  reportUrl: import.meta.env.VITE_REPORT_URL,
  enablePerformance: true,
  enableError: true,
  sampleRate: 1.0,
  enableSoftNavigation: true,
});

createRoot(document.getElementById("root")!).render(
  <MonitorErrorBoundary>
    <App />
  </MonitorErrorBoundary>,
);
