import { gql } from "@apollo/client";

export const DeletePharmacy = gql`
  mutation DeletePharmacy($deletePharmacyInput: DeletePharmacyInput!) {
    deletePharmacy(deletePharmacyInput: $deletePharmacyInput) {
      contactInfo
      createdAt
      id
      location
      name
      updatedAt
    }
  }
`;
