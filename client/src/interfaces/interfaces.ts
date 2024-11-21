import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";

export interface SignupUserInput {
  username: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface SignupResponse {
  signup: {
    access_token: string;
  };
}

export interface TokenID {
  token: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginResponseWithToken {
  tokenConfirmation: {
    access_token: string;
    user: {
      createdAt: string;
      email: string;
      id: string;
      name: string;
      updatedAt: string;
      username: string;
    };
  };
}

interface Capabilities {
  VIEW: number | null;
  CREATE?: number | null;
  EDIT?: number | null;
  DELETE?: number | null;
}

interface PermissionItem {
  LABEL: string;
  ORDER: number;
  CAPABILITIES: Capabilities;
}

export interface Permissions {
  PROFILE?: PermissionItem;
  USER_MANAGEMENT?: PermissionItem;
  USER_PERMISSION?: PermissionItem;
  ORGANIZATION_MANAGEMENT?: PermissionItem;
  WAREHOUSE_MANAGEMENT?: PermissionItem;
  ITEM_CATEGORIES_MANAGEMENT?: PermissionItem;
  ITEM_MANAGEMENT?: PermissionItem;
  STOCK_MANAGEMENT?: PermissionItem;
  PHARMACY_MANAGEMENT?: PermissionItem;
  STAFF_MANAGEMENT?: PermissionItem;
  STOCK_MANAGEMENT_ADMIN?: PermissionItem;
  STOCK_MANAGEMENT_STAFF?: PermissionItem;
}

export interface PaginationArgsInput {
  skip: number;
  take: number;
}

export interface OrganizationsListResponse {
  active: boolean;
  address: string;
  city: string;
  country: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
}

export interface AdminProfile {
  account: {
    role: string;
    user: {
      createdAt?: string;
      email: string;
      id: string;
      name: string;
      organization?: Organization;
      role?: Role;
      username: string;
      pharmacy?: {
        id: string;
        name: string;
      };
    };
  };
}

export interface Role {
  id: string;
  name: string;
  userType: string;
}

export interface ResetPasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  resetPassword: boolean;
}

export interface ProfileUpdateInput {
  name?: string;
  username?: string;
}

export interface ProfileUpdateResponse {
  updateprofile: boolean;
}

export interface CreatePharmacyInput {
  contact_info: string;
  location: string;
  name: string;
  organizationId: string;
}

export interface CreatePharmacyResponse {
  createPharmacy: {
    contact_info: string;
    createdAt: string;
    id: string;
    location: string;
    name: string;
    organizationId: string;
    updatedAt: string;
  };
}

export interface ChildComponentProps {
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

export interface OrganizationList {
  organizations: {
    organizations: [
      {
        active?: true;
        address?: string;
        city?: string;
        contact?: string;
        country?: string;
        createdAt?: string;
        description?: string;
        id: string;
        name?: string;
        updatedAt?: string;
      }
    ];
    total: number;
  };
}
export interface createOrganizationInput {
  active?: true;
  address?: string;
  city?: string;
  contact?: string;
  country?: string;
  description?: string;
  name?: string;
}

export interface Pharmacies {
  pharmacies: {
    pharmacies: [
      {
        contactInfo: string;
        createdAt: Date;
        id: string;
        location: string;
        name: string;
        organization: OrganizationsListResponse;
        updatedAt: string;
      }
    ];
    total: number;
  };
}

export interface Pharmacy {
  contactInfo: string;
  createdAt: Date;
  id: string;
  location: string;
  name: string;
  organization: OrganizationsListResponse;
  updatedAt: Date;
}

export interface PaginationArgs {
  take: number;
  skip: number;
}

export interface CreateItemCategories {
  itemCategories: ItemCategories;
}

export interface ItemCategories {
  total: number;
  itemCategories: CategoryItem[];
}

export interface CategoryItem {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  Item?: Item[];
}
export interface CreateWarehouses {
  warehouses: Warehouses;
}
export interface Warehouses {
  total: number;
  warehouses: WarehouseItem[];
}
export interface WarehouseItem {
  area: string;
  createdAt: string;
  id: string;
  location: string;
  name: string;
  updatedAt: string;
  organization: {
    id: string;
    name: string;
  };
}

export interface ItemLists {
  items: Items;
}

export interface Items {
  items: Item[];
  total: number;
}

export interface Item {
  baseUnit: string;
  createdAt: string;
  hsnCode: string;
  id: string;
  instructions: string;
  mrpBaseUnit: number;
  updatedAt: string;
  wholesalePrice: number;
  Category: CategoryItem[];
  name: string;
}

export interface GenerateSkuData {
  generateSKU: GenerateSku;
}

export interface GenerateSku {
  sku: string;
}

export interface WarehouseStocksData {
  warehouseStocks: WarehouseStocks;
}

export interface WarehouseStocks {
  total: number;
  warehouseStocks: WarehouseStock[];
}

export interface WarehouseStock {
  SKU: Sku;
  createdAt: string;
  finalQty: number;
  id: string;
  item: Item;
  totalMrpBaseUnit?: number | null;
  totalWholesalePrice?: number | null;
  updatedAt: string;
  warehouse: WarehouseItem;
}

export interface Sku {
  id: string;
  sku: string;
}

export enum UserRole {
  Admin = "ADMIN",
  Staff = "STAFF",
}

export interface SelectOrgItem {
  value?: string;
  label?: string;
}

export interface UserData {
  users: Users;
}

export interface Users {
  total: number;
  users: User[];
}

export interface User {
  createdAt: string;
  email: string;
  emailConfirmationToken?: string;
  id: string;
  isEmailConfirmed: boolean;
  name: string;
  organization?: Organization;
  updatedAt: string;
  username: string;
  role: {
    id: string;
    name: string;
    userType: UserRole;
  };
}

export interface UserById {
  createdAt: string;
  email: string;
  emailConfirmationToken?: string;
  id: string;
  isEmailConfirmed: boolean;
  name: string;
  organization?: Organization;
  updatedAt: string;
  username: string;
  role: {
    id: string;
    name: string;
    userType: UserRole;
  };
}

export interface Organization {
  id: string;
  name: string;
}

export interface CreateWarehouseStocksByWarehouse {
  warehouseStocksByWarehouse: WarehouseStocksByWarehouse;
}
export interface WarehouseStocksByWarehouse {
  total: number;
  warehouseStocks: WarehouseStock[];
}
export interface WarehouseStock {
  SKU: Sku;
  createdAt: string;
  finalQty: number;
  id: string;
  item: Item;
  updatedAt: string;
  warehouse: WarehouseItem;
}

export interface PharmacyStocksLists {
  PharmacyStocks: PharmacyStocks;
}

export interface PharmacyStocks {
  pharmacyStocks: PharmacyStock[];
  total: number;
}

export interface CreatePharmacyStocksByPharmacy {
  pharmacyStocksByPharmacy: PharmacyStocksByPharmacy;
}

export interface PharmacyStocksByPharmacy {
  pharmacyStocks: PharmacyStock[];
  total: number;
}

export interface PharmacyStock {
  createdAt: string;
  finalQty: number;
  id: string;
  item: Item;
  pharmacy: Pharmacy;
  totalMrpBaseUnit: number;
  totalWholesalePrice: number;
  updatedAt: string;
  warehouse: WarehouseItem;
}

export interface MaxPriceData {
  maxPrice: MaxPrice;
}

export interface MaxPrice {
  mrpBaseUnit: number;
  wholesalePrice: number;
}
export interface WarehouseStockQty {
  maxWarehouseStockQty: MaxWarehouseStockQty;
}

export interface MaxWarehouseStockQty {
  totalQty: number;
}

export interface PharmacyStockQty {
  maxPharmacyStockQty: MaxPharmacyStockQty;
}

export interface MaxPharmacyStockQty {
  totalQty: number;
}
