import { gql } from "@apollo/client";

export const CategoryItemDelete = gql`
  mutation DeleteItemCategory(
    $deleteItemCategoryInput: DeleteItemCategoryInput!
  ) {
    deleteItemCategory(deleteItemCategoryInput: $deleteItemCategoryInput) {
      createdAt
      id
      name
    }
  }
`;
