import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { ROUTE_PATHS } from './routes/paths';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import Loading from './components/shared/Loading';
// Lazy-loaded page components — each becomes its own async chunk
const LoginPage = lazy(() => import('./features/auth/pages/LoginPage'));
const OverviewPage = lazy(
  () => import('./features/overview/pages/OverviewPage'),
);
const ProductsPage = lazy(
  () => import('./features/products/pages/ProductsPage'),
);
const AddProductPage = lazy(
  () => import('./features/products/pages/AddProductPage'),
);
const EditProductPage = lazy(
  () => import('./features/products/pages/EditProductPage'),
);
const CategoriesPage = lazy(
  () => import('./features/categories/pages/CategoriesPage'),
);
const BrandsPage = lazy(() => import('./features/brands/pages/BrandsPage'));
const OrdersPage = lazy(() => import('./features/orders/pages/OrdersPage'));
const InStoreOrdersPage = lazy(
  () => import('./features/inStoreOrders/pages/InStoreOrdersPage'),
);
const AddInStoreOrderPage = lazy(
  () => import('./features/inStoreOrders/pages/AddInStoreOrderPage'),
);
const CouponsPage = lazy(() => import('./features/coupons/pages/CouponsPage'));
const UsersPage = lazy(() => import('./features/users/pages/UsersPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
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
            <Route
              path={ROUTE_PATHS.dashboard.brands}
              element={<BrandsPage />}
            />
            <Route
              path={ROUTE_PATHS.dashboard.orders.eCommerce}
              element={<OrdersPage />}
            />
            <Route
              path={ROUTE_PATHS.dashboard.orders.inStore}
              element={<InStoreOrdersPage />}
            />
            <Route
              path={ROUTE_PATHS.dashboard.orders.addInStoreOrder}
              element={<AddInStoreOrderPage />}
            />
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
    </Suspense>
  );
}

export default App;
