import { gql } from "@apollo/client";

export const GetPharmacyStockDetails = gql`
  query PharmacyStock($pharmacyStockId: String!) {
    PharmacyStock(id: $pharmacyStockId) {
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
