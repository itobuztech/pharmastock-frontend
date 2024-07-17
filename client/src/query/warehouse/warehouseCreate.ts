import { gql } from "@apollo/client";

export const CreateWarehouse = gql`
  mutation CreateWarehouse($createWarehouseInput: CreateWarehouseInput!) {
    createWarehouse(createWarehouseInput: $createWarehouseInput) {
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
