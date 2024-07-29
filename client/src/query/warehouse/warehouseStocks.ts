import { gql } from "@apollo/client";

export const GetWarehouseStocks = gql`
  query WarehouseStocks(
    $pagination: Boolean
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    warehouseStocks(
      pagination: $pagination
      paginationArgs: $paginationArgs
      searchText: $searchText
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
