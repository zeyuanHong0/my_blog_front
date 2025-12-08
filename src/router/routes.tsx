import frontRoutes from "./front_routes";
import adminRoutes from "./admin_routes";
import GithubCallback from "@/pages/admin/login/github-callback";
import NotFound from "@/pages/errorPage/notFound";

const routes = [
  ...adminRoutes,
  ...frontRoutes,
  {
    // GitHub OAuth 回调路由
    path: "/github-callback",
    element: <GithubCallback />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
