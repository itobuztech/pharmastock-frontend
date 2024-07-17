import { gql } from "@apollo/client";

export const PharmacyCreate = gql`
  mutation CreatePharmacy($createPharmacyInput: CreatePharmacyInput!) {
    createPharmacy(createPharmacyInput: $createPharmacyInput) {
      contactInfo
      createdAt
      id
      location
      name
      updatedAt
    }
  }
`;
