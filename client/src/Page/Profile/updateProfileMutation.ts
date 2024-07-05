import { gql } from "@apollo/client";

export const PROFILE_UPDATE = gql`
  mutation Updateprofile($updateProfileInput: UpdateProfileInput!) {
    updateprofile(updateProfileInput: $updateProfileInput)
  }
`;
