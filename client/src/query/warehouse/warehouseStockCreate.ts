import { gql } from "@apollo/client";

export const WarehouseStockCreate = gql`
  mutation WarehouseStockCreate($createWarehouseStockInput: [CreateWarehouseStockInput!]!) {
  createWarehouseStock(createWarehouseStockInput: $createWarehouseStockInput)
}
`;
