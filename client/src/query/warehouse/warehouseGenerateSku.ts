import { gql } from "@apollo/client";

export const GetGenerateSKU = gql`
  mutation GenerateSKU($generateSkuNameInput: CreateSkuNameInput!) {
    generateSKU(generateSkuNameInput: $generateSkuNameInput) {
      sku
    }
  }
`;
