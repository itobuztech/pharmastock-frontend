import { gql } from "@apollo/client";

export const CreateUser = gql`
  mutation Create($createUserInput: CreateUserInput!) {
    create(createUserInput: $createUserInput) {
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
`;
