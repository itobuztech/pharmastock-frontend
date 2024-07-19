import { DefaultRoute } from "./DefaultRoute.Interface";

export interface DashBoardRoutes {
  path: string;
  me: DefaultRoute;
  organizations: DefaultRoute;
  organizationDetails: DefaultRoute;
  pharmacies: DefaultRoute;
  pharmacyDetails: DefaultRoute;
  createItemCategory: DefaultRoute;
  createItemCategoryDetails: DefaultRoute;
  itemCategoryList: DefaultRoute;
  warehouseList: DefaultRoute;
  warehouseDetails: DefaultRoute;
  itemList: DefaultRoute;
  itemDetails: DefaultRoute;
  warehouseStock: DefaultRoute;
  users: DefaultRoute;
  userDetails: DefaultRoute;
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
    path: `${dashboardPath}/itemCategory`,
    fullPath: `${dashboardPath}/itemCategory`,
  },
  createItemCategoryDetails: {
    path: `${dashboardPath}/itemCategory/:id`,
    fullPath: `${dashboardPath}/itemCategory/:id`,
  },
  itemCategoryList: {
    path: `${dashboardPath}/itemCategoryList`,
    fullPath: `${dashboardPath}/itemCategoryList`,
  },
  warehouseList: {
    path: `${dashboardPath}/warehouse`,
    fullPath: `${dashboardPath}/warehouse`,
  },
  warehouseDetails: {
    path: `${dashboardPath}/warehouse/:id`,
    fullPath: `${dashboardPath}/warehouse/:id`,
  },
  itemList: {
    path: `${dashboardPath}/items`,
    fullPath: `${dashboardPath}/items`,
  },
  itemDetails: {
    path: `${dashboardPath}/items/:id`,
    fullPath: `${dashboardPath}/items/:id`,
  },
  warehouseStock: {
    path: `${dashboardPath}/stocksWarehouse`,
    fullPath: `${dashboardPath}/stocksWarehouse`,
  },
  users: {
    path: `${dashboardPath}/users`,
    fullPath: `${dashboardPath}/users`,
  },
  userDetails: {
    path: `${dashboardPath}/users/:id`,
    fullPath: `${dashboardPath}/users:id`,
  },
};
