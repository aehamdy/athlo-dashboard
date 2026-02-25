import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { ROUTE_PATHS } from "./routes/paths";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import LoginPage from "./features/auth/pages/LoginPage";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./features/products/pages/ProductsPage";
import AddProductPage from "./features/products/pages/AddProductPage";
import CategoriesPage from "./features/categories/pages/CategoriesPage";
import BrandsPage from "./features/brands/pages/BrandsPage";
import OrdersPage from "./features/orders/pages/OrdersPage";
import CouponsPage from "./features/coupons/pages/CouponsPage";
import UsersPage from "./features/users/pages/UsersPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditProductPage from "./features/products/pages/EditProductPage";

function App() {
  return (
    <Routes>
      {/* Public routes (no auth required) */}
      <Route element={<PublicRoute />}>
        <Route path={ROUTE_PATHS.login} element={<LoginPage />} />
      </Route>

      {/* Protected routes (auth required) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            index
            element={<Navigate to={ROUTE_PATHS.dashboard.overview} replace />}
          />
          <Route
            path={ROUTE_PATHS.dashboard.overview}
            element={<OverviewPage />}
          />
          <Route
            path={ROUTE_PATHS.dashboard.products}
            element={<ProductsPage />}
          />
          <Route
            path={ROUTE_PATHS.dashboard.addProduct}
            element={<AddProductPage />}
          />
          <Route
            path={ROUTE_PATHS.dashboard.editProductPath}
            element={<Navigate to="info" replace />}
          />
          <Route
            path={ROUTE_PATHS.dashboard.editProductTabPath}
            element={<EditProductPage />}
          />
          <Route
            path={ROUTE_PATHS.dashboard.categories}
            element={<CategoriesPage />}
          />
          <Route path={ROUTE_PATHS.dashboard.brands} element={<BrandsPage />} />
          <Route path={ROUTE_PATHS.dashboard.orders} element={<OrdersPage />} />
          <Route
            path={ROUTE_PATHS.dashboard.coupons}
            element={<CouponsPage />}
          />
          <Route path={ROUTE_PATHS.dashboard.users} element={<UsersPage />} />
        </Route>
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
