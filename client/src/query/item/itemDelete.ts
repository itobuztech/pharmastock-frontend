import { gql } from "@apollo/client";

export const ItemDelete = gql`
  mutation ItemDelete($deleteItemInput: DeleteItemInput!) {
    deleteItem(deleteItemInput: $deleteItemInput) {
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
    }
  }
`;
