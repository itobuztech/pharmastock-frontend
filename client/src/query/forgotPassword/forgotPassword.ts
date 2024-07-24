import { gql } from "@apollo/client";

export const ForgotPassword = gql`
  mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
    forgotPassword(forgotPasswordInput: $forgotPasswordInput) {
      token
    }
  }
`;
