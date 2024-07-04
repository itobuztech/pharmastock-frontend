import { gql } from "@apollo/client";

export const CREATE_PHARMACY = gql`
  mutation CreatePharmacy($createPharmacyInput: CreatePharmacyInput!) {
    createPharmacy(createPharmacyInput: $createPharmacyInput) {
      contact_info
      createdAt
      id
      location
      name
      organizationId
      updatedAt
    }
  }
`;
