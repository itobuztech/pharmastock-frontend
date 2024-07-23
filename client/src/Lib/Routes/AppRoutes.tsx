import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "../Guards/AuthGuard";
import routes from "./Routes";
import { AuthRoutes } from "Page/Auth/AuthRoutes";
import OrganizationDetails from "Page/Organizations/OrganizationDetails";
import PharmacyDetails from "Page/Pharmacy/PharmacyDetails";

const NotFound = React.lazy(() => import("Page/NotFoundPage"));
const IndexPage = React.lazy(() => import("Page/Index"));
const RegisterPage = React.lazy(
  () => import("Page/Auth/Register/RegisterPage")
);
const LoginPage = React.lazy(() => import("Page/Auth/Login/LoginPage"));
const DashboardPage = React.lazy(() => import("Page/Dashboard/DashboardPage"));
const ProfilePage = React.lazy(() => import("Page/Profile/ProfilePage"));
const PharmacyPage = React.lazy(() => import("Page/Pharmacy/Pharmacy"));
const OrganizationsPage = React.lazy(
  () => import("Page/Organizations/OrganizationsPage")
);
const ItemCategory = React.lazy(
  () => import("Page/CreateItemCategory/ItemCategory")
);
const ItemCategoryDetails = React.lazy(
  () => import("Page/CreateItemCategory/ItemCategoryDetails")
);
const Warehouse = React.lazy(() => import("Page/Warehouse/Warehouse"));
const WarehouseDetails = React.lazy(
  () => import("Page/Warehouse/WarehouseDetails")
);
const ItemList = React.lazy(() => import("Page/Item/ItemList"));
const ItemDetails = React.lazy(() => import("Page/Item/ItemDetails"));

const WarehouseStock = React.lazy(
  () => import("Page/WarehouseStock/WarehouseStock")
);
const WarehouseStockDetails = React.lazy(
  () => import("Page/WarehouseStock/WarehouseStockDetails")
);
const PharmacyStock = React.lazy(
  () => import("Page/PharmacyStock/PharmacyStock")
);

const UserList = React.lazy(() => import("Page/User/UserList"));

export default function AppRoutes() {
  return (
    <div>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path={routes.home.path} element={<IndexPage />} />
          <Route path={routes.register.path} element={<RegisterPage />} />
          <Route path={routes.login.path} element={<LoginPage />} />

          <Route path={routes.dashboard.path} element={<DashboardPage />}>
            <Route path={routes.dashboard.me.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.me.path}
                element={<ProfilePage />}
              />
            </Route>

            <Route
              path={routes.dashboard.organizations.path}
              element={<AuthGuard />}
            >
              <Route
                path={routes.dashboard.organizations.path}
                element={<OrganizationsPage />}
              />
              <Route
                path={routes.dashboard.organizationDetails.path}
                element={<OrganizationDetails />}
              />
            </Route>

            <Route
              path={routes.dashboard.pharmacies.path}
              element={<AuthGuard />}
            >
              <Route
                path={routes.dashboard.pharmacies.path}
                element={<PharmacyPage />}
              />
              <Route
                path={routes.dashboard.pharmacyDetails.path}
                element={<PharmacyDetails />}
              />
            </Route>

            <Route
              path={routes.dashboard.createItemCategory.path}
              element={<AuthGuard />}
            >
              <Route
                path={routes.dashboard.createItemCategory.path}
                element={<ItemCategory />}
              />
              <Route
                path={routes.dashboard.createItemCategoryDetails.path}
                element={<ItemCategoryDetails />}
              />
            </Route>

            <Route
              path={routes.dashboard.warehouseList.path}
              element={<AuthGuard />}
            >
              <Route
                path={routes.dashboard.warehouseList.path}
                element={<Warehouse />}
              />
              <Route
                path={routes.dashboard.warehouseDetails.path}
                element={<WarehouseDetails />}
              />
            </Route>

            <Route
              path={routes.dashboard.itemList.path}
              element={<AuthGuard />}
            >
              <Route
                path={routes.dashboard.itemList.path}
                element={<ItemList />}
              />
              <Route
                path={routes.dashboard.itemDetails.path}
                element={<ItemDetails />}
              />
            </Route>

            <Route
              path={routes.dashboard.warehouseStock.path}
              element={<AuthGuard />}
            >
              <Route
                path={routes.dashboard.warehouseStock.path}
                element={<WarehouseStock />}
              />
              <Route
                path={routes.dashboard.warehouseStockDetails.path}
                element={<WarehouseStockDetails />}
              />
            </Route>

            <Route path={routes.dashboard.users.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.users.path}
                element={<UserList />}
              />
            </Route>

            <Route
              path={routes.dashboard.pharmaciesStock.path}
              element={<AuthGuard />}
            >
              <Route
                path={routes.dashboard.pharmaciesStock.path}
                element={<PharmacyStock />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<NotFound />} />

          <Route path="*" element={<NotFound />} />
          {AuthRoutes}
        </Routes>
      </Suspense>
    </div>
  );
}
