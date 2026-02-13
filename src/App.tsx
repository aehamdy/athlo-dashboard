import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import { ROUTE_PATHS } from "./routes/paths";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Orders from "./pages/Orders";
import Coupons from "./pages/Coupons";
import Users from "./pages/Users";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <Routes>
      {/* Public routes (no auth required) */}
      <Route element={<PublicRoute />}>
        <Route path={ROUTE_PATHS.login} element={<Login />} />
      </Route>

      {/* Protected routes (auth required) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            index
            element={<Navigate to={ROUTE_PATHS.dashboard.overview} replace />}
          />
          <Route path={ROUTE_PATHS.dashboard.overview} element={<Overview />} />
          <Route path={ROUTE_PATHS.dashboard.products} element={<Products />} />
          <Route
            path={ROUTE_PATHS.dashboard.addProduct}
            element={<AddProduct />}
          />
          <Route
            path={ROUTE_PATHS.dashboard.categories}
            element={<Categories />}
          />
          <Route path={ROUTE_PATHS.dashboard.brands} element={<Brands />} />
          <Route path={ROUTE_PATHS.dashboard.orders} element={<Orders />} />
          <Route path={ROUTE_PATHS.dashboard.coupons} element={<Coupons />} />
          <Route path={ROUTE_PATHS.dashboard.users} element={<Users />} />
        </Route>
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
