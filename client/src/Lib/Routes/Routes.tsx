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
  app: {
    path: "/app",
  },
  dashboard: dashboardRoutes,
};

export default routes;
