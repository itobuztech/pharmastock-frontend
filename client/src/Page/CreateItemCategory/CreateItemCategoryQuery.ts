import { gql } from "@apollo/client";

export const CREATE_ITEM_CATEGORY = gql`
mutation CreateItemCategory($createItemCategoryInput: CreateItemCategoryInput!) {
  createItemCategory(createItemCategoryInput: $createItemCategoryInput) {
    id
    name
    createdAt
    Item {
      id
      sku
      Category {
        name
        id
      }
    }
  }
 }
`;
