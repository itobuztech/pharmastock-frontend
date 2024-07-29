import { gql } from "@apollo/client";

export const GetItemCategoryList = gql`
  query ItemCategories(
    $pagination: Boolean
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    itemCategories(
      pagination: $pagination
      paginationArgs: $paginationArgs
      searchText: $searchText
    ) {
      total
      itemCategories {
        createdAt
        id
        name
        parentCategory {
          id
        }
        updatedAt
        Item {
          id
        }
      }
    }
  }
`;
