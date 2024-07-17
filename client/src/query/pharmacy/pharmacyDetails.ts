import { gql } from "@apollo/client";

export const GetPharmacyDetails = gql`
  query Pharmacy($pharmacyId: String!) {
    pharmacy(id: $pharmacyId) {
      contactInfo
      createdAt
      id
      location
      name
      organization {
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
      updatedAt
    }
  }
`;
