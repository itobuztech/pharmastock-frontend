import { gql } from "@apollo/client";

export const GetUser = gql`
  query Account {
    account {
      role
      user {
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
        role {
          id
          name
          userType
        }
        updatedAt
        username
      }
    }
  }
`;
