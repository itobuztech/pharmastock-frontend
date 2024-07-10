import { gql } from "@apollo/client";

export const GetPharmacyList = gql`
  query Pharmacies {
    pharmacies {
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
