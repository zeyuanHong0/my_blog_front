import { useCallback, useEffect, useRef, useState } from "react";

import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  minimum: 0.3,
  easing: "ease",
  speed: 200,
});

const useDelayedSkeleton = (delay: number = 300) => {
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const delayTimer = useRef<NodeJS.Timeout | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    return () => {
      requestId.current += 1;
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
        delayTimer.current = null;
        NProgress.done();
      }
    };
  }, []);

  const executeRequest = useCallback(
    async (requestFn: () => Promise<void>) => {
      const currentRequestId = ++requestId.current;
      if (delayTimer.current) clearTimeout(delayTimer.current);
      try {
        setLoading(true);
        setShowSkeleton(false);
        NProgress.start();
        delayTimer.current = setTimeout(() => {
          setShowSkeleton(true);
        }, delay);
        await requestFn();
      } finally {
        if (currentRequestId === requestId.current) {
          setLoading(false);
          setShowSkeleton(false);
          NProgress.done();
          if (delayTimer.current) {
            clearTimeout(delayTimer.current);
            delayTimer.current = null;
          }
        }
      }
    },
    [delay],
  );
  return { loading, showSkeleton, executeRequest };
};

export default useDelayedSkeleton;
