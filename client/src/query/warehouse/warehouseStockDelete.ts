import { gql } from "@apollo/client";

export const WarehouseStockDelete = gql`
  mutation DeleteWarehouseStock(
    $deleteWarehouseStockInput: DeleteWarehouseStockInput!
  ) {
    deleteWarehouseStock(
      deleteWarehouseStockInput: $deleteWarehouseStockInput
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
