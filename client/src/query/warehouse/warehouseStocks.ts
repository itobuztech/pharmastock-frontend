import { gql } from "@apollo/client";

export const GetWarehouseStocks = gql`
  query WarehouseStocks($paginationArgs: PaginationArgs) {
    warehouseStocks(paginationArgs: $paginationArgs) {
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
