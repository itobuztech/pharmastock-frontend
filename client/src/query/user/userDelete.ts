import { gql } from "@apollo/client";

export const DeleteUserBySuperAdmin = gql`
  mutation DeleteUserBySuperAdmin($deleteUserInput: DeleteUserInput!) {
    deleteUserBySuperAdmin(deleteUserInput: $deleteUserInput) {
      message
    }
  }
`;
