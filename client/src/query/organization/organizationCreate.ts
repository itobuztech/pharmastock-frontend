import { gql } from "@apollo/client";
export const CreateOrganization = gql`
mutation CreateOrganization($createOrganizationInput: CreateOrganizationInput!) {
  createOrganization(createOrganizationInput: $createOrganizationInput) {
    active
    address
    city
    contact
    country
    createdAt
    description
    id
    name
    status
    updatedAt
  }
}
`;
