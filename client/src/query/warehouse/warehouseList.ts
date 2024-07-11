import { gql } from "@apollo/client";

export const GetWarehouseList = gql`
  query WarehouseList {
    warehouses {
      total
      warehouses {
        area
        createdAt
        id
        location
        updatedAt
        organization {
          name
          id
        }
      }
    }
  }
`;
