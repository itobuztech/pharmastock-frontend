import { gql } from "@apollo/client";

export const ForgotPasswordVerify = gql`
  mutation ValidateForgotPassword(
    $forgotPasswordInput: ForgotPasswordConfirmationInput!
  ) {
    validateForgotPassword(forgotPasswordInput: $forgotPasswordInput) {
      message
    }
  }
`;
