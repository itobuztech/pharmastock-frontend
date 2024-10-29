import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "../Guards/AuthGuard";
import routes from "./Routes";
import { AuthRoutes } from "Page/Auth/AuthRoutes";
import OrganizationDetails from "Page/Organizations/OrganizationDetails";
import PharmacyDetails from "Page/Pharmacy/PharmacyDetails";
import PermissionGuard from "Lib/Guards/PermissionGuard";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions } from "interfaces/interfaces";

const NotFound = React.lazy(() => import("Page/NotFoundPage"));
const IndexPage = React.lazy(() => import("Page/Index"));
const RegisterPage = React.lazy(() => import("Page/Auth/Register/Register"));
const LoginPage = React.lazy(() => import("Page/Auth/Login/LoginPage"));
const ForgetPassword = React.lazy(
  () => import("Page/Auth/ForgetPassword/ForgetPassword")
);
const DashboardPage = React.lazy(() => import("Page/Dashboard/DashboardPage"));
const ProfilePage = React.lazy(() => import("Page/Profile/ProfilePage"));
const PharmacyPage = React.lazy(() => import("Page/Pharmacy/Pharmacy"));
const OrganizationsPage = React.lazy(
  () => import("Page/Organizations/OrganizationsPage")
);
const CategoryList = React.lazy(
  () => import("Page/Category/CategoryList")
);
const CategoryDetails = React.lazy(
  () => import("Page/Category/CategoryDetails")
);
const Warehouse = React.lazy(() => import("Page/Warehouse/Warehouse"));
const WarehouseDetails = React.lazy(
  () => import("Page/Warehouse/WarehouseDetails")
);
const ProductList = React.lazy(() => import("Page/Product/ProductList"));
const ProductDetails = React.lazy(() => import("Page/Product/ProductDetails"));

const WarehouseStock = React.lazy(
  () => import("Page/WarehouseStock/WarehouseStock")
);
const WarehouseStockDetails = React.lazy(
  () => import("Page/WarehouseStock/WarehouseStockDetails")
);
const PharmacyStock = React.lazy(
  () => import("Page/PharmacyStock/PharmacyStock")
);
const PharmacyStockDetails = React.lazy(
  () => import("Page/PharmacyStock/PharmacyStockDetails")
);

const UserList = React.lazy(() => import("Page/User/UserList"));
const UserDetails = React.lazy(() => import("Page/User/UserDetails"));

const handleUserPermissions = (
  permission: Permissions,
  field: USER_PERMISSION_FIELDS,
  capabilities: USER_PERMISSION_CAPABILITIES
): boolean => {
  return permission[field]?.CAPABILITIES?.[capabilities] !== null;
};

export default function AppRoutes() {
  return (
    <div>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path={routes.home.path} element={<IndexPage />} />
          <Route path={routes.register.path} element={<RegisterPage />} />
          <Route path={routes.login.path} element={<LoginPage />} />
          <Route
            path={routes.forgetPassword.path}
            element={<ForgetPassword />}
          />

          <Route path={routes.dashboard.path} element={<DashboardPage />}>
            <Route path={routes.dashboard.profile.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.profile.path}
                element={<ProfilePage />}
              />
            </Route>

            <Route path={routes.dashboard.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.organizations.path}
                element={
                  <PermissionGuard
                    field={USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT}
                  />
                }
              >
                <Route
                  index
                  element={
                    <OrganizationsPage
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
                <Route
                  path={routes.dashboard.organizationDetails.path}
                  element={
                    <OrganizationDetails
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
              </Route>
            </Route>

            <Route path={routes.dashboard.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.pharmacies.path}
                element={
                  <PermissionGuard
                    field={USER_PERMISSION_FIELDS.PHARMACY_MANAGEMENT}
                  />
                }
              >
                <Route
                  index
                  element={
                    <PharmacyPage
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
                <Route
                  path={routes.dashboard.pharmacyDetails.path}
                  element={
                    <PharmacyDetails
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
              </Route>
            </Route>

            <Route path={routes.dashboard.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.categoryList.path}
                element={
                  <PermissionGuard
                    field={USER_PERMISSION_FIELDS.ITEM_CATEGORIES_MANAGEMENT}
                  />
                }
              >
                <Route
                  index
                  element={
                    <CategoryList
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
                <Route
                  path={routes.dashboard.categoryDetails.path}
                  element={
                    <CategoryDetails
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
              </Route>
            </Route>

            <Route path={routes.dashboard.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.warehouseList.path}
                element={
                  <PermissionGuard
                    field={USER_PERMISSION_FIELDS.WAREHOUSE_MANAGEMENT}
                  />
                }
              >
                <Route
                  index
                  element={
                    <Warehouse handleUserPermissions={handleUserPermissions} />
                  }
                />
                <Route
                  path={routes.dashboard.warehouseDetails.path}
                  element={
                    <WarehouseDetails
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
              </Route>
            </Route>

            <Route path={routes.dashboard.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.productList.path}
                element={
                  <PermissionGuard
                    field={USER_PERMISSION_FIELDS.ITEM_MANAGEMENT}
                  />
                }
              >
                <Route
                  index
                  element={
                    <ProductList handleUserPermissions={handleUserPermissions} />
                  }
                />
                <Route
                  path={routes.dashboard.productDetails.path}
                  element={
                    <ProductDetails
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
              </Route>
            </Route>

            <Route path={routes.dashboard.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.warehouseStock.path}
                element={
                  <PermissionGuard
                    field={USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN}
                  />
                }
              >
                <Route
                  index
                  element={
                    <WarehouseStock
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
                <Route
                  path={routes.dashboard.warehouseStockDetails.path}
                  element={
                    <WarehouseStockDetails
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
                  <Route
                  path={routes.dashboard.warehouseStockCreate.path}
                  element={
                    <WarehouseStockDetails
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
              </Route>
            </Route>

            <Route path={routes.dashboard.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.users.path}
                element={
                  <PermissionGuard
                    field={USER_PERMISSION_FIELDS.USER_MANAGEMENT}
                  />
                }
              >
                <Route
                  index
                  element={
                    <UserList handleUserPermissions={handleUserPermissions} />
                  }
                />
                <Route
                  path={routes.dashboard.userDetails.path}
                  element={<UserDetails />}
                />
              </Route>
            </Route>

            <Route path={routes.dashboard.path} element={<AuthGuard />}>
              <Route
                path={routes.dashboard.pharmaciesStock.path}
                element={
                  <PermissionGuard
                    field={
                      (USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN,
                      USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_STAFF)
                    }
                  />
                }
              >
                <Route
                  index
                  element={
                    <PharmacyStock
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
                <Route
                  path={routes.dashboard.pharmacyStockDetails.path}
                  element={
                    <PharmacyStockDetails
                      handleUserPermissions={handleUserPermissions}
                    />
                  }
                />
              </Route>
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
