import { gql } from "@apollo/client";

export const GetWarehouseStockQty = gql`
  query MaxWarehouseStockQty {
    maxWarehouseStockQty {
      totalQty
    }
  }
`;
