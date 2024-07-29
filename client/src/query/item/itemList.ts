import { gql } from "@apollo/client";

export const GetItemLists = gql`
  query Items(
    $pagination: Boolean
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    items(
      pagination: $pagination
      paginationArgs: $paginationArgs
      searchText: $searchText
    ) {
      items {
        baseUnit
        createdAt
        hsnCode
        id
        instructions
        mrpBaseUnit
        updatedAt
        wholesalePrice
        name
        Category {
          id
          name
        }
      }
      total
    }
  }
`;
