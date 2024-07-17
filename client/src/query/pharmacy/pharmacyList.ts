import { gql } from "@apollo/client";

export const GetPharmacyList = gql`
  query Pharmacies($paginationArgs: PaginationArgs) {
    pharmacies(paginationArgs: $paginationArgs) {
      pharmacies {
        contactInfo
        createdAt
        id
        location
        name
        organization {
          id
          name
        }
        updatedAt
      }
      total
    }
  }
`;
