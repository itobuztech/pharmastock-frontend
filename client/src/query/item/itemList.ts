import { gql } from "@apollo/client";

export const GetItemLists = gql`
  query Items($paginationArgs: PaginationArgs) {
    items(paginationArgs: $paginationArgs) {
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
