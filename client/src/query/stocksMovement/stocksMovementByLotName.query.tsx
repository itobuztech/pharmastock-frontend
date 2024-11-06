import { gql } from "@apollo/client";

export const stockMovementsByLotName = gql`
query StockMovementsByLotName($lotStockMovementsInput: LotStockMovementsInput!, $paginationArgs: PaginationArgs, $searchText: String) {
  stockMovementsByLotName(lotStockMovementsInput: $lotStockMovementsInput, paginationArgs: $paginationArgs, searchText: $searchText) {
    stockMovementsByLotName {
      batchName
      createdAt
      expiry
      id
      item
      lotName
      organisation
      pharmacy
      pharmacyClearance
      qty
      transactionType
      updatedAt
      warehouse
    }
    total
  }
}
`;
