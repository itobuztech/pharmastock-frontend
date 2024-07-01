import { gql } from "@apollo/client";

export const GET_USER = gql`
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
        updatedAt
        username
      }
    }
  }
`;
