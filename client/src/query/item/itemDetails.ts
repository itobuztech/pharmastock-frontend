import { gql } from "@apollo/client";

export const GetItemDetails = gql`
  query Item($itemId: String!) {
    item(id: $itemId) {
      Category {
        id
        name
      }
      baseUnit
      createdAt
      hsnCode
      id
      instructions
      mrpBaseUnit
      updatedAt
      wholesalePrice
      name
    }
  }
`;
