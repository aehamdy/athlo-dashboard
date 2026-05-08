import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "./paths";
import { useAuth } from "@/features/auth/providers/AuthProvider";

function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
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
