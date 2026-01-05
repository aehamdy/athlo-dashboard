import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "./paths";
import { isAuthenticated } from "@/auth/auth";

function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to={ROUTE_PATHS.login}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
