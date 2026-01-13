import { useCallback, useEffect, useRef, useState } from "react";

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
        delayTimer.current = setTimeout(() => {
          setShowSkeleton(true);
        }, delay);
        await requestFn();
      } finally {
        setLoading(false);
        setShowSkeleton(false);
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
