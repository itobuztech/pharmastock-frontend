import { gql } from "@apollo/client";

export const GetConfirmToken = gql`
  mutation Mutation($tokenConfirmationInput: TokenConfirmationInput!) {
    tokenConfirmation(tokenConfirmationInput: $tokenConfirmationInput) {
      access_token
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
