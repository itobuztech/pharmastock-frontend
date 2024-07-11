import { gql } from "@apollo/client";

export const ItemCategoryUpdate = gql`
  mutation UpdateItemCategory(
    $updateItemCategoryInput: UpdateItemCategoryInput!
  ) {
    updateItemCategory(updateItemCategoryInput: $updateItemCategoryInput) {
      Item {
        id
      }
      createdAt
      id
      name
      updatedAt
    }
  }
`;
