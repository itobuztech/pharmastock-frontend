import { gql } from "@apollo/client";

export const PharmacyStockCreate = gql`
  mutation CreatePharmacyStock(
    $createPharmacyStockInput: CreatePharmacyStockInput!
  ) {
    createPharmacyStock(createPharmacyStockInput: $createPharmacyStockInput) {
      createdAt
      finalQty
      id
      item {
        id
        name
      }
      pharmacy {
        id
        name
      }
      updatedAt
      warehouse {
        id
        name
      }
    }
  }
`;
