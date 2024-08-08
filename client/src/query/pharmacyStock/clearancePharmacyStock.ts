import { gql } from "@apollo/client";

export const GetClearancePharmacyStock = gql`
  mutation ClearancePharmacyStock(
    $clearancePharmacyStockInput: [ClearancePharmacyStockInput!]!
  ) {
    clearancePharmacyStock(
      clearancePharmacyStockInput: $clearancePharmacyStockInput
    ) {
      createdAt
      id
      item {
        id
        name
      }
      pharmacyStock {
        id
        item {
          id
          name
        }
      }
      qty
      status
      updatedAt
    }
  }
`;
