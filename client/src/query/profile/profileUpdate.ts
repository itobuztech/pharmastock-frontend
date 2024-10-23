import { gql } from "@apollo/client";

export const GetProfileUpdate = gql`
mutation Updateprofile($updateProfileInput: UpdateProfileInput!) {
  updateprofile(updateProfileInput: $updateProfileInput)
}
`;
