import { gql } from "@apollo/client";

export const GetWarehouseList = gql`
  query WarehouseList($paginationArgs: PaginationArgs) {
    warehouses(paginationArgs: $paginationArgs) {
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
