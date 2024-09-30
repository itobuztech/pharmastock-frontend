import queryString from "query-string";

import { dashboardRoutes } from "./DashboardRoutes";

export const routes = {
  home: {
    path: "/",
  },
  login: {
    path: "/login",
  },
  logout: {
    path: "/logout",
  },
  forgetPassword: {
    path: "/forgotPassword",
  },
  register: {
    path: "/register",
  },
  token: {
    path: "/token",
  },
  forgotPasswordConfirmation: {
    path: "/forgotpasswordconfirmation",
  },
  setPassword: {
    path: "/set-password",
    fullPath: (query: { confirmation_token: string }) =>
      `/set-password${queryString.stringify(query)}`,
  },
  app: {
    path: "/app",
  },
  dashboard: dashboardRoutes,
};

export default routes;
