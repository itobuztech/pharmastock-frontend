import { gql } from "@apollo/client";

export const GetItemCategoryList = gql`
  query ItemCategories($paginationArgs: PaginationArgs) {
    itemCategories(paginationArgs: $paginationArgs) {
      total
      itemCategories {
        createdAt
        id
        name
        parentCategory {
          id
        }
        updatedAt
      }
    }
  }
`;
