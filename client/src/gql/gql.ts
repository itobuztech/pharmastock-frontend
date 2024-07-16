/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($loginUserInput: LoginUserInput!) {\n    login(loginUserInput: $loginUserInput) {\n      access_token\n      user {\n        createdAt\n        email\n        id\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query Organizations($paginationArgs: PaginationArgs) {\n    organizations(paginationArgs: $paginationArgs) {\n      organizations {\n        active\n        address\n        city\n        country\n        createdAt\n        description\n        id\n        name\n        updatedAt\n      }\n      total\n    }\n  }\n": types.OrganizationsDocument,
    "\n  query Account {\n    account {\n      role\n      user {\n        createdAt\n        email\n        emailConfirmationToken\n        id\n        isEmailConfirmed\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n": types.AccountDocument,
    "\n  mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {\n    resetPassword(resetPasswordInput: $resetPasswordInput)\n  }\n": types.ResetPasswordDocument,
    "\n  mutation Updateprofile($updateProfileInput: UpdateProfileInput!) {\n    updateprofile(updateProfileInput: $updateProfileInput)\n  }\n": types.UpdateprofileDocument,
    "\n  mutation Signup($signupUserInput: CreateUserInput!) {\n    signup(signupUserInput: $signupUserInput) {\n      success\n    }\n  }\n": types.SignupDocument,
    "\n  mutation CreateItemCategory(\n    $createItemCategoryInput: CreateItemCategoryInput!\n  ) {\n    createItemCategory(createItemCategoryInput: $createItemCategoryInput) {\n      createdAt\n      id\n      name\n      updatedAt\n      Item {\n        id\n      }\n    }\n  }\n": types.CreateItemCategoryDocument,
    "\n  mutation DeleteItemCategory(\n    $deleteItemCategoryInput: DeleteItemCategoryInput!\n  ) {\n    deleteItemCategory(deleteItemCategoryInput: $deleteItemCategoryInput) {\n      createdAt\n      id\n      name\n    }\n  }\n": types.DeleteItemCategoryDocument,
    "\n  query CategoryItem($itemCategoryId: String!) {\n    itemCategory(id: $itemCategoryId) {\n      Item {\n        id\n      }\n      createdAt\n      id\n      name\n      updatedAt\n    }\n  }\n": types.CategoryItemDocument,
    "\n  query ItemCategories($paginationArgs: PaginationArgs) {\n    itemCategories(paginationArgs: $paginationArgs) {\n      total\n      itemCategories {\n        createdAt\n        id\n        name\n        parentCategory {\n          id\n        }\n        updatedAt\n      }\n    }\n  }\n": types.ItemCategoriesDocument,
    "\n  mutation UpdateItemCategory(\n    $updateItemCategoryInput: UpdateItemCategoryInput!\n  ) {\n    updateItemCategory(updateItemCategoryInput: $updateItemCategoryInput) {\n      Item {\n        id\n      }\n      createdAt\n      id\n      name\n      updatedAt\n    }\n  }\n": types.UpdateItemCategoryDocument,
    "\n  mutation CreateOrganization(\n    $createOrganizationInput: CreateOrganizationInput!\n  ) {\n    createOrganization(createOrganizationInput: $createOrganizationInput) {\n      active\n      address\n      city\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n      contact\n    }\n  }\n": types.CreateOrganizationDocument,
    "\n  mutation DeleteOrganization(\n    $deleteOrganizationInput: DeleteOrganizationInput!\n  ) {\n    deleteOrganization(deleteOrganizationInput: $deleteOrganizationInput) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n": types.DeleteOrganizationDocument,
    "\n  query Query($organizationId: String!) {\n    organization(id: $organizationId) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n": types.QueryDocument,
    "\n  mutation UpdateOrganization(\n    $updateOrganizationInput: UpdateOrganizationInput!\n  ) {\n    updateOrganization(updateOrganizationInput: $updateOrganizationInput) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n": types.UpdateOrganizationDocument,
    "\n  mutation CreatePharmacy($createPharmacyInput: CreatePharmacyInput!) {\n    createPharmacy(createPharmacyInput: $createPharmacyInput) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n": types.CreatePharmacyDocument,
    "\n  mutation DeletePharmacy($deletePharmacyInput: DeletePharmacyInput!) {\n    deletePharmacy(deletePharmacyInput: $deletePharmacyInput) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n": types.DeletePharmacyDocument,
    "\n  query Pharmacy($pharmacyId: String!) {\n    pharmacy(id: $pharmacyId) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      organization {\n        active\n        address\n        city\n        contact\n        country\n        createdAt\n        description\n        id\n        name\n        updatedAt\n      }\n      updatedAt\n    }\n  }\n": types.PharmacyDocument,
    "\n  query Pharmacies($paginationArgs: PaginationArgs) {\n    pharmacies(paginationArgs: $paginationArgs) {\n      pharmacies {\n        contactInfo\n        createdAt\n        id\n        location\n        name\n        organization {\n          id\n          name\n        }\n        updatedAt\n      }\n      total\n    }\n  }\n": types.PharmaciesDocument,
    "\n  mutation UpdatePharmacy($updatePharmacyInput: UpdatePharmacyInput!) {\n    updatePharmacy(updatePharmacyInput: $updatePharmacyInput) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n": types.UpdatePharmacyDocument,
    "\n  mutation Mutation($tokenConfirmationInput: TokenConfirmationInput!) {\n    tokenConfirmation(tokenConfirmationInput: $tokenConfirmationInput) {\n      access_token\n      user {\n        createdAt\n        email\n        emailConfirmationToken\n        id\n        isEmailConfirmed\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n": types.MutationDocument,
    "\n  mutation CreateWarehouse($createWarehouseInput: CreateWarehouseInput!) {\n    createWarehouse(createWarehouseInput: $createWarehouseInput) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n      organization {\n        id\n        name\n      }\n    }\n  }\n": types.CreateWarehouseDocument,
    "\n  mutation DeleteWarehouse($deleteWarehouseInput: DeleteWarehouseInput!) {\n    deleteWarehouse(deleteWarehouseInput: $deleteWarehouseInput) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n    }\n  }\n": types.DeleteWarehouseDocument,
    "\n  query WarehouseDetails($warehouseId: String!) {\n    warehouse(id: $warehouseId) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n      organization {\n        name\n        id\n      }\n    }\n  }\n": types.WarehouseDetailsDocument,
    "\n  query WarehouseList {\n    warehouses {\n      total\n      warehouses {\n        area\n        createdAt\n        id\n        location\n        updatedAt\n        name\n        organization {\n          name\n          id\n        }\n      }\n    }\n  }\n": types.WarehouseListDocument,
    "\n  mutation UpdateWarehouseMutation(\n    $updateWarehouseInput: UpdateWarehouseInput!\n  ) {\n    updateWarehouse(updateWarehouseInput: $updateWarehouseInput) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n      organization {\n        id\n        name\n      }\n    }\n  }\n": types.UpdateWarehouseMutationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($loginUserInput: LoginUserInput!) {\n    login(loginUserInput: $loginUserInput) {\n      access_token\n      user {\n        createdAt\n        email\n        id\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginUserInput: LoginUserInput!) {\n    login(loginUserInput: $loginUserInput) {\n      access_token\n      user {\n        createdAt\n        email\n        id\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Organizations($paginationArgs: PaginationArgs) {\n    organizations(paginationArgs: $paginationArgs) {\n      organizations {\n        active\n        address\n        city\n        country\n        createdAt\n        description\n        id\n        name\n        updatedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Organizations($paginationArgs: PaginationArgs) {\n    organizations(paginationArgs: $paginationArgs) {\n      organizations {\n        active\n        address\n        city\n        country\n        createdAt\n        description\n        id\n        name\n        updatedAt\n      }\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Account {\n    account {\n      role\n      user {\n        createdAt\n        email\n        emailConfirmationToken\n        id\n        isEmailConfirmed\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query Account {\n    account {\n      role\n      user {\n        createdAt\n        email\n        emailConfirmationToken\n        id\n        isEmailConfirmed\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {\n    resetPassword(resetPasswordInput: $resetPasswordInput)\n  }\n"): (typeof documents)["\n  mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {\n    resetPassword(resetPasswordInput: $resetPasswordInput)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Updateprofile($updateProfileInput: UpdateProfileInput!) {\n    updateprofile(updateProfileInput: $updateProfileInput)\n  }\n"): (typeof documents)["\n  mutation Updateprofile($updateProfileInput: UpdateProfileInput!) {\n    updateprofile(updateProfileInput: $updateProfileInput)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Signup($signupUserInput: CreateUserInput!) {\n    signup(signupUserInput: $signupUserInput) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Signup($signupUserInput: CreateUserInput!) {\n    signup(signupUserInput: $signupUserInput) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateItemCategory(\n    $createItemCategoryInput: CreateItemCategoryInput!\n  ) {\n    createItemCategory(createItemCategoryInput: $createItemCategoryInput) {\n      createdAt\n      id\n      name\n      updatedAt\n      Item {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateItemCategory(\n    $createItemCategoryInput: CreateItemCategoryInput!\n  ) {\n    createItemCategory(createItemCategoryInput: $createItemCategoryInput) {\n      createdAt\n      id\n      name\n      updatedAt\n      Item {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteItemCategory(\n    $deleteItemCategoryInput: DeleteItemCategoryInput!\n  ) {\n    deleteItemCategory(deleteItemCategoryInput: $deleteItemCategoryInput) {\n      createdAt\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteItemCategory(\n    $deleteItemCategoryInput: DeleteItemCategoryInput!\n  ) {\n    deleteItemCategory(deleteItemCategoryInput: $deleteItemCategoryInput) {\n      createdAt\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CategoryItem($itemCategoryId: String!) {\n    itemCategory(id: $itemCategoryId) {\n      Item {\n        id\n      }\n      createdAt\n      id\n      name\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query CategoryItem($itemCategoryId: String!) {\n    itemCategory(id: $itemCategoryId) {\n      Item {\n        id\n      }\n      createdAt\n      id\n      name\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ItemCategories($paginationArgs: PaginationArgs) {\n    itemCategories(paginationArgs: $paginationArgs) {\n      total\n      itemCategories {\n        createdAt\n        id\n        name\n        parentCategory {\n          id\n        }\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query ItemCategories($paginationArgs: PaginationArgs) {\n    itemCategories(paginationArgs: $paginationArgs) {\n      total\n      itemCategories {\n        createdAt\n        id\n        name\n        parentCategory {\n          id\n        }\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateItemCategory(\n    $updateItemCategoryInput: UpdateItemCategoryInput!\n  ) {\n    updateItemCategory(updateItemCategoryInput: $updateItemCategoryInput) {\n      Item {\n        id\n      }\n      createdAt\n      id\n      name\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateItemCategory(\n    $updateItemCategoryInput: UpdateItemCategoryInput!\n  ) {\n    updateItemCategory(updateItemCategoryInput: $updateItemCategoryInput) {\n      Item {\n        id\n      }\n      createdAt\n      id\n      name\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrganization(\n    $createOrganizationInput: CreateOrganizationInput!\n  ) {\n    createOrganization(createOrganizationInput: $createOrganizationInput) {\n      active\n      address\n      city\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n      contact\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrganization(\n    $createOrganizationInput: CreateOrganizationInput!\n  ) {\n    createOrganization(createOrganizationInput: $createOrganizationInput) {\n      active\n      address\n      city\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n      contact\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteOrganization(\n    $deleteOrganizationInput: DeleteOrganizationInput!\n  ) {\n    deleteOrganization(deleteOrganizationInput: $deleteOrganizationInput) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteOrganization(\n    $deleteOrganizationInput: DeleteOrganizationInput!\n  ) {\n    deleteOrganization(deleteOrganizationInput: $deleteOrganizationInput) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query($organizationId: String!) {\n    organization(id: $organizationId) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Query($organizationId: String!) {\n    organization(id: $organizationId) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrganization(\n    $updateOrganizationInput: UpdateOrganizationInput!\n  ) {\n    updateOrganization(updateOrganizationInput: $updateOrganizationInput) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrganization(\n    $updateOrganizationInput: UpdateOrganizationInput!\n  ) {\n    updateOrganization(updateOrganizationInput: $updateOrganizationInput) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePharmacy($createPharmacyInput: CreatePharmacyInput!) {\n    createPharmacy(createPharmacyInput: $createPharmacyInput) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePharmacy($createPharmacyInput: CreatePharmacyInput!) {\n    createPharmacy(createPharmacyInput: $createPharmacyInput) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePharmacy($deletePharmacyInput: DeletePharmacyInput!) {\n    deletePharmacy(deletePharmacyInput: $deletePharmacyInput) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePharmacy($deletePharmacyInput: DeletePharmacyInput!) {\n    deletePharmacy(deletePharmacyInput: $deletePharmacyInput) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Pharmacy($pharmacyId: String!) {\n    pharmacy(id: $pharmacyId) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      organization {\n        active\n        address\n        city\n        contact\n        country\n        createdAt\n        description\n        id\n        name\n        updatedAt\n      }\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Pharmacy($pharmacyId: String!) {\n    pharmacy(id: $pharmacyId) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      organization {\n        active\n        address\n        city\n        contact\n        country\n        createdAt\n        description\n        id\n        name\n        updatedAt\n      }\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Pharmacies($paginationArgs: PaginationArgs) {\n    pharmacies(paginationArgs: $paginationArgs) {\n      pharmacies {\n        contactInfo\n        createdAt\n        id\n        location\n        name\n        organization {\n          id\n          name\n        }\n        updatedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Pharmacies($paginationArgs: PaginationArgs) {\n    pharmacies(paginationArgs: $paginationArgs) {\n      pharmacies {\n        contactInfo\n        createdAt\n        id\n        location\n        name\n        organization {\n          id\n          name\n        }\n        updatedAt\n      }\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePharmacy($updatePharmacyInput: UpdatePharmacyInput!) {\n    updatePharmacy(updatePharmacyInput: $updatePharmacyInput) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePharmacy($updatePharmacyInput: UpdatePharmacyInput!) {\n    updatePharmacy(updatePharmacyInput: $updatePharmacyInput) {\n      contactInfo\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Mutation($tokenConfirmationInput: TokenConfirmationInput!) {\n    tokenConfirmation(tokenConfirmationInput: $tokenConfirmationInput) {\n      access_token\n      user {\n        createdAt\n        email\n        emailConfirmationToken\n        id\n        isEmailConfirmed\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation($tokenConfirmationInput: TokenConfirmationInput!) {\n    tokenConfirmation(tokenConfirmationInput: $tokenConfirmationInput) {\n      access_token\n      user {\n        createdAt\n        email\n        emailConfirmationToken\n        id\n        isEmailConfirmed\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateWarehouse($createWarehouseInput: CreateWarehouseInput!) {\n    createWarehouse(createWarehouseInput: $createWarehouseInput) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n      organization {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWarehouse($createWarehouseInput: CreateWarehouseInput!) {\n    createWarehouse(createWarehouseInput: $createWarehouseInput) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n      organization {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteWarehouse($deleteWarehouseInput: DeleteWarehouseInput!) {\n    deleteWarehouse(deleteWarehouseInput: $deleteWarehouseInput) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteWarehouse($deleteWarehouseInput: DeleteWarehouseInput!) {\n    deleteWarehouse(deleteWarehouseInput: $deleteWarehouseInput) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WarehouseDetails($warehouseId: String!) {\n    warehouse(id: $warehouseId) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n      organization {\n        name\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query WarehouseDetails($warehouseId: String!) {\n    warehouse(id: $warehouseId) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n      organization {\n        name\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WarehouseList {\n    warehouses {\n      total\n      warehouses {\n        area\n        createdAt\n        id\n        location\n        updatedAt\n        name\n        organization {\n          name\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query WarehouseList {\n    warehouses {\n      total\n      warehouses {\n        area\n        createdAt\n        id\n        location\n        updatedAt\n        name\n        organization {\n          name\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateWarehouseMutation(\n    $updateWarehouseInput: UpdateWarehouseInput!\n  ) {\n    updateWarehouse(updateWarehouseInput: $updateWarehouseInput) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n      organization {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateWarehouseMutation(\n    $updateWarehouseInput: UpdateWarehouseInput!\n  ) {\n    updateWarehouse(updateWarehouseInput: $updateWarehouseInput) {\n      area\n      createdAt\n      id\n      location\n      updatedAt\n      name\n      organization {\n        id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;