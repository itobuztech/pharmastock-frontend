import { gql } from "@apollo/client";

export const GetUsersList = gql`
  query Users($paginationArgs: PaginationArgs) {
    users(paginationArgs: $paginationArgs) {
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
      }
    }
  }
`;
