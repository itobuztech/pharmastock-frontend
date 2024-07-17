import { DefaultRoute } from "./DefaultRoute.Interface";

export interface DashBoardRoutes {
  path: string;
  me: DefaultRoute;
  organizations: DefaultRoute;
  organizationDetails: DefaultRoute;
  pharmacies: DefaultRoute;
  pharmacyDetails: DefaultRoute;
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
  organizationDetails: {
    path: `${dashboardPath}/organizations/:orgId`,
    fullPath: `${dashboardPath}/organizations/:orgId`,
  },
  pharmacies: {
    path: `${dashboardPath}/pharmacies`,
    fullPath: `${dashboardPath}/pharmacies`,
  },
  pharmacyDetails: {
    path: `${dashboardPath}/pharmacies/:id`,
    fullPath: `${dashboardPath}/pharmacies/:id`,
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
