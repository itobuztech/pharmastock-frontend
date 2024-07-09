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
    "\nmutation CreateItemCategory($createItemCategoryInput: CreateItemCategoryInput!) {\n  createItemCategory(createItemCategoryInput: $createItemCategoryInput) {\n    id\n    name\n    createdAt\n    Item {\n      id\n      sku\n      Category {\n        name\n        id\n      }\n    }\n  }\n }\n": types.CreateItemCategoryDocument,
    "\n  query Organizations($paginationArgs: PaginationArgs) {\n    organizations(paginationArgs: $paginationArgs) {\n      organizations {\n        active\n        address\n        city\n        country\n        createdAt\n        description\n        id\n        name\n        updatedAt\n      }\n      total\n    }\n  }\n": types.OrganizationsDocument,
    "\n  mutation CreatePharmacy($createPharmacyInput: CreatePharmacyInput!) {\n    createPharmacy(createPharmacyInput: $createPharmacyInput) {\n      contact_info\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n": types.CreatePharmacyDocument,
    "\n  query Account {\n    account {\n      role\n      user {\n        createdAt\n        email\n        emailConfirmationToken\n        id\n        isEmailConfirmed\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n": types.AccountDocument,
    "\n  mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {\n    resetPassword(resetPasswordInput: $resetPasswordInput)\n  }\n": types.ResetPasswordDocument,
    "\n  mutation Updateprofile($updateProfileInput: UpdateProfileInput!) {\n    updateprofile(updateProfileInput: $updateProfileInput)\n  }\n": types.UpdateprofileDocument,
    "\n  mutation Signup($signupUserInput: CreateUserInput!) {\n    signup(signupUserInput: $signupUserInput) {\n      success\n    }\n  }\n": types.SignupDocument,
    "\n  mutation CreateOrganization(\n    $createOrganizationInput: CreateOrganizationInput!\n  ) {\n    createOrganization(createOrganizationInput: $createOrganizationInput) {\n      active\n      address\n      city\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n      contact\n    }\n  }\n": types.CreateOrganizationDocument,
    "\n  mutation DeleteOrganization(\n    $deleteOrganizationInput: DeleteOrganizationInput!\n  ) {\n    deleteOrganization(deleteOrganizationInput: $deleteOrganizationInput) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n": types.DeleteOrganizationDocument,
    "\n  query Query($organizationId: String!) {\n    organization(id: $organizationId) {\n      active\n      address\n      city\n      contact\n      country\n      createdAt\n      description\n      id\n      name\n      updatedAt\n    }\n  }\n": types.QueryDocument,
    "\n  mutation Mutation($tokenConfirmationInput: TokenConfirmationInput!) {\n    tokenConfirmation(tokenConfirmationInput: $tokenConfirmationInput) {\n      access_token\n      user {\n        createdAt\n        email\n        emailConfirmationToken\n        id\n        isEmailConfirmed\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n": types.MutationDocument,
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
export function graphql(source: "\nmutation CreateItemCategory($createItemCategoryInput: CreateItemCategoryInput!) {\n  createItemCategory(createItemCategoryInput: $createItemCategoryInput) {\n    id\n    name\n    createdAt\n    Item {\n      id\n      sku\n      Category {\n        name\n        id\n      }\n    }\n  }\n }\n"): (typeof documents)["\nmutation CreateItemCategory($createItemCategoryInput: CreateItemCategoryInput!) {\n  createItemCategory(createItemCategoryInput: $createItemCategoryInput) {\n    id\n    name\n    createdAt\n    Item {\n      id\n      sku\n      Category {\n        name\n        id\n      }\n    }\n  }\n }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Organizations($paginationArgs: PaginationArgs) {\n    organizations(paginationArgs: $paginationArgs) {\n      organizations {\n        active\n        address\n        city\n        country\n        createdAt\n        description\n        id\n        name\n        updatedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Organizations($paginationArgs: PaginationArgs) {\n    organizations(paginationArgs: $paginationArgs) {\n      organizations {\n        active\n        address\n        city\n        country\n        createdAt\n        description\n        id\n        name\n        updatedAt\n      }\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePharmacy($createPharmacyInput: CreatePharmacyInput!) {\n    createPharmacy(createPharmacyInput: $createPharmacyInput) {\n      contact_info\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePharmacy($createPharmacyInput: CreatePharmacyInput!) {\n    createPharmacy(createPharmacyInput: $createPharmacyInput) {\n      contact_info\n      createdAt\n      id\n      location\n      name\n      updatedAt\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation Mutation($tokenConfirmationInput: TokenConfirmationInput!) {\n    tokenConfirmation(tokenConfirmationInput: $tokenConfirmationInput) {\n      access_token\n      user {\n        createdAt\n        email\n        emailConfirmationToken\n        id\n        isEmailConfirmed\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation($tokenConfirmationInput: TokenConfirmationInput!) {\n    tokenConfirmation(tokenConfirmationInput: $tokenConfirmationInput) {\n      access_token\n      user {\n        createdAt\n        email\n        emailConfirmationToken\n        id\n        isEmailConfirmed\n        name\n        updatedAt\n        username\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;