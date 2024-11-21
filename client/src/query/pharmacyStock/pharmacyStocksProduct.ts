import { gql } from "@apollo/client";

export const PharmacyStocksProduct = gql`
  query PharmacyStocksItems(
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    pharmacyStocksItems(
      paginationArgs: $paginationArgs
      searchText: $searchText
    ) {
      items {
        id
        name
      }
      total
    }
  }
`;
