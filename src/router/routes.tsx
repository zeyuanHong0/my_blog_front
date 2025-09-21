import frontRoutes from "./front_routes";
import managementRoutes from "./management_routes";

const routes = [...managementRoutes, ...frontRoutes];

export default routes;
