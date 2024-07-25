import routes from 'Lib/Routes/Routes';
import { useAppSelector } from 'Lib/Store/hooks';
import { USER_PERMISSION_FIELDS } from 'enums/enums';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function PermissionGuard({field}:Readonly<{field: USER_PERMISSION_FIELDS}>) {
  const permission = useAppSelector((state) => state.permissions.permissions);
  const hasPermission = (
    field: USER_PERMISSION_FIELDS
  ): boolean => {
    return permission[field]?.CAPABILITIES?.VIEW !== null;
  };

    if (hasPermission(field)) {
      return <Outlet />;
    } else {
      return <Navigate to={routes.dashboard.profile.path} />;
    }

}
