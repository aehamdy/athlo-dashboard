import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import { ROUTE_PATHS } from "./routes/paths";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AppLayout />}>
        <Route
          index
          element={
            <Navigate to={`${ROUTE_PATHS.dashboard.overview}`} replace />
          }
        />
        <Route path={ROUTE_PATHS.dashboard.overview} element={<Overview />} />
        <Route path={ROUTE_PATHS.dashboard.products} element={<Products />} />
        <Route
          path={ROUTE_PATHS.dashboard.categories}
          element={<Categories />}
        />
        <Route path={ROUTE_PATHS.dashboard.brands} element={<Brands />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
