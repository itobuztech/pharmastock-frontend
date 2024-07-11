import { gql } from "@apollo/client";

export const DeleteWarehouse = gql`
  mutation DeleteWarehouse($deleteWarehouseInput: DeleteWarehouseInput!) {
    deleteWarehouse(deleteWarehouseInput: $deleteWarehouseInput) {
      area
      createdAt
      id
      location
      updatedAt
    }
  }
`;
