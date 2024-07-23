import { gql } from "@apollo/client";

export const PharmacyStocksList = gql`
  query PharmacyStocks {
    PharmacyStocks {
      pharmacyStocks {
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
      total
    }
  }
`;
