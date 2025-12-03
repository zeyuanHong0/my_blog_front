import frontRoutes from "./front_routes";
import adminRoutes from "./admin_routes";
import NotFound from "@/pages/errorPage/notFound";

const routes = [
  ...adminRoutes,
  ...frontRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
