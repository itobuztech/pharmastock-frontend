import { gql } from "@apollo/client";

export const UpdateOrganization = gql`
  mutation UpdateOrganization(
    $updateOrganizationInput: UpdateOrganizationInput!
  ) {
    updateOrganization(updateOrganizationInput: $updateOrganizationInput) {
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
