import { Navigate, Outlet, useLocation } from "react-router-dom";

import routes from "Lib/Routes/Routes";
import { RootState } from "Lib/Store/Store";
import { USER_PERMISSION_FIELDS } from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import { UserRole } from "gql/graphql";

export default function PermissionGuard({
  field,
}: Readonly<{ field: USER_PERMISSION_FIELDS }>) {
  const permission = useAppSelector(
    (state: RootState) => state.user.permission
  );
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  const isOrganizationPage =
    location.pathname === routes.dashboard.organizations.path;

  const hasPermission = (field: USER_PERMISSION_FIELDS): boolean => {
    return permission[field]?.CAPABILITIES?.VIEW !== null;
  };

  if (user.role === UserRole.Superadmin && isOrganizationPage) {
    return <Outlet />;
  } else if (hasPermission(field) && !isOrganizationPage) {
    return <Outlet />;
  } else {
    return <Navigate to={routes.dashboard.profile.path} />;
  }
}
