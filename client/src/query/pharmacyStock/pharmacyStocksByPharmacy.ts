import { gql } from "@apollo/client";

export const GetPharmacyStocksByPharmacy = gql`
  query PharmacyStocksByPharmacy(
    $pharmacyId: String!
    $paginationArgs: PaginationArgs
  ) {
    pharmacyStocksByPharmacy(
      pharmacyId: $pharmacyId
      paginationArgs: $paginationArgs
    ) {
      pharmacyStocks {
        createdAt
        finalQty
        id
        item {
          id
          name
        }
        pharmacy {
          id
          name
        }
        totalMrpBaseUnit
        totalWholesalePrice
        updatedAt
      }
      total
    }
  }
`;
