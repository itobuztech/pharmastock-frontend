import { gql } from "@apollo/client";

export const GetItemMaxPrice = gql`
  query MaxPrice {
    maxPrice {
      mrpBaseUnit
      wholesalePrice
    }
  }
`;
