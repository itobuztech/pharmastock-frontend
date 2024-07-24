import { gql } from "@apollo/client";

export const PharmacyStocksList = gql`
  query PharmacyStocks($paginationArgs: PaginationArgs) {
    PharmacyStocks(paginationArgs: $paginationArgs) {
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
