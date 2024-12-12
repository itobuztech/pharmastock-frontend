/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type AccountTypeResponse = {
  __typename?: 'AccountTypeResponse';
  role: Scalars['String']['output'];
  user: User;
};

export enum BaseUnit {
  Bottle = 'Bottle',
  Box = 'Box',
  Pack = 'Pack',
  Piece = 'Piece',
  Roll = 'Roll',
  Tablet = 'Tablet'
}

export type BatchStockMovementsInput = {
  batchName: Scalars['String']['input'];
};

export type ClearancePharmacyStock = {
  __typename?: 'ClearancePharmacyStock';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  item?: Maybe<Item>;
  pharmacyStock?: Maybe<PharmacyStock>;
  qty: Scalars['Int']['output'];
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ClearancePharmacyStockInput = {
  itemId: Scalars['String']['input'];
  qty: Scalars['Float']['input'];
};

export type CreateItemCategoryInput = {
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateItemInput = {
  baseUnit: BaseUnit;
  category?: InputMaybe<Array<Scalars['String']['input']>>;
  hsnCode: Scalars['String']['input'];
  instructions: Scalars['String']['input'];
  mrpBaseUnit: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  wholesalePrice: Scalars['Float']['input'];
};

export type CreateOrganizationInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address: Scalars['String']['input'];
  adminEmail: Scalars['String']['input'];
  city: Scalars['String']['input'];
  contact: Scalars['String']['input'];
  country: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreatePharmacyInput = {
  contactInfo?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreatePharmacyStockInput = {
  itemArr: Array<ItemObjs>;
  pharmacyId: Scalars['ID']['input'];
  warehouseId: Scalars['ID']['input'];
};

export type CreateSkuNameInput = {
  itemId: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  warehouseId: Scalars['String']['input'];
};

export type CreateStockMovementInput = {
  batchName?: InputMaybe<Scalars['String']['input']>;
  expiry?: InputMaybe<Scalars['DateTime']['input']>;
  itemId: Scalars['String']['input'];
  lotName: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['String']['input']>;
  pharmacyId?: InputMaybe<Scalars['String']['input']>;
  pharmacyStockClearanceId?: InputMaybe<Scalars['String']['input']>;
  pharmacyStockId?: InputMaybe<Scalars['String']['input']>;
  qty: Scalars['Float']['input'];
  transactionType?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['String']['input']>;
  warehouseStockId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  orgId: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRole;
  username: Scalars['String']['input'];
};

export type CreateWarehouseInput = {
  adminId?: InputMaybe<Scalars['String']['input']>;
  area: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateWarehouseStockInput = {
  batchName: Scalars['String']['input'];
  expiry: Scalars['DateTime']['input'];
  itemId: Scalars['String']['input'];
  qty: Scalars['Float']['input'];
  sku: Scalars['String']['input'];
  stockLevel?: InputMaybe<Scalars['String']['input']>;
  stockStatus?: InputMaybe<Scalars['String']['input']>;
  stocklevelMax?: InputMaybe<Scalars['Float']['input']>;
  stocklevelMin?: InputMaybe<Scalars['Float']['input']>;
  warehouseId: Scalars['String']['input'];
};

export type DeleteItemCategoryInput = {
  id: Scalars['String']['input'];
};

export type DeleteItemInput = {
  id: Scalars['String']['input'];
};

export type DeleteOrganizationInput = {
  id: Scalars['String']['input'];
};

export type DeletePharmacyInput = {
  id: Scalars['String']['input'];
};

export type DeletePharmacyStockInput = {
  id: Scalars['String']['input'];
};

export type DeleteUserInput = {
  id: Scalars['String']['input'];
};

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse';
  message: Scalars['String']['output'];
};

export type DeleteWarehouseInput = {
  id: Scalars['String']['input'];
};

export type DeleteWarehouseStockInput = {
  id: Scalars['String']['input'];
};

export type FilterItemInputs = {
  baseUnit?: InputMaybe<Array<BaseUnit>>;
  mrpBaseUnit?: InputMaybe<Scalars['Int']['input']>;
  wholeSalePrice?: InputMaybe<Scalars['Int']['input']>;
};

export type FilterPharmacyStockInputs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  qty?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FilterStockMovementsInputs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  transactionType?: InputMaybe<StockMovementsType>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type FilterWarehouseStockInputs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  qty?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ForgotPasswordConfirmationInput = {
  confirmationToken: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  token: Scalars['String']['output'];
};

export type GenerateSku = {
  __typename?: 'GenerateSku';
  sku: Scalars['String']['output'];
};

export type InviteUsersInput = {
  email: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  pharmacyId?: InputMaybe<Scalars['String']['input']>;
  role: InviteUserRole;
};

export type Item = {
  __typename?: 'Item';
  Category?: Maybe<Array<ItemCategoryRel>>;
  baseUnit: BaseUnit;
  createdAt: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  hsnCode: Scalars['String']['output'];
  id: Scalars['String']['output'];
  instructions: Scalars['String']['output'];
  mrpBaseUnit?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  wholesalePrice?: Maybe<Scalars['Float']['output']>;
};

export type ItemCategory = {
  __typename?: 'ItemCategory';
  Item?: Maybe<Array<Item>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentCategory?: Maybe<ItemParentCategory>;
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ItemCategoryRel = {
  __typename?: 'ItemCategoryRel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ItemParentCategory = {
  __typename?: 'ItemParentCategory';
  Item?: Maybe<Array<Item>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String']['output'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LotStockMovementsInput = {
  lotName: Scalars['String']['input'];
};

export type MaxPharmacyStockQty = {
  __typename?: 'MaxPharmacyStockQty';
  totalQty?: Maybe<Scalars['Float']['output']>;
};

export type MaxPrice = {
  __typename?: 'MaxPrice';
  mrpBaseUnit?: Maybe<Scalars['Float']['output']>;
  wholesalePrice?: Maybe<Scalars['Float']['output']>;
};

export type MaxWarehouseStockQty = {
  __typename?: 'MaxWarehouseStockQty';
  totalQty?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  clearancePharmacyStock: Array<ClearancePharmacyStock>;
  create: User;
  createItem: Item;
  createItemCategory: ItemCategory;
  createOrganization: Organization;
  createPharmacy: Pharmacy;
  createPharmacyStock: Scalars['String']['output'];
  createStockMovement: StockMovement;
  createWarehouse: Warehouse;
  createWarehouseStock: Scalars['String']['output'];
  deleteItem: Item;
  deleteItemCategory: ItemCategory;
  deleteOrganization: Organization;
  deletePharmacy: Pharmacy;
  deletePharmacyStock: PharmacyStock;
  deleteUserBySuperAdmin: DeleteUserResponse;
  deleteWarehouse: Warehouse;
  deleteWarehouseStock: WarehouseStock;
  forgotPassword: ForgotPasswordResponse;
  generateSKU: GenerateSku;
  inviteUsers: Scalars['String']['output'];
  login: LoginResponse;
  resetPassword: Scalars['Boolean']['output'];
  signup: SignupResponse;
  tokenConfirmation: LoginResponse;
  updateItem: Item;
  updateItemCategory: ItemCategory;
  updateOrganization: Organization;
  updatePharmacy: Pharmacy;
  updateWarehouse: Warehouse;
  updateprofile: Scalars['Boolean']['output'];
  validateForgotPassword: ValidateForgotPasswordResponse;
};


export type MutationClearancePharmacyStockArgs = {
  clearancePharmacyStockInput: Array<ClearancePharmacyStockInput>;
  pharmacyId: Scalars['String']['input'];
};


export type MutationCreateArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateItemArgs = {
  createItemInput: CreateItemInput;
};


export type MutationCreateItemCategoryArgs = {
  createItemCategoryInput: CreateItemCategoryInput;
};


export type MutationCreateOrganizationArgs = {
  createOrganizationInput: CreateOrganizationInput;
};


export type MutationCreatePharmacyArgs = {
  createPharmacyInput: CreatePharmacyInput;
};


export type MutationCreatePharmacyStockArgs = {
  createPharmacyStockInput: CreatePharmacyStockInput;
};


export type MutationCreateStockMovementArgs = {
  createStockMovementInput: CreateStockMovementInput;
};


export type MutationCreateWarehouseArgs = {
  createWarehouseInput: CreateWarehouseInput;
};


export type MutationCreateWarehouseStockArgs = {
  createWarehouseStockInput: Array<CreateWarehouseStockInput>;
};


export type MutationDeleteItemArgs = {
  deleteItemInput: DeleteItemInput;
};


export type MutationDeleteItemCategoryArgs = {
  deleteItemCategoryInput: DeleteItemCategoryInput;
};


export type MutationDeleteOrganizationArgs = {
  deleteOrganizationInput: DeleteOrganizationInput;
};


export type MutationDeletePharmacyArgs = {
  deletePharmacyInput: DeletePharmacyInput;
};


export type MutationDeletePharmacyStockArgs = {
  deletePharmacyStockInput: DeletePharmacyStockInput;
};


export type MutationDeleteUserBySuperAdminArgs = {
  deleteUserInput: DeleteUserInput;
};


export type MutationDeleteWarehouseArgs = {
  deleteWarehouseInput: DeleteWarehouseInput;
};


export type MutationDeleteWarehouseStockArgs = {
  deleteWarehouseStockInput: DeleteWarehouseStockInput;
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationGenerateSkuArgs = {
  generateSkuNameInput: CreateSkuNameInput;
};


export type MutationInviteUsersArgs = {
  inviteUsersInput: InviteUsersInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationSignupArgs = {
  signUpStaffInput: SignUpStaffInput;
};


export type MutationTokenConfirmationArgs = {
  tokenConfirmationInput: TokenConfirmationInput;
};


export type MutationUpdateItemArgs = {
  updateItemInput: UpdateItemInput;
};


export type MutationUpdateItemCategoryArgs = {
  updateItemCategoryInput: UpdateItemCategoryInput;
};


export type MutationUpdateOrganizationArgs = {
  updateOrganizationInput: UpdateOrganizationInput;
};


export type MutationUpdatePharmacyArgs = {
  updatePharmacyInput: UpdatePharmacyInput;
};


export type MutationUpdateWarehouseArgs = {
  updateWarehouseInput: UpdateWarehouseInput;
};


export type MutationUpdateprofileArgs = {
  updateProfileInput: UpdateProfileInput;
};


export type MutationValidateForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordConfirmationInput;
};

export type Organization = {
  __typename?: 'Organization';
  User?: Maybe<Array<User>>;
  active?: Maybe<Scalars['Boolean']['output']>;
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  contact: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PaginatedItemCategories = {
  __typename?: 'PaginatedItemCategories';
  itemCategories: Array<ItemCategory>;
  total: Scalars['Float']['output'];
};

export type PaginatedItems = {
  __typename?: 'PaginatedItems';
  items: Array<Item>;
  total: Scalars['Float']['output'];
};

export type PaginatedOrganizations = {
  __typename?: 'PaginatedOrganizations';
  organizations: Array<Organization>;
  total: Scalars['Float']['output'];
};

export type PaginatedPharmacies = {
  __typename?: 'PaginatedPharmacies';
  pharmacies: Array<Pharmacy>;
  total: Scalars['Float']['output'];
};

export type PaginatedPharmacyStockItem = {
  __typename?: 'PaginatedPharmacyStockItem';
  items: Array<PharmacyStockItem>;
  total: Scalars['Float']['output'];
};

export type PaginatedPharmacyStocks = {
  __typename?: 'PaginatedPharmacyStocks';
  pharmacyStocks: Array<PharmacyStock>;
  total: Scalars['Float']['output'];
};

export type PaginatedStockMovements = {
  __typename?: 'PaginatedStockMovements';
  stockMovements: Array<StockMovement>;
  total: Scalars['Float']['output'];
};

export type PaginatedStockMovementsByBatch = {
  __typename?: 'PaginatedStockMovementsByBatch';
  stockMovementsByBatch: Array<StockMovementsByBatch>;
  total: Scalars['Float']['output'];
};

export type PaginatedStockMovementsByLotName = {
  __typename?: 'PaginatedStockMovementsByLotName';
  stockMovementsByLotName: Array<StockMovementsByLotName>;
  total: Scalars['Float']['output'];
};

export type PaginatedStockMovementsLot = {
  __typename?: 'PaginatedStockMovementsLot';
  stockMovementsLot: Array<StockMovementsByLot>;
  total: Scalars['Float']['output'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  total: Scalars['Float']['output'];
  users: Array<User>;
};

export type PaginatedWarehouseStocks = {
  __typename?: 'PaginatedWarehouseStocks';
  total: Scalars['Float']['output'];
  warehouseStocks: Array<WarehouseStock>;
};

export type PaginatedWarehouses = {
  __typename?: 'PaginatedWarehouses';
  total: Scalars['Float']['output'];
  warehouses: Array<Warehouse>;
};

export type PaginationArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Pharmacy = {
  __typename?: 'Pharmacy';
  contactInfo?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PharmacyStock = {
  __typename?: 'PharmacyStock';
  createdAt: Scalars['DateTime']['output'];
  finalQty: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  item?: Maybe<Item>;
  pharmacy?: Maybe<Pharmacy>;
  status: Scalars['Boolean']['output'];
  totalMrpBaseUnit?: Maybe<Scalars['Float']['output']>;
  totalWholesalePrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PharmacyStockItem = {
  __typename?: 'PharmacyStockItem';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  PharmacyStock: PharmacyStock;
  PharmacyStocks?: Maybe<PaginatedPharmacyStocks>;
  account: AccountTypeResponse;
  getpermissions: Scalars['JSON']['output'];
  item: Item;
  itemCategories?: Maybe<PaginatedItemCategories>;
  itemCategory: ItemCategory;
  items?: Maybe<PaginatedItems>;
  maxPharmacyStockQty: MaxPharmacyStockQty;
  maxPrice: MaxPrice;
  maxWarehouseStockQty: MaxWarehouseStockQty;
  organization: Organization;
  organizationByName: Organization;
  organizations?: Maybe<PaginatedOrganizations>;
  pharmacies?: Maybe<PaginatedPharmacies>;
  pharmaciesByOrganization?: Maybe<Array<PharmaciesByOrganization>>;
  pharmacy: Pharmacy;
  pharmacyStocksByPharmacy?: Maybe<PaginatedPharmacyStocks>;
  pharmacyStocksItems: PaginatedPharmacyStockItem;
  sku: Sku;
  stockMovements?: Maybe<PaginatedStockMovements>;
  stockMovementsByBatch?: Maybe<PaginatedStockMovementsByBatch>;
  stockMovementsByLot?: Maybe<PaginatedStockMovementsByBatch>;
  stockMovementsByLotName?: Maybe<PaginatedStockMovementsByLotName>;
  stockMovementsLot?: Maybe<PaginatedStockMovementsLot>;
  user: User;
  userById: User;
  users?: Maybe<PaginatedUsers>;
  warehouse: Warehouse;
  warehouseStock: WarehouseStock;
  warehouseStocks?: Maybe<PaginatedWarehouseStocks>;
  warehouseStocksByWarehouse?: Maybe<PaginatedWarehouseStocks>;
  warehouses?: Maybe<PaginatedWarehouses>;
};


export type QueryPharmacyStockArgs = {
  id: Scalars['String']['input'];
};


export type QueryPharmacyStocksArgs = {
  filterArgs?: InputMaybe<FilterPharmacyStockInputs>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryItemCategoriesArgs = {
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryItemCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryItemsArgs = {
  filterArgs?: InputMaybe<FilterItemInputs>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrganizationArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrganizationByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryOrganizationsArgs = {
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPharmaciesArgs = {
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPharmaciesByOrganizationArgs = {
  organizationId: Scalars['String']['input'];
};


export type QueryPharmacyArgs = {
  id: Scalars['String']['input'];
};


export type QueryPharmacyStocksByPharmacyArgs = {
  paginationArgs?: InputMaybe<PaginationArgs>;
  pharmacyId: Scalars['String']['input'];
};


export type QueryPharmacyStocksItemsArgs = {
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySkuArgs = {
  itemId: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  warehouseId: Scalars['String']['input'];
};


export type QueryStockMovementsArgs = {
  filterArgs?: InputMaybe<FilterStockMovementsInputs>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStockMovementsByBatchArgs = {
  batchStockMovementsInput: BatchStockMovementsInput;
  filterArgs?: InputMaybe<FilterStockMovementsInputs>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStockMovementsByLotArgs = {
  batchStockMovementsInput: BatchStockMovementsInput;
  filterArgs?: InputMaybe<FilterStockMovementsInputs>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStockMovementsByLotNameArgs = {
  lotStockMovementsInput: LotStockMovementsInput;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStockMovementsLotArgs = {
  filterArgs?: InputMaybe<FilterStockMovementsInputs>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWarehouseArgs = {
  id: Scalars['String']['input'];
};


export type QueryWarehouseStockArgs = {
  id: Scalars['String']['input'];
};


export type QueryWarehouseStocksArgs = {
  filterArgs?: InputMaybe<FilterWarehouseStockInputs>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWarehouseStocksByWarehouseArgs = {
  filterArgs?: InputMaybe<FilterWarehouseStockInputs>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  warehouseId: Scalars['String']['input'];
};


export type QueryWarehousesArgs = {
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};

export type ResetPasswordInput = {
  confirmPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  privileges: Scalars['String']['output'];
  userType: Scalars['String']['output'];
};

export type SignUpStaffInput = {
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  orgId: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignupResponse = {
  __typename?: 'SignupResponse';
  success: Scalars['String']['output'];
};

export type Sku = {
  __typename?: 'Sku';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  sku: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  stockLevel: Scalars['String']['output'];
  stockStatus?: Maybe<Scalars['String']['output']>;
  stocklevelMax?: Maybe<Scalars['String']['output']>;
  stocklevelMin?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type StockMovement = {
  __typename?: 'StockMovement';
  batchName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  expiry?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  item?: Maybe<Scalars['String']['output']>;
  lotName: Scalars['String']['output'];
  organisation?: Maybe<Scalars['String']['output']>;
  qty: Scalars['Float']['output'];
  transactionType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse?: Maybe<Scalars['String']['output']>;
};

export type StockMovementsByBatch = {
  __typename?: 'StockMovementsByBatch';
  batchName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  expiry?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  item?: Maybe<Scalars['String']['output']>;
  lotName: Scalars['String']['output'];
  organisation?: Maybe<Scalars['String']['output']>;
  pharmacy?: Maybe<Scalars['String']['output']>;
  pharmacyClearance?: Maybe<Scalars['String']['output']>;
  qty: Scalars['Float']['output'];
  transactionType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse?: Maybe<Scalars['String']['output']>;
};

export type StockMovementsByLot = {
  __typename?: 'StockMovementsByLot';
  batchName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  expiry?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  item?: Maybe<Scalars['String']['output']>;
  lotName: Scalars['String']['output'];
  organisation?: Maybe<Scalars['String']['output']>;
  qty: Scalars['Float']['output'];
  totalLotItemsQty: Scalars['Float']['output'];
  transactionType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse?: Maybe<Scalars['String']['output']>;
};

export type StockMovementsByLotName = {
  __typename?: 'StockMovementsByLotName';
  batchName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  expiry?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  item?: Maybe<Scalars['String']['output']>;
  lotName: Scalars['String']['output'];
  organisation?: Maybe<Scalars['String']['output']>;
  pharmacy?: Maybe<Scalars['String']['output']>;
  pharmacyClearance?: Maybe<Scalars['String']['output']>;
  qty: Scalars['Float']['output'];
  transactionType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse?: Maybe<Scalars['String']['output']>;
};

export enum StockMovementsType {
  Entry = 'ENTRY',
  Exit = 'EXIT',
  Movement = 'MOVEMENT'
}

export type TokenConfirmationInput = {
  token: Scalars['String']['input'];
};

export type UpdateItemCategoryInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateItemInput = {
  baseUnit?: InputMaybe<BaseUnit>;
  category?: InputMaybe<Array<Scalars['String']['input']>>;
  hsnCode?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  instructions?: InputMaybe<Scalars['String']['input']>;
  mrpBaseUnit?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  wholesalePrice?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateOrganizationInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  adminEmail?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePharmacyInput = {
  contactInfo?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UpdateWarehouseInput = {
  adminId?: InputMaybe<Scalars['String']['input']>;
  area?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailConfirmationToken?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isEmailConfirmed: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  pharmacy?: Maybe<Pharmacy>;
  role?: Maybe<Role>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** The roles available for a user */
export enum UserRole {
  Admin = 'ADMIN',
  Staff = 'STAFF',
  Superadmin = 'SUPERADMIN'
}

export type ValidateForgotPasswordResponse = {
  __typename?: 'ValidateForgotPasswordResponse';
  message: Scalars['String']['output'];
};

export type Warehouse = {
  __typename?: 'Warehouse';
  admin?: Maybe<User>;
  area: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WarehouseStock = {
  __typename?: 'WarehouseStock';
  SKU: Sku;
  createdAt: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  finalQty: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  item: Item;
  status: Scalars['Boolean']['output'];
  totalMrpBaseUnit?: Maybe<Scalars['Float']['output']>;
  totalWholesalePrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse: Warehouse;
};

/** The roles available for a user */
export enum InviteUserRole {
  Admin = 'ADMIN',
  Staff = 'STAFF'
}

export type ItemObjs = {
  itemId: Scalars['String']['input'];
  qty: Scalars['Float']['input'];
};

export type PharmaciesByOrganization = {
  __typename?: 'pharmaciesByOrganization';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SignupMutationVariables = Exact<{
  signUpStaffInput: SignUpStaffInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignupResponse', success: string } };

export type CreateItemCategoryMutationVariables = Exact<{
  createItemCategoryInput: CreateItemCategoryInput;
}>;


export type CreateItemCategoryMutation = { __typename?: 'Mutation', createItemCategory: { __typename?: 'ItemCategory', createdAt: any, id: string, name: string, updatedAt?: any | null, Item?: Array<{ __typename?: 'Item', id: string }> | null } };

export type DeleteItemCategoryMutationVariables = Exact<{
  deleteItemCategoryInput: DeleteItemCategoryInput;
}>;


export type DeleteItemCategoryMutation = { __typename?: 'Mutation', deleteItemCategory: { __typename?: 'ItemCategory', createdAt: any, id: string, name: string } };

export type CategoryItemQueryVariables = Exact<{
  itemCategoryId: Scalars['String']['input'];
}>;


export type CategoryItemQuery = { __typename?: 'Query', itemCategory: { __typename?: 'ItemCategory', createdAt: any, id: string, name: string, updatedAt?: any | null, Item?: Array<{ __typename?: 'Item', id: string }> | null } };

export type ItemCategoriesQueryVariables = Exact<{
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
}>;


export type ItemCategoriesQuery = { __typename?: 'Query', itemCategories?: { __typename?: 'PaginatedItemCategories', total: number, itemCategories: Array<{ __typename?: 'ItemCategory', createdAt: any, id: string, name: string, updatedAt?: any | null, parentCategory?: { __typename?: 'ItemParentCategory', id?: string | null } | null, Item?: Array<{ __typename?: 'Item', id: string }> | null }> } | null };

export type UpdateItemCategoryMutationVariables = Exact<{
  updateItemCategoryInput: UpdateItemCategoryInput;
}>;


export type UpdateItemCategoryMutation = { __typename?: 'Mutation', updateItemCategory: { __typename?: 'ItemCategory', createdAt: any, id: string, name: string, updatedAt?: any | null, Item?: Array<{ __typename?: 'Item', id: string }> | null } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', token: string } };

export type ValidateForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordConfirmationInput;
}>;


export type ValidateForgotPasswordMutation = { __typename?: 'Mutation', validateForgotPassword: { __typename?: 'ValidateForgotPasswordResponse', message: string } };

export type GetPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPermissionsQuery = { __typename?: 'Query', getpermissions: any };

export type CreateItemMutationVariables = Exact<{
  createItemInput: CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', baseUnit: BaseUnit, createdAt: any, hsnCode: string, id: string, instructions: string, mrpBaseUnit?: number | null, updatedAt?: any | null, wholesalePrice?: number | null, name: string, Category?: Array<{ __typename?: 'ItemCategoryRel', createdAt: any, id: string, name: string, updatedAt?: any | null }> | null } };

export type ItemDeleteMutationVariables = Exact<{
  deleteItemInput: DeleteItemInput;
}>;


export type ItemDeleteMutation = { __typename?: 'Mutation', deleteItem: { __typename?: 'Item', baseUnit: BaseUnit, createdAt: any, hsnCode: string, id: string, instructions: string, mrpBaseUnit?: number | null, updatedAt?: any | null, wholesalePrice?: number | null, name: string, Category?: Array<{ __typename?: 'ItemCategoryRel', id: string, name: string }> | null } };

export type ItemQueryVariables = Exact<{
  itemId: Scalars['String']['input'];
}>;


export type ItemQuery = { __typename?: 'Query', item: { __typename?: 'Item', baseUnit: BaseUnit, createdAt: any, hsnCode: string, id: string, instructions: string, mrpBaseUnit?: number | null, updatedAt?: any | null, wholesalePrice?: number | null, name: string, Category?: Array<{ __typename?: 'ItemCategoryRel', id: string, name: string }> | null } };

export type ItemsQueryVariables = Exact<{
  filterArgs?: InputMaybe<FilterItemInputs>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
}>;


export type ItemsQuery = { __typename?: 'Query', items?: { __typename?: 'PaginatedItems', total: number, items: Array<{ __typename?: 'Item', baseUnit: BaseUnit, createdAt: any, hsnCode: string, id: string, instructions: string, mrpBaseUnit?: number | null, updatedAt?: any | null, wholesalePrice?: number | null, name: string, currency?: string | null, Category?: Array<{ __typename?: 'ItemCategoryRel', id: string, name: string }> | null }> } | null };

export type MaxPriceQueryVariables = Exact<{ [key: string]: never; }>;


export type MaxPriceQuery = { __typename?: 'Query', maxPrice: { __typename?: 'MaxPrice', mrpBaseUnit?: number | null, wholesalePrice?: number | null } };

export type UpdateItemMutationVariables = Exact<{
  updateItemInput: UpdateItemInput;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'Item', baseUnit: BaseUnit, createdAt: any, hsnCode: string, id: string, instructions: string, mrpBaseUnit?: number | null, updatedAt?: any | null, wholesalePrice?: number | null, name: string, Category?: Array<{ __typename?: 'ItemCategoryRel', id: string, name: string }> | null } };

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, user: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, updatedAt?: any | null, username?: string | null, organization?: { __typename?: 'Organization', id: string, name: string } | null } } };

export type CreateOrganizationMutationVariables = Exact<{
  createOrganizationInput: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', active?: boolean | null, address: string, city: string, contact: string, country: string, createdAt: any, description: string, id: string, name: string, status: boolean, updatedAt?: any | null } };

export type DeleteOrganizationMutationVariables = Exact<{
  deleteOrganizationInput: DeleteOrganizationInput;
}>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization: { __typename?: 'Organization', active?: boolean | null, address: string, city: string, contact: string, country: string, createdAt: any, description: string, id: string, name: string, updatedAt?: any | null } };

export type QueryQueryVariables = Exact<{
  organizationId: Scalars['String']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', organization: { __typename?: 'Organization', active?: boolean | null, address: string, city: string, contact: string, country: string, createdAt: any, description: string, id: string, name: string, updatedAt?: any | null, User?: Array<{ __typename?: 'User', email: string, role?: { __typename?: 'Role', name: string, userType: string } | null }> | null } };

export type OrganizationsQueryVariables = Exact<{
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrganizationsQuery = { __typename?: 'Query', organizations?: { __typename?: 'PaginatedOrganizations', total: number, organizations: Array<{ __typename?: 'Organization', active?: boolean | null, address: string, city: string, country: string, createdAt: any, description: string, id: string, name: string, updatedAt?: any | null }> } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  updateOrganizationInput: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'Organization', active?: boolean | null, address: string, city: string, contact: string, country: string, createdAt: any, description: string, id: string, name: string, updatedAt?: any | null } };

export type CreatePharmacyMutationVariables = Exact<{
  createPharmacyInput: CreatePharmacyInput;
}>;


export type CreatePharmacyMutation = { __typename?: 'Mutation', createPharmacy: { __typename?: 'Pharmacy', contactInfo?: string | null, createdAt: any, id: string, location: string, name: string, updatedAt?: any | null } };

export type DeletePharmacyMutationVariables = Exact<{
  deletePharmacyInput: DeletePharmacyInput;
}>;


export type DeletePharmacyMutation = { __typename?: 'Mutation', deletePharmacy: { __typename?: 'Pharmacy', contactInfo?: string | null, createdAt: any, id: string, location: string, name: string, updatedAt?: any | null } };

export type PharmacyQueryVariables = Exact<{
  pharmacyId: Scalars['String']['input'];
}>;


export type PharmacyQuery = { __typename?: 'Query', pharmacy: { __typename?: 'Pharmacy', contactInfo?: string | null, createdAt: any, id: string, location: string, name: string, updatedAt?: any | null, organization?: { __typename?: 'Organization', active?: boolean | null, address: string, city: string, contact: string, country: string, createdAt: any, description: string, id: string, name: string, updatedAt?: any | null } | null } };

export type PharmaciesQueryVariables = Exact<{
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
}>;


export type PharmaciesQuery = { __typename?: 'Query', pharmacies?: { __typename?: 'PaginatedPharmacies', total: number, pharmacies: Array<{ __typename?: 'Pharmacy', contactInfo?: string | null, createdAt: any, id: string, location: string, name: string, updatedAt?: any | null, organization?: { __typename?: 'Organization', id: string, name: string } | null }> } | null };

export type UpdatePharmacyMutationVariables = Exact<{
  updatePharmacyInput: UpdatePharmacyInput;
}>;


export type UpdatePharmacyMutation = { __typename?: 'Mutation', updatePharmacy: { __typename?: 'Pharmacy', contactInfo?: string | null, createdAt: any, id: string, location: string, name: string, updatedAt?: any | null } };

export type ClearancePharmacyStockMutationVariables = Exact<{
  clearancePharmacyStockInput: Array<ClearancePharmacyStockInput> | ClearancePharmacyStockInput;
  pharmacyId: Scalars['String']['input'];
}>;


export type ClearancePharmacyStockMutation = { __typename?: 'Mutation', clearancePharmacyStock: Array<{ __typename?: 'ClearancePharmacyStock', id: string }> };

export type CreatePharmacyStockMutationVariables = Exact<{
  createPharmacyStockInput: CreatePharmacyStockInput;
}>;


export type CreatePharmacyStockMutation = { __typename?: 'Mutation', createPharmacyStock: string };

export type PharmacyStockQueryVariables = Exact<{
  pharmacyStockId: Scalars['String']['input'];
}>;


export type PharmacyStockQuery = { __typename?: 'Query', PharmacyStock: { __typename?: 'PharmacyStock', createdAt: any, finalQty: number, id: string, updatedAt?: any | null, item?: { __typename?: 'Item', id: string, name: string } | null, pharmacy?: { __typename?: 'Pharmacy', id: string, name: string } | null } };

export type MaxPharmacyStockQtyQueryVariables = Exact<{ [key: string]: never; }>;


export type MaxPharmacyStockQtyQuery = { __typename?: 'Query', maxPharmacyStockQty: { __typename?: 'MaxPharmacyStockQty', totalQty?: number | null } };

export type PharmacyStocksByPharmacyQueryVariables = Exact<{
  pharmacyId: Scalars['String']['input'];
  paginationArgs?: InputMaybe<PaginationArgs>;
}>;


export type PharmacyStocksByPharmacyQuery = { __typename?: 'Query', pharmacyStocksByPharmacy?: { __typename?: 'PaginatedPharmacyStocks', total: number, pharmacyStocks: Array<{ __typename?: 'PharmacyStock', createdAt: any, finalQty: number, id: string, totalMrpBaseUnit?: number | null, totalWholesalePrice?: number | null, updatedAt?: any | null, item?: { __typename?: 'Item', id: string, name: string } | null, pharmacy?: { __typename?: 'Pharmacy', id: string, name: string } | null }> } | null };

export type PharmacyStocksQueryVariables = Exact<{
  filterArgs?: InputMaybe<FilterPharmacyStockInputs>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
}>;


export type PharmacyStocksQuery = { __typename?: 'Query', PharmacyStocks?: { __typename?: 'PaginatedPharmacyStocks', total: number, pharmacyStocks: Array<{ __typename?: 'PharmacyStock', createdAt: any, finalQty: number, id: string, updatedAt?: any | null, item?: { __typename?: 'Item', id: string, name: string } | null, pharmacy?: { __typename?: 'Pharmacy', id: string, name: string } | null }> } | null };

export type PharmacyStocksItemsQueryVariables = Exact<{
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
}>;


export type PharmacyStocksItemsQuery = { __typename?: 'Query', pharmacyStocksItems: { __typename?: 'PaginatedPharmacyStockItem', total: number, items: Array<{ __typename?: 'PharmacyStockItem', id: string, name: string }> } };

export type AccountQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountQuery = { __typename?: 'Query', account: { __typename?: 'AccountTypeResponse', role: string, user: { __typename?: 'User', createdAt: any, email: string, emailConfirmationToken?: string | null, id: string, isEmailConfirmed: boolean, name?: string | null, updatedAt?: any | null, username?: string | null, organization?: { __typename?: 'Organization', id: string, name: string } | null, role?: { __typename?: 'Role', id: string, name: string, userType: string } | null, pharmacy?: { __typename?: 'Pharmacy', id: string, name: string } | null } } };

export type UpdateprofileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileInput;
}>;


export type UpdateprofileMutation = { __typename?: 'Mutation', updateprofile: boolean };

export type ResetPasswordMutationVariables = Exact<{
  resetPasswordInput: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type StockMovementsLotQueryVariables = Exact<{
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  filterArgs?: InputMaybe<FilterStockMovementsInputs>;
}>;


export type StockMovementsLotQuery = { __typename?: 'Query', stockMovementsLot?: { __typename?: 'PaginatedStockMovementsLot', total: number, stockMovementsLot: Array<{ __typename?: 'StockMovementsByLot', batchName?: string | null, createdAt: any, expiry?: any | null, id: string, item?: string | null, lotName: string, organisation?: string | null, qty: number, totalLotItemsQty: number, transactionType: string, warehouse?: string | null, updatedAt?: any | null }> } | null };

export type StockMovementsByLotNameQueryVariables = Exact<{
  lotStockMovementsInput: LotStockMovementsInput;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
}>;


export type StockMovementsByLotNameQuery = { __typename?: 'Query', stockMovementsByLotName?: { __typename?: 'PaginatedStockMovementsByLotName', total: number, stockMovementsByLotName: Array<{ __typename?: 'StockMovementsByLotName', batchName?: string | null, createdAt: any, expiry?: any | null, id: string, item?: string | null, lotName: string, organisation?: string | null, pharmacy?: string | null, pharmacyClearance?: string | null, qty: number, transactionType: string, updatedAt?: any | null, warehouse?: string | null }> } | null };

export type MutationMutationVariables = Exact<{
  tokenConfirmationInput: TokenConfirmationInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', tokenConfirmation: { __typename?: 'LoginResponse', access_token: string, user: { __typename?: 'User', createdAt: any, email: string, emailConfirmationToken?: string | null, id: string, isEmailConfirmed: boolean, name?: string | null, updatedAt?: any | null, username?: string | null } } };

export type InviteUsersMutationVariables = Exact<{
  inviteUsersInput: InviteUsersInput;
}>;


export type InviteUsersMutation = { __typename?: 'Mutation', inviteUsers: string };

export type CreateMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateMutation = { __typename?: 'Mutation', create: { __typename?: 'User', createdAt: any, email: string, emailConfirmationToken?: string | null, id: string, isEmailConfirmed: boolean, name?: string | null, updatedAt?: any | null, username?: string | null, organization?: { __typename?: 'Organization', id: string, name: string } | null, role?: { __typename?: 'Role', id: string, name: string, userType: string } | null } };

export type DeleteUserBySuperAdminMutationVariables = Exact<{
  deleteUserInput: DeleteUserInput;
}>;


export type DeleteUserBySuperAdminMutation = { __typename?: 'Mutation', deleteUserBySuperAdmin: { __typename?: 'DeleteUserResponse', message: string } };

export type UserByIdQueryVariables = Exact<{
  userByIdId: Scalars['String']['input'];
}>;


export type UserByIdQuery = { __typename?: 'Query', userById: { __typename?: 'User', createdAt: any, email: string, emailConfirmationToken?: string | null, id: string, isEmailConfirmed: boolean, name?: string | null, updatedAt?: any | null, username?: string | null, organization?: { __typename?: 'Organization', id: string, name: string } | null, role?: { __typename?: 'Role', id: string, name: string, userType: string } | null } };

export type UsersQueryVariables = Exact<{
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
}>;


export type UsersQuery = { __typename?: 'Query', users?: { __typename?: 'PaginatedUsers', total: number, users: Array<{ __typename?: 'User', createdAt: any, email: string, emailConfirmationToken?: string | null, id: string, isEmailConfirmed: boolean, name?: string | null, updatedAt?: any | null, username?: string | null, organization?: { __typename?: 'Organization', id: string, name: string } | null, role?: { __typename?: 'Role', id: string, name: string, userType: string } | null }> } | null };

export type CreateWarehouseMutationVariables = Exact<{
  createWarehouseInput: CreateWarehouseInput;
}>;


export type CreateWarehouseMutation = { __typename?: 'Mutation', createWarehouse: { __typename?: 'Warehouse', area: string, createdAt: any, id: string, location: string, updatedAt?: any | null, name: string, organization?: { __typename?: 'Organization', id: string, name: string } | null } };

export type DeleteWarehouseMutationVariables = Exact<{
  deleteWarehouseInput: DeleteWarehouseInput;
}>;


export type DeleteWarehouseMutation = { __typename?: 'Mutation', deleteWarehouse: { __typename?: 'Warehouse', area: string, createdAt: any, id: string, location: string, updatedAt?: any | null, name: string } };

export type WarehouseDetailsQueryVariables = Exact<{
  warehouseId: Scalars['String']['input'];
}>;


export type WarehouseDetailsQuery = { __typename?: 'Query', warehouse: { __typename?: 'Warehouse', area: string, createdAt: any, id: string, location: string, updatedAt?: any | null, name: string, organization?: { __typename?: 'Organization', name: string, id: string } | null } };

export type GenerateSkuMutationVariables = Exact<{
  generateSkuNameInput: CreateSkuNameInput;
}>;


export type GenerateSkuMutation = { __typename?: 'Mutation', generateSKU: { __typename?: 'GenerateSku', sku: string } };

export type WarehouseListQueryVariables = Exact<{
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
}>;


export type WarehouseListQuery = { __typename?: 'Query', warehouses?: { __typename?: 'PaginatedWarehouses', total: number, warehouses: Array<{ __typename?: 'Warehouse', area: string, createdAt: any, id: string, location: string, updatedAt?: any | null, name: string, organization?: { __typename?: 'Organization', name: string, id: string } | null }> } | null };

export type WarehouseStockCreateMutationVariables = Exact<{
  createWarehouseStockInput: Array<CreateWarehouseStockInput> | CreateWarehouseStockInput;
}>;


export type WarehouseStockCreateMutation = { __typename?: 'Mutation', createWarehouseStock: string };

export type DeleteWarehouseStockMutationVariables = Exact<{
  deleteWarehouseStockInput: DeleteWarehouseStockInput;
}>;


export type DeleteWarehouseStockMutation = { __typename?: 'Mutation', deleteWarehouseStock: { __typename?: 'WarehouseStock', createdAt: any, finalQty: number, id: string, totalMrpBaseUnit?: number | null, totalWholesalePrice?: number | null, updatedAt?: any | null, SKU: { __typename?: 'Sku', id: string, sku: string }, item: { __typename?: 'Item', id: string, name: string }, warehouse: { __typename?: 'Warehouse', id: string, name: string } } };

export type WarehouseStockDetailsQueryVariables = Exact<{
  warehouseStockId: Scalars['String']['input'];
}>;


export type WarehouseStockDetailsQuery = { __typename?: 'Query', warehouseStock: { __typename?: 'WarehouseStock', createdAt: any, finalQty: number, id: string, totalMrpBaseUnit?: number | null, totalWholesalePrice?: number | null, updatedAt?: any | null, SKU: { __typename?: 'Sku', id: string, sku: string }, item: { __typename?: 'Item', id: string, name: string }, warehouse: { __typename?: 'Warehouse', id: string, name: string, organization?: { __typename?: 'Organization', id: string, name: string } | null } } };

export type MaxWarehouseStockQtyQueryVariables = Exact<{ [key: string]: never; }>;


export type MaxWarehouseStockQtyQuery = { __typename?: 'Query', maxWarehouseStockQty: { __typename?: 'MaxWarehouseStockQty', totalQty?: number | null } };

export type WarehouseStocksQueryVariables = Exact<{
  filterArgs?: InputMaybe<FilterWarehouseStockInputs>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  paginationArgs?: InputMaybe<PaginationArgs>;
  searchText?: InputMaybe<Scalars['String']['input']>;
}>;


export type WarehouseStocksQuery = { __typename?: 'Query', warehouseStocks?: { __typename?: 'PaginatedWarehouseStocks', total: number, warehouseStocks: Array<{ __typename?: 'WarehouseStock', createdAt: any, finalQty: number, id: string, totalMrpBaseUnit?: number | null, totalWholesalePrice?: number | null, updatedAt?: any | null, currency?: string | null, SKU: { __typename?: 'Sku', id: string, sku: string }, item: { __typename?: 'Item', id: string, name: string }, warehouse: { __typename?: 'Warehouse', id: string, name: string, organization?: { __typename?: 'Organization', id: string, name: string } | null } }> } | null };

export type WarehouseStocksByWarehouseQueryVariables = Exact<{
  warehouseId: Scalars['String']['input'];
  paginationArgs?: InputMaybe<PaginationArgs>;
}>;


export type WarehouseStocksByWarehouseQuery = { __typename?: 'Query', warehouseStocksByWarehouse?: { __typename?: 'PaginatedWarehouseStocks', total: number, warehouseStocks: Array<{ __typename?: 'WarehouseStock', createdAt: any, finalQty: number, id: string, totalMrpBaseUnit?: number | null, totalWholesalePrice?: number | null, updatedAt?: any | null, currency?: string | null, SKU: { __typename?: 'Sku', id: string, sku: string }, item: { __typename?: 'Item', id: string, name: string }, warehouse: { __typename?: 'Warehouse', id: string, name: string } }> } | null };

export type UpdateWarehouseMutationMutationVariables = Exact<{
  updateWarehouseInput: UpdateWarehouseInput;
}>;


export type UpdateWarehouseMutationMutation = { __typename?: 'Mutation', updateWarehouse: { __typename?: 'Warehouse', area: string, createdAt: any, id: string, location: string, updatedAt?: any | null, name: string, organization?: { __typename?: 'Organization', id: string, name: string } | null } };


export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signUpStaffInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpStaffInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signUpStaffInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signUpStaffInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const CreateItemCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateItemCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createItemCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateItemCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItemCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createItemCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createItemCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"Item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateItemCategoryMutation, CreateItemCategoryMutationVariables>;
export const DeleteItemCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteItemCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteItemCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteItemCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteItemCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteItemCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteItemCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteItemCategoryMutation, DeleteItemCategoryMutationVariables>;
export const CategoryItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CategoryItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemCategoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CategoryItemQuery, CategoryItemQueryVariables>;
export const ItemCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ItemCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"itemCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"Item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ItemCategoriesQuery, ItemCategoriesQueryVariables>;
export const UpdateItemCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateItemCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateItemCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateItemCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateItemCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateItemCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateItemCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateItemCategoryMutation, UpdateItemCategoryMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"forgotPasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgotPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"forgotPasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"forgotPasswordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ValidateForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ValidateForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"forgotPasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgotPasswordConfirmationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateForgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"forgotPasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"forgotPasswordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ValidateForgotPasswordMutation, ValidateForgotPasswordMutationVariables>;
export const GetPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getpermissions"}}]}}]} as unknown as DocumentNode<GetPermissionsQuery, GetPermissionsQueryVariables>;
export const CreateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createItemInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createItemInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createItemInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"baseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"mrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"wholesalePrice"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateItemMutation, CreateItemMutationVariables>;
export const ItemDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ItemDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteItemInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteItemInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteItemInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"baseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"mrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"wholesalePrice"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ItemDeleteMutation, ItemDeleteMutationVariables>;
export const ItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Item"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"baseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"mrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"wholesalePrice"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ItemQuery, ItemQueryVariables>;
export const ItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Items"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterItemInputs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"mrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"wholesalePrice"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"Category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<ItemsQuery, ItemsQueryVariables>;
export const MaxPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MaxPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maxPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"wholesalePrice"}}]}}]}}]} as unknown as DocumentNode<MaxPriceQuery, MaxPriceQueryVariables>;
export const UpdateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateItemInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateItemInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateItemInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"baseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"mrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"wholesalePrice"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateItemMutation, UpdateItemMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const DeleteOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const OrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Organizations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<OrganizationsQuery, OrganizationsQueryVariables>;
export const UpdateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const CreatePharmacyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePharmacy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPharmacyInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePharmacyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPharmacy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPharmacyInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPharmacyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactInfo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreatePharmacyMutation, CreatePharmacyMutationVariables>;
export const DeletePharmacyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePharmacy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePharmacyInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePharmacyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePharmacy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deletePharmacyInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePharmacyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactInfo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<DeletePharmacyMutation, DeletePharmacyMutationVariables>;
export const PharmacyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Pharmacy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pharmacyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pharmacy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pharmacyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactInfo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PharmacyQuery, PharmacyQueryVariables>;
export const PharmaciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Pharmacies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pharmacies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pharmacies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactInfo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PharmaciesQuery, PharmaciesQueryVariables>;
export const UpdatePharmacyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePharmacy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePharmacyInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePharmacyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePharmacy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePharmacyInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePharmacyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactInfo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdatePharmacyMutation, UpdatePharmacyMutationVariables>;
export const ClearancePharmacyStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearancePharmacyStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clearancePharmacyStockInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClearancePharmacyStockInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pharmacyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearancePharmacyStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clearancePharmacyStockInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clearancePharmacyStockInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"pharmacyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pharmacyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ClearancePharmacyStockMutation, ClearancePharmacyStockMutationVariables>;
export const CreatePharmacyStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePharmacyStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPharmacyStockInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePharmacyStockInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPharmacyStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPharmacyStockInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPharmacyStockInput"}}}]}]}}]} as unknown as DocumentNode<CreatePharmacyStockMutation, CreatePharmacyStockMutationVariables>;
export const PharmacyStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PharmacyStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pharmacyStockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PharmacyStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pharmacyStockId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalQty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pharmacy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PharmacyStockQuery, PharmacyStockQueryVariables>;
export const MaxPharmacyStockQtyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MaxPharmacyStockQty"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maxPharmacyStockQty"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalQty"}}]}}]}}]} as unknown as DocumentNode<MaxPharmacyStockQtyQuery, MaxPharmacyStockQtyQueryVariables>;
export const PharmacyStocksByPharmacyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PharmacyStocksByPharmacy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pharmacyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pharmacyStocksByPharmacy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pharmacyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pharmacyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pharmacyStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalQty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pharmacy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalMrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"totalWholesalePrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PharmacyStocksByPharmacyQuery, PharmacyStocksByPharmacyQueryVariables>;
export const PharmacyStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PharmacyStocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterPharmacyStockInputs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PharmacyStocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pharmacyStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalQty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pharmacy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PharmacyStocksQuery, PharmacyStocksQueryVariables>;
export const PharmacyStocksItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PharmacyStocksItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pharmacyStocksItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PharmacyStocksItemsQuery, PharmacyStocksItemsQueryVariables>;
export const AccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailConfirmationToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailConfirmed"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"pharmacy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AccountQuery, AccountQueryVariables>;
export const UpdateprofileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Updateprofile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateprofile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProfileInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}}}]}]}}]} as unknown as DocumentNode<UpdateprofileMutation, UpdateprofileMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetPasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordInput"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const StockMovementsLotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StockMovementsLot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterStockMovementsInputs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockMovementsLot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"stockMovementsLot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batchName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"}},{"kind":"Field","name":{"kind":"Name","value":"lotName"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"}},{"kind":"Field","name":{"kind":"Name","value":"qty"}},{"kind":"Field","name":{"kind":"Name","value":"totalLotItemsQty"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<StockMovementsLotQuery, StockMovementsLotQueryVariables>;
export const StockMovementsByLotNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StockMovementsByLotName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lotStockMovementsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LotStockMovementsInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockMovementsByLotName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lotStockMovementsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lotStockMovementsInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockMovementsByLotName"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batchName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"}},{"kind":"Field","name":{"kind":"Name","value":"lotName"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"}},{"kind":"Field","name":{"kind":"Name","value":"pharmacy"}},{"kind":"Field","name":{"kind":"Name","value":"pharmacyClearance"}},{"kind":"Field","name":{"kind":"Name","value":"qty"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<StockMovementsByLotNameQuery, StockMovementsByLotNameQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenConfirmationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenConfirmationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenConfirmation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tokenConfirmationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenConfirmationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailConfirmationToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailConfirmed"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const InviteUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteUsersInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InviteUsersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteUsersInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteUsersInput"}}}]}]}}]} as unknown as DocumentNode<InviteUsersMutation, InviteUsersMutationVariables>;
export const CreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Create"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailConfirmationToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailConfirmed"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMutation, CreateMutationVariables>;
export const DeleteUserBySuperAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUserBySuperAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUserBySuperAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteUserBySuperAdminMutation, DeleteUserBySuperAdminMutationVariables>;
export const UserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailConfirmationToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailConfirmed"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}}]}}]}}]} as unknown as DocumentNode<UserByIdQuery, UserByIdQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailConfirmationToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailConfirmed"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const CreateWarehouseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWarehouse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createWarehouseInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWarehouseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWarehouse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createWarehouseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createWarehouseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateWarehouseMutation, CreateWarehouseMutationVariables>;
export const DeleteWarehouseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWarehouse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteWarehouseInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteWarehouseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWarehouse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteWarehouseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteWarehouseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteWarehouseMutation, DeleteWarehouseMutationVariables>;
export const WarehouseDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WarehouseDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"warehouseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"warehouseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<WarehouseDetailsQuery, WarehouseDetailsQueryVariables>;
export const GenerateSkuDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateSKU"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generateSkuNameInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSkuNameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateSKU"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generateSkuNameInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generateSkuNameInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}}]}}]} as unknown as DocumentNode<GenerateSkuMutation, GenerateSkuMutationVariables>;
export const WarehouseListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WarehouseList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"warehouses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"warehouses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<WarehouseListQuery, WarehouseListQueryVariables>;
export const WarehouseStockCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WarehouseStockCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createWarehouseStockInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWarehouseStockInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWarehouseStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createWarehouseStockInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createWarehouseStockInput"}}}]}]}}]} as unknown as DocumentNode<WarehouseStockCreateMutation, WarehouseStockCreateMutationVariables>;
export const DeleteWarehouseStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWarehouseStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteWarehouseStockInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteWarehouseStockInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWarehouseStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteWarehouseStockInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteWarehouseStockInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SKU"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalQty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalMrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"totalWholesalePrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteWarehouseStockMutation, DeleteWarehouseStockMutationVariables>;
export const WarehouseStockDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WarehouseStockDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"warehouseStockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"warehouseStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"warehouseStockId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SKU"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalQty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalMrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"totalWholesalePrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<WarehouseStockDetailsQuery, WarehouseStockDetailsQueryVariables>;
export const MaxWarehouseStockQtyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MaxWarehouseStockQty"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maxWarehouseStockQty"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalQty"}}]}}]}}]} as unknown as DocumentNode<MaxWarehouseStockQtyQuery, MaxWarehouseStockQtyQueryVariables>;
export const WarehouseStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WarehouseStocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterWarehouseStockInputs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"warehouseStocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"warehouseStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SKU"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalQty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalMrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"totalWholesalePrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]} as unknown as DocumentNode<WarehouseStocksQuery, WarehouseStocksQueryVariables>;
export const WarehouseStocksByWarehouseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WarehouseStocksByWarehouse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"warehouseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"warehouseStocksByWarehouse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"warehouseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"warehouseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"warehouseStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SKU"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalQty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalMrpBaseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"totalWholesalePrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]} as unknown as DocumentNode<WarehouseStocksByWarehouseQuery, WarehouseStocksByWarehouseQueryVariables>;
export const UpdateWarehouseMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWarehouseMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateWarehouseInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWarehouseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWarehouse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateWarehouseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateWarehouseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWarehouseMutationMutation, UpdateWarehouseMutationMutationVariables>;