import { gql } from "@apollo/client";

export const GetPharmacyStockQty = gql`
  query MaxPharmacyStockQty {
    maxPharmacyStockQty {
      totalQty
    }
  }
`;
