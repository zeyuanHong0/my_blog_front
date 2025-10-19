import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { ToasterComponent } from "@/components/toast";

import router from "@/router";

function App() {
  return (
    <>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
      <ToasterComponent />
    </>
  );
}

export default App;
