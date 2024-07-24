import { gql } from "@apollo/client";

export const GetPharmacyStockDetails = gql`
  query PharmacyStock($pharmacyStockId: String!) {
    PharmacyStock(id: $pharmacyStockId) {
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
