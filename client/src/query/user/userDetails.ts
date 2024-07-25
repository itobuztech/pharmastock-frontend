import { gql } from "@apollo/client";

export const GetUserDetails = gql`
  query UserById($userByIdId: String!) {
    userById(id: $userByIdId) {
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
    }
  }
`;
