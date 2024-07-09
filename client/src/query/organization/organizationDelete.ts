import { gql } from "@apollo/client";

export const DeleteOrganization = gql`
  mutation DeleteOrganization(
    $deleteOrganizationInput: DeleteOrganizationInput!
  ) {
    deleteOrganization(deleteOrganizationInput: $deleteOrganizationInput) {
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
    }
  }
`;
