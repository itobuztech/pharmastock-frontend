import { gql } from "@apollo/client";

export const GetItemLists = gql`
  query Items {
    items {
      items {
        baseUnit
        createdAt
        hsnCode
        id
        instructions
        mrpBaseUnit
        updatedAt
        wholesalePrice
        Category {
          id
          name
        }
      }
      total
    }
  }
`;
