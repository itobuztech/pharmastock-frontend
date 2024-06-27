import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import routes from '../Routes/Routes';

export function AuthGuard() {
  function hasJWT() {
    let flag = false;
    let userData = localStorage.getItem("userData");
    let o = userData ? JSON.parse(userData) : {};
    if (o.access_token) return true;
    else return flag;
  }

  if (hasJWT()) {
    return <Outlet />;
  } else {
    return <Navigate to={routes.login.path} />;
  }
}