import { DefaultRoute } from "./DefaultRoute.Interface";

export interface DashBoardRoutes {
  path: string;
  me: DefaultRoute;
  organizations: DefaultRoute;
  pharmacies: DefaultRoute;
  createItemCategory: DefaultRoute;
  itemCategoryList: DefaultRoute;
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
  createItemCategory: {
    path: `${dashboardPath}/createItemCategory`,
    fullPath: `${dashboardPath}/createItemCategory`,
  },
  itemCategoryList: {
    path: `${dashboardPath}/itemCategoryList`,
    fullPath: `${dashboardPath}/itemCategoryList`,
  },
};
