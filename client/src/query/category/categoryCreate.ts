import { gql } from "@apollo/client";

export const CreateCategory = gql`
  mutation CreateItemCategory(
    $createItemCategoryInput: CreateItemCategoryInput!
  ) {
    createItemCategory(createItemCategoryInput: $createItemCategoryInput) {
      createdAt
      id
      name
      updatedAt
      Item {
        id
      }
    }
  }
`;
