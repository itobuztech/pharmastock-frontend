import { gql } from "@apollo/client";

export const GetWarehouseStocks = gql`
  query WarehouseStocks(
    $filterArgs: FilterWarehouseStockInputs
    $pagination: Boolean
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    warehouseStocks(
      filterArgs: $filterArgs
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
