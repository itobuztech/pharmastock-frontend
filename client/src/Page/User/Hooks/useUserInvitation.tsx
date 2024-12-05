import { useMutation } from "@apollo/client";
import { InviteUsers } from "query/user/inviteUsers";
import { toast } from "react-toastify";
import * as yup from "yup";

interface UserInvitationPayload {
  email: string;
  organizationId: string;
  role: string;
}

export default function useUserInvitation({
  closeModal,
  refetch,
}: {
  closeModal: () => void;
  refetch: () => void;
}) {
  const userInvitationSchema = yup.object().shape({
    email: yup.string().required().trim(),
    organizationId: yup.string().required(),
    role: yup.string().required(),
    pharmacyId: yup.string().when('$isStaff', {
      is: (isStaff: string | undefined) => isStaff,
      then: (schema) =>
        schema
          .required()
          .trim(),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const [inviteUser, { loading: loadingStateForInvite }] = useMutation(
    InviteUsers,
    {
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  const onSubmit = (data: UserInvitationPayload) => {
    inviteUser({
      variables: {
        inviteUsersInput: data,
      },
      onCompleted: (d) => {
        if (d) {
          toast.success('Invitation sent successfully');
          closeModal();
          refetch();
        }
      },
    });
  };
  return {
    onSubmit,
    userInvitationSchema,
    loadingStateForInvite,
  };
}
