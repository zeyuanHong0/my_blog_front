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

  useEffect(() => {
    return () => {
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
        delayTimer.current = null;
      }
    };
  }, []);

  const executeRequest = useCallback(
    async (requestFn: () => Promise<void>) => {
      try {
        setLoading(true);
        NProgress.start();
        delayTimer.current = setTimeout(() => {
          setShowSkeleton(true);
        }, delay);
        await requestFn();
      } finally {
        setLoading(false);
        setShowSkeleton(false);
        NProgress.done();
        if (delayTimer.current) {
          clearTimeout(delayTimer.current);
          delayTimer.current = null;
        }
      }
    },
    [delay],
  );
  return { loading, showSkeleton, executeRequest };
};

export default useDelayedSkeleton;
