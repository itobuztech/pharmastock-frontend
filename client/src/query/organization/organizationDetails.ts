import { gql } from "@apollo/client";

export const GetOrganizationDetails = gql`
  query Query($organizationId: String!) {
    organization(id: $organizationId) {
      active
      address
      city
      contact
      country
      createdAt
      description
      id
      name
      updatedAt
      User {
        email
        role {
          name
          userType
        }
      }
    }
  }
`;
