import { gql } from "@apollo/client";

export const GetProfileUpdate = gql`
  mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
    updateprofile(updateProfileInput: $updateProfileInput)
  }
`;
