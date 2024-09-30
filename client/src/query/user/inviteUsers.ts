import { gql } from "@apollo/client";

export const InviteUsers = gql`
mutation InviteUsers($inviteUsersInput: InviteUsersInput!) {
  inviteUsers(inviteUsersInput: $inviteUsersInput)
}
`;
