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
const CreateItemCategoryPage = React.lazy(
  () => import("Page/CreateItemCategory/CreateItemCategoryPage")
);
const ItemCategoryListPage = React.lazy(
  () => import("Page/ItemCategoryList/ItemCategoryListPage")
);

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
              element={<PharmacyPage />}
            />
            <Route
              path={routes.dashboard.pharmacyDetails.path}
              element={<PharmacyDetails />}
            />

            <Route
              path={routes.dashboard.createItemCategory.path}
              element={<AuthGuard />}
            >
              <Route
                path={routes.dashboard.createItemCategory.path}
                element={<CreateItemCategoryPage />}
              />
            </Route>

            <Route
              path={routes.dashboard.itemCategoryList.path}
              element={<AuthGuard />}
            >
              <Route
                path={routes.dashboard.itemCategoryList.path}
                element={<ItemCategoryListPage />}
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
