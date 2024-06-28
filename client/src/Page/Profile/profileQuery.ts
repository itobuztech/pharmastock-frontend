import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
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
`;
