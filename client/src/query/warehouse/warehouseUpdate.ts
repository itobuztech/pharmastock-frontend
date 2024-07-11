import { gql } from "@apollo/client";

export const GetWarehouseUpdate = gql`
  mutation Mutation($updateWarehouseInput: UpdateWarehouseInput!) {
    updateWarehouse(updateWarehouseInput: $updateWarehouseInput) {
      area
      createdAt
      id
      location
      updatedAt
    }
  }
`;
