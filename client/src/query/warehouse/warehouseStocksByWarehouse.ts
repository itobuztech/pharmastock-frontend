import { gql } from "@apollo/client";

export const GetWarehouseStocksByWarehouse = gql`
  query WarehouseStocksByWarehouse(
    $warehouseId: String!
    $paginationArgs: PaginationArgs
  ) {
    warehouseStocksByWarehouse(
      warehouseId: $warehouseId
      paginationArgs: $paginationArgs
    ) {
      total
      warehouseStocks {
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
  }
`;
