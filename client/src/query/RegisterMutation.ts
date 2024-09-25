import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation Signup($signUpStaffInput: SignUpStaffInput!) {
    signup(signUpStaffInput: $signUpStaffInput) {
      success
    }
  }
`;
