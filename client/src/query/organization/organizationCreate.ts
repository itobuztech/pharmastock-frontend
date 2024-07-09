import { gql } from "@apollo/client";
export const CreateOrganization = gql`
  mutation CreateOrganization(
    $createOrganizationInput: CreateOrganizationInput!
  ) {
    createOrganization(createOrganizationInput: $createOrganizationInput) {
      active
      address
      city
      country
      createdAt
      description
      id
      name
      updatedAt
      contact
    }
  }
`;
