import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from './paths';
import Cookies from 'js-cookie';
import { AUTH } from '@/constants/auth';

function ProtectedRoute() {
  const location = useLocation();

  const isAuthenticated = !!Cookies.get(AUTH.COOKIE.ACCESS_TOKEN);

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
