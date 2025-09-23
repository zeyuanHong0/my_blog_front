import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import router from "@/router";

function App() {
  return (
    <>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
