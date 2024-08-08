import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      access_token
      user {
        createdAt
        email
        id
        name
        updatedAt
        username
        organization {
          id
          name
        }
      }
    }
  }
`;
