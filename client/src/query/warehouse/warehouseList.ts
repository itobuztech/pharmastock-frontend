import { gql } from "@apollo/client";

export const GetWarehouseList = gql`
  query WarehouseList(
    $pagination: Boolean
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    warehouses(
      pagination: $pagination
      paginationArgs: $paginationArgs
      searchText: $searchText
    ) {
      total
      warehouses {
        area
        createdAt
        id
        location
        updatedAt
        name
        organization {
          name
          id
        }
      }
    }
  }
`;
