import { gql } from "@apollo/client";

export const GetCategoryItem = gql`
  query CategoryItem($itemCategoryId: String!) {
    itemCategory(id: $itemCategoryId) {
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
