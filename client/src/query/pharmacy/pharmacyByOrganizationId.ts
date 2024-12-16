import { graphql } from "gql";

export const PharmaciesByOrganizationQuery = graphql(`
  query PharmaciesByOrganization($organizationId: String!) {
  pharmaciesByOrganization(organizationId: $organizationId) {
    id
    name
  }
}
`);
