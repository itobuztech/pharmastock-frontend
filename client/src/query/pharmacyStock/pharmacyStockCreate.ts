import { gql } from "@apollo/client";

export const PharmacyStockCreate = gql`
  mutation CreatePharmacyStock(
    $createPharmacyStockInput: CreatePharmacyStockInput!
  ) {
    createPharmacyStock(createPharmacyStockInput: $createPharmacyStockInput) {
      createdAt
      finalQty
      id
      itemId
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
