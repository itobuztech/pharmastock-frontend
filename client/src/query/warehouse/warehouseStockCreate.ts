import { gql } from "@apollo/client";

export const WarehouseStockCreate = gql`
  mutation WarehouseStockCreate(
    $createWarehouseStockInput: CreateWarehouseStockInput!
  ) {
    createWarehouseStock(
      createWarehouseStockInput: $createWarehouseStockInput
    ) {
      SKU {
        id
        sku
      }
      createdAt
      finalQty
      id
      item {
        id
        name
      }
      totalMrpBaseUnit
      totalWholesalePrice
      updatedAt
      warehouse {
        id
        name
      }
    }
  }
`;
