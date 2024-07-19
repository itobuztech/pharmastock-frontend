import { gql } from "@apollo/client";

export const GetUserDetails = gql`
  query User($email: String!) {
    user(email: $email) {
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
`;
