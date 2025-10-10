import React, { Suspense } from "react";

const SuspenseWrapper = (Component: React.FC) => (
  <Suspense fallback={<div>加载中...</div>}>
    <Component />
  </Suspense>
);

export default SuspenseWrapper;
