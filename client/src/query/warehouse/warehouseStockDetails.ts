import { gql } from "@apollo/client";

export const GetWarehouseStockDetails = gql`
  query WarehouseStockDetails($warehouseStockId: String!) {
    warehouseStock(id: $warehouseStockId) {
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
        organization {
          id
          name
        }
      }
    }
  }
`;
