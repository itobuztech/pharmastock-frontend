import React from 'react';
import routes from 'Lib/Routes/Routes';
import { RootState } from 'Lib/Store/Store';
import { USER_PERMISSION_FIELDS } from 'enums/enums';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'Lib/Store/hooks';

export default function PermissionGuard({field}:Readonly<{field: USER_PERMISSION_FIELDS}>) {
  const permission = useAppSelector((state: RootState) => state.user.permission);
  
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
