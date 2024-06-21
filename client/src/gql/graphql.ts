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
  Kg = 'KG',
  Nos = 'NOS',
  Strip = 'STRIP',
  Vial = 'VIAL'
}

export type CreateItemCategoryInput = {
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateItemInput = {
  baseUnit: Scalars['String']['input'];
  category?: InputMaybe<Array<Scalars['String']['input']>>;
  hsn_code?: InputMaybe<Scalars['String']['input']>;
  instructions: Scalars['String']['input'];
  mrp_base_unit?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  wholesale_price?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateOrganizationInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreatePharmacyInput = {
  contact_info?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  orgId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  roleId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateWarehouseInput = {
  adminId?: InputMaybe<Scalars['String']['input']>;
  area: Scalars['String']['input'];
  location: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateWarehouseStockInput = {
  itemId?: InputMaybe<Scalars['String']['input']>;
  stockLevel: Scalars['String']['input'];
  stock_status: Scalars['String']['input'];
  stocklevel_max: Scalars['Float']['input'];
  stocklevel_min: Scalars['Float']['input'];
  warehouseId?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteItemCategoryInput = {
  id: Scalars['String']['input'];
};

export type DeleteItemCategoryRelationInput = {
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

export type DeleteWarehouseInput = {
  id: Scalars['String']['input'];
};

export type DeleteWarehouseStockInput = {
  id: Scalars['String']['input'];
};

export type Item = {
  __typename?: 'Item';
  Category?: Maybe<Array<ItemCategory>>;
  baseUnit: BaseUnit;
  createdAt: Scalars['DateTime']['output'];
  hsn_code: Scalars['String']['output'];
  id: Scalars['String']['output'];
  instructions: Scalars['String']['output'];
  mrp_base_unit?: Maybe<Scalars['Float']['output']>;
  sku: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  wholesale_price?: Maybe<Scalars['Float']['output']>;
};

export type ItemCategory = {
  __typename?: 'ItemCategory';
  Item?: Maybe<Array<Item>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentCategoryId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ItemCategoryRelation = {
  __typename?: 'ItemCategoryRelation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  itemCategoryId: Scalars['String']['output'];
  itemId: Scalars['String']['output'];
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

export type Mutation = {
  __typename?: 'Mutation';
  create: User;
  createItem: Item;
  createItemCategory: ItemCategory;
  createOrganization: Organization;
  createPharmacy: Pharmacy;
  createWarehouse: Warehouse;
  createWarehouseStock: WarehouseStock;
  deleteItem: Item;
  deleteItemCategory: ItemCategory;
  deleteItemCategoryRelation: ItemCategoryRelation;
  deleteOrganization: Organization;
  deletePharmacy: Pharmacy;
  deleteWarehouse: Warehouse;
  deleteWarehouseStock: WarehouseStock;
  login: LoginResponse;
  resetPassword: Scalars['Boolean']['output'];
  signup: SignupResponse;
  updateItem: Item;
  updateItemCategory: ItemCategory;
  updateOrganization: Organization;
  updatePharmacy: Pharmacy;
  updateWarehouse: Warehouse;
  updateWarehouseStock: WarehouseStock;
  updateprofile: Scalars['Boolean']['output'];
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


export type MutationCreateWarehouseArgs = {
  createWarehouseInput: CreateWarehouseInput;
};


export type MutationCreateWarehouseStockArgs = {
  createWarehouseStockInput: CreateWarehouseStockInput;
};


export type MutationDeleteItemArgs = {
  deleteItemInput: DeleteItemInput;
};


export type MutationDeleteItemCategoryArgs = {
  deleteItemCategoryInput: DeleteItemCategoryInput;
};


export type MutationDeleteItemCategoryRelationArgs = {
  deleteItemCategoryRelationInput: DeleteItemCategoryRelationInput;
};


export type MutationDeleteOrganizationArgs = {
  deleteOrganizationInput: DeleteOrganizationInput;
};


export type MutationDeletePharmacyArgs = {
  deletePharmacyInput: DeletePharmacyInput;
};


export type MutationDeleteWarehouseArgs = {
  deleteWarehouseInput: DeleteWarehouseInput;
};


export type MutationDeleteWarehouseStockArgs = {
  deleteWarehouseStockInput: DeleteWarehouseStockInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationSignupArgs = {
  signupUserInput: CreateUserInput;
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


export type MutationUpdateWarehouseStockArgs = {
  updateWarehouseStockInput: UpdateWarehouseStockInput;
};


export type MutationUpdateprofileArgs = {
  updateProfileInput: UpdateProfileInput;
};

export type Organization = {
  __typename?: 'Organization';
  active?: Maybe<Scalars['Boolean']['output']>;
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Pharmacy = {
  __typename?: 'Pharmacy';
  contact_info?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organizationId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  account: AccountTypeResponse;
  getpermissions: Scalars['JSON']['output'];
  item: Item;
  itemCategories?: Maybe<Array<ItemCategory>>;
  itemCategory: ItemCategory;
  items?: Maybe<Array<Item>>;
  organization: Organization;
  organizationByName: Organization;
  organizations?: Maybe<Array<Organization>>;
  pharmacy: Pharmacy;
  pharmacys?: Maybe<Array<Pharmacy>>;
  user: User;
  users?: Maybe<Array<User>>;
  warehouse: Warehouse;
  warehouseStock: WarehouseStock;
  warehouseStocks?: Maybe<Array<WarehouseStock>>;
  warehouses?: Maybe<Array<Warehouse>>;
};


export type QueryItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryItemCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrganizationArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrganizationByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryPharmacyArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  email: Scalars['String']['input'];
};


export type QueryWarehouseArgs = {
  id: Scalars['String']['input'];
};


export type QueryWarehouseStockArgs = {
  id: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type SignupResponse = {
  __typename?: 'SignupResponse';
  access_token: Scalars['String']['output'];
};

export enum StockLevel {
  High = 'HIGH',
  Low = 'LOW',
  Negative = 'NEGATIVE',
  Positive = 'POSITIVE'
}

export type UpdateItemCategoryInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateItemInput = {
  baseUnit?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Array<Scalars['String']['input']>>;
  hsn_code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  instructions?: InputMaybe<Scalars['String']['input']>;
  mrp_base_unit?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  wholesale_price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateOrganizationInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePharmacyInput = {
  contact_info?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
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
  organizationId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWarehouseStockInput = {
  id: Scalars['String']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
  stockLevel?: InputMaybe<Scalars['String']['input']>;
  stock_status?: InputMaybe<Scalars['String']['input']>;
  stocklevel_max?: InputMaybe<Scalars['Float']['input']>;
  stocklevel_min?: InputMaybe<Scalars['Float']['input']>;
  warehouseId?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type Warehouse = {
  __typename?: 'Warehouse';
  adminId?: Maybe<Scalars['String']['output']>;
  area: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  organizationId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WarehouseStock = {
  __typename?: 'WarehouseStock';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  itemId?: Maybe<Scalars['String']['output']>;
  stockLevel: StockLevel;
  stock_status: Scalars['String']['output'];
  stocklevel_max?: Maybe<Scalars['Float']['output']>;
  stocklevel_min?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouseId?: Maybe<Scalars['String']['output']>;
};

export type SignupMutationVariables = Exact<{
  signupUserInput: CreateUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignupResponse', access_token: string } };


export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signupUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signupUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;