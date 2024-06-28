import { gql } from "@apollo/client";

export const ORGANIZATIONS_LIST_QUERY = gql`
  query OrganizationsList($paginationArgs: PaginationArgs) {
    organizations(paginationArgs: $paginationArgs) {
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
  }
`;
