import { dashboardRoutes } from './DashboardRoutes';

export const routes = {
  home: {
    path: '/',
  },
  login: {
    path: '/login'
  },
  logout: {
    path: '/logout'
  },
  forgetPassword: {
    path: '/forget-password'
  },
  register: {
    path: '/register'
  },
  app: {
    path: '/app',
  },
  dashboard: dashboardRoutes,
};

export default routes;
