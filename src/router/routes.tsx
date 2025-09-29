import frontRoutes from "./front_routes";
import adminRoutes from "./admin_routes";

const routes = [...adminRoutes, ...frontRoutes];

export default routes;
