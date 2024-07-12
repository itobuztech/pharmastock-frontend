import { gql } from "@apollo/client";

export const GetWarehouseUpdate = gql`
  mutation WarehouseUpdate($updateWarehouseInput: UpdateWarehouseInput!) {
    updateWarehouse(updateWarehouseInput: $updateWarehouseInput) {
      area
      createdAt
      id
      location
      updatedAt
    }
  }
`;
