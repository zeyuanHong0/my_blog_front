import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { ToasterComponent } from "@/components/toast";
import AuthDialog from "@/components/auth/auth-dialog";

import router from "@/router";

function App() {
  return (
    <>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
      <ToasterComponent />
      <AuthDialog />
    </>
  );
}

export default App;
