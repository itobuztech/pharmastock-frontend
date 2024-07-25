import { gql } from "@apollo/client";

export const GetUsersList = gql`
  query Users {
    users {
      total
      users {
        createdAt
        email
        emailConfirmationToken
        id
        isEmailConfirmed
        name
        organization {
          id
          name
        }
        updatedAt
        username
        role {
          id
          name
          userType
        }
      }
    }
  }
`;
