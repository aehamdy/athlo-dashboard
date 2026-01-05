import { isAuthenticated } from "@/auth/auth";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_PATHS } from "./paths";

function PublicRoute() {
  if (isAuthenticated()) {
    return <Navigate to={ROUTE_PATHS.dashboard.overview} replace />;
  }
  return <Outlet />;
}

export default PublicRoute;
