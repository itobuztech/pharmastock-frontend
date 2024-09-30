import { gql } from "@apollo/client";

export const PharmacyStockCreate = gql`
mutation CreatePharmacyStock($createPharmacyStockInput: CreatePharmacyStockInput!) {
  createPharmacyStock(createPharmacyStockInput: $createPharmacyStockInput)
}
`;
