import { gql } from "@apollo/client";

export const GetPharmacyList = gql`
  query Pharmacies(
    $pagination: Boolean
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    pharmacies(
      pagination: $pagination
      paginationArgs: $paginationArgs
      searchText: $searchText
    ) {
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
