import React, { Suspense, type ReactNode } from "react";

const SuspenseWrapper = (
  Component: React.FC,
  fallback: ReactNode = <div>加载中...</div>,
) => (
  <Suspense fallback={fallback}>
    <Component />
  </Suspense>
);

export default SuspenseWrapper;
