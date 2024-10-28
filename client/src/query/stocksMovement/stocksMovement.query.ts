import { gql } from "@apollo/client";

export const stockMovementsLot = gql`
query StockMovementsLot($paginationArgs: PaginationArgs, $searchText: String, $filterArgs: FilterStockMovementsInputs) {
  stockMovementsLot(paginationArgs: $paginationArgs, searchText: $searchText, filterArgs: $filterArgs) {
    total
    stockMovementsLot {
      batchName
      createdAt
      expiry
      id
      item
      lotName
      organisation
      qty
      totalLotItemsQty
      transactionType
      warehouse
      updatedAt
    }
  }
}
`;
