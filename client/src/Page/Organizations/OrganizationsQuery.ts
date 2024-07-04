import { gql } from "@apollo/client";

export const ORGANIZATIONS_LIST_QUERY = gql`
  query Organizations($paginationArgs: PaginationArgs) {
    organizations(paginationArgs: $paginationArgs) {
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
