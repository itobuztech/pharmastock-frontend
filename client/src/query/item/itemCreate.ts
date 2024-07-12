import { gql } from "@apollo/client";

export const ItemCreate = gql`
  mutation ItemCreate($createItemInput: CreateItemInput!) {
    createItem(createItemInput: $createItemInput) {
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
