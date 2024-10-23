import { gql } from "@apollo/client";

export const PharmacyStocksList = gql`
  query PharmacyStocks(
    $filterArgs: FilterPharmacyStockInputs
    $pagination: Boolean
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    PharmacyStocks(
      filterArgs: $filterArgs
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
      }
      total
    }
  }
`;
