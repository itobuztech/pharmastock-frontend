import { gql } from "@apollo/client";

export const ORGANIZATIONS_LIST_QUERY = gql`
  query Organizations(
    $pagination: Boolean
    $paginationArgs: PaginationArgs
    $searchText: String
  ) {
    organizations(
      pagination: $pagination
      paginationArgs: $paginationArgs
      searchText: $searchText
    ) {
      organizations {
        active
        address
        city
        country
        createdAt
        description
        id
        name
        updatedAt
      }
      total
    }
  }
`;
