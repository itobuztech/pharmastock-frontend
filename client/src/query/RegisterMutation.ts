import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation Signup($signupUserInput: CreateUserInput!) {
    signup(signupUserInput: $signupUserInput) {
      success
    }
  }
`;
