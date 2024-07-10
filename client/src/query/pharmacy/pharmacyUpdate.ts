import { gql } from "@apollo/client";

export const GetUpdatePharmacy = gql`
  mutation UpdatePharmacy($updatePharmacyInput: UpdatePharmacyInput!) {
    updatePharmacy(updatePharmacyInput: $updatePharmacyInput) {
      contactInfo
      createdAt
      id
      location
      name
      updatedAt
    }
  }
`;
