import { DefaultRoute } from "./DefaultRoute.Interface";

export interface DashBoardRoutes {
  path: string;
  me: DefaultRoute;
  organizations: DefaultRoute;
  pharmacies: DefaultRoute;
}

const dashboardPath = "/dashboard";

export const dashboardRoutes: DashBoardRoutes = {
  path: dashboardPath,
  me: {
    path: `${dashboardPath}/me`,
    fullPath: `${dashboardPath}/me`,
  },
  organizations: {
    path: `${dashboardPath}/organizations`,
    fullPath: `${dashboardPath}/organizations`,
  },
  pharmacies: {
    path: `${dashboardPath}/pharmacies`,
    fullPath: `${dashboardPath}/pharmacies`,
  },
};
