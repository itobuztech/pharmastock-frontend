import { DefaultRoute } from "./DefaultRoute.Interface";

export interface DashBoardRoutes {
  path: string;
  profile: DefaultRoute;
  organizations: DefaultRoute;
  organizationDetails: DefaultRoute;
  pharmacies: DefaultRoute;
  pharmacyDetails: DefaultRoute;
  createCategory: DefaultRoute;
  categoryDetails: DefaultRoute;
  categoryList: DefaultRoute;
  warehouseList: DefaultRoute;
  warehouseDetails: DefaultRoute;
  productList: DefaultRoute;
  productDetails: DefaultRoute;
  warehouseStock: DefaultRoute;
  users: DefaultRoute;
  userDetails: DefaultRoute;
  warehouseStockDetails: DefaultRoute;
  warehouseStockCreate: DefaultRoute;
  pharmaciesStock: DefaultRoute;
  pharmacyStockDetails: DefaultRoute;
  stocksHistory: DefaultRoute;
  stocksHistoryDetails: DefaultRoute
}

const dashboardPath = "/dashboard";

export const dashboardRoutes: DashBoardRoutes = {
  path: dashboardPath,
  profile: {
    path: `${dashboardPath}/profile`,
    fullPath: `${dashboardPath}/profile`,
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
  createCategory: {
    path: `${dashboardPath}/categories`,
    fullPath: `${dashboardPath}/categories`,
  },
  categoryDetails: {
    path: `${dashboardPath}/categories/:id`,
    fullPath: `${dashboardPath}/categories/:id`,
  },
  categoryList: {
    path: `${dashboardPath}/categories`,
    fullPath: `${dashboardPath}/categories`,
  },
  warehouseList: {
    path: `${dashboardPath}/warehouse`,
    fullPath: `${dashboardPath}/warehouse`,
  },
  warehouseDetails: {
    path: `${dashboardPath}/warehouse/:id`,
    fullPath: `${dashboardPath}/warehouse/:id`,
  },
  productList: {
    path: `${dashboardPath}/products`,
    fullPath: `${dashboardPath}/products`,
  },
  productDetails: {
    path: `${dashboardPath}/products/:id`,
    fullPath: `${dashboardPath}/products/:id`,
  },
  warehouseStock: {
    path: `${dashboardPath}/stocksWarehouse`,
    fullPath: `${dashboardPath}/stocksWarehouse`,
  },
  stocksHistory: {
    path: `${dashboardPath}/stocksHistory`,
    fullPath: `${dashboardPath}/stocksHistory`,
  },
  stocksHistoryDetails: {
    path: `${dashboardPath}/stocksHistory/:lotName`,
    fullPath: `${dashboardPath}/stocksHistory/:lotName`,
  },
  users: {
    path: `${dashboardPath}/users`,
    fullPath: `${dashboardPath}/users`,
  },
  userDetails: {
    path: `${dashboardPath}/users/:id`,
    fullPath: `${dashboardPath}/users:id`,
  },
  warehouseStockCreate: {
    path: `${dashboardPath}/stocksWarehouse/create`,
    fullPath: `${dashboardPath}/stocksWarehouse/create`,
  },
  warehouseStockDetails: {
    path: `${dashboardPath}/stocksWarehouse/:id`,
    fullPath: `${dashboardPath}/stocksWarehouse/:id`,
  },
  pharmaciesStock: {
    path: `${dashboardPath}/stocksPharmacies`,
    fullPath: `${dashboardPath}/stocksPharmacies`,
  },
  pharmacyStockDetails: {
    path: `${dashboardPath}/stocksPharmacies/:id`,
    fullPath: `${dashboardPath}/stocksPharmacies/:id`,
  }
};
