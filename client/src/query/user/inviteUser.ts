import { gql } from "@apollo/client";

export const InviteUser = gql`
mutation InviteUsers($inviteUsersInput: InviteUsersInput!) {
  inviteUsers(inviteUsersInput: $inviteUsersInput)
}
`;
