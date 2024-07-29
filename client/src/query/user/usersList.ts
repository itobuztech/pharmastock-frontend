import { gql } from "@apollo/client";

export const GetUsersList = gql`
  query Users(
    $pagination: Boolean
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    users(
      pagination: $pagination
      paginationArgs: $paginationArgs
      searchText: $searchText
    ) {
      total
      users {
        createdAt
        email
        emailConfirmationToken
        id
        isEmailConfirmed
        name
        organization {
          id
          name
        }
        updatedAt
        username
        role {
          id
          name
          userType
        }
      }
    }
  }
`;
