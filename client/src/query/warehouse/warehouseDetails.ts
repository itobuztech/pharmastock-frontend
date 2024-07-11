import { gql } from "@apollo/client";

export const GetWarehouseDetails = gql`
  query WarehouseDetails($warehouseId: String!) {
    warehouse(id: $warehouseId) {
      area
      createdAt
      id
      location
      updatedAt
    }
  }
`;
