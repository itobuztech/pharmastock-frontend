import { gql } from "@apollo/client";

export const GetWarehouseUpdate = gql`
  mutation UpdateWarehouseMutation(
    $updateWarehouseInput: UpdateWarehouseInput!
  ) {
    updateWarehouse(updateWarehouseInput: $updateWarehouseInput) {
      area
      createdAt
      id
      location
      updatedAt
      name
      organization {
        id
        name
      }
    }
  }
`;
