import React, { Suspense } from "react";

const SuspenseWrapper = (Component: React.FC) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

export default SuspenseWrapper;
