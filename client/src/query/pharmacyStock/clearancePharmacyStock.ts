import { gql } from "@apollo/client";

export const GetClearancePharmacyStock = gql`
  mutation ClearancePharmacyStock(
    $clearancePharmacyStockInput: [ClearancePharmacyStockInput!]!
    $pharmacyId: String!
  ) {
    clearancePharmacyStock(
      clearancePharmacyStockInput: $clearancePharmacyStockInput
      pharmacyId: $pharmacyId
    ) {
      id
    }
  }
`;
