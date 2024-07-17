import { gql } from "@apollo/client";

export const ItemCreate = gql`
  mutation CreateItem($createItemInput: CreateItemInput!) {
    createItem(createItemInput: $createItemInput) {
      Category {
        createdAt
        id
        name
        updatedAt
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
