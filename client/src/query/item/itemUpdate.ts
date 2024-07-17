import { gql } from "@apollo/client";

export const GetItemUpdate = gql`
  mutation UpdateItem($updateItemInput: UpdateItemInput!) {
    updateItem(updateItemInput: $updateItemInput) {
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
