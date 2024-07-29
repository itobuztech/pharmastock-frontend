import { gql } from "@apollo/client";

export const PharmacyStocksList = gql`
  query PharmacyStocks(
    $pagination: Boolean
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    PharmacyStocks(
      pagination: $pagination
      paginationArgs: $paginationArgs
      searchText: $searchText
    ) {
      pharmacyStocks {
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
      total
    }
  }
`;
