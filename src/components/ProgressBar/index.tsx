import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  minimum: 0.3,
  easing: "ease",
  speed: 200,
});

export default function ProgressBar() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 200);
    return () => clearTimeout(timer);
  }, [location]);

  return null;
}
