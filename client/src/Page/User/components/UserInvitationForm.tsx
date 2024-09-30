import { useForm } from "react-hook-form";
import { Button, Select, TextInput } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";

import useUserInvitation from "../Hooks/useUserInvitation";
import useOrganizationList from "Lib/customHooks/useOrganizationList";
import { UserRole } from "interfaces/interfaces";

export default function UserInvitationForm({
    closeModal,
    refetch
}: {
    closeModal: () => void;
    refetch: () => void;
}) {
  const { onSubmit, userInvitationSchema, loadingStateForInvite } = useUserInvitation({
    closeModal: closeModal,
    refetch: refetch
  });
  const selectOrgItem = useOrganizationList();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userInvitationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <TextInput
          label="Email"
          placeholder="Email"
          {...register("email")}
          error={errors.email && "This field is required"}
        />
      </div>

      <div className="mb-4">
        <Select
          label="Organization"
          {...register("organizationId")}
          placeholder="Select Organization"
          data={selectOrgItem}
          maxDropdownHeight={250}
          withAsterisk
          onChange={(value) => {
            if (value) {
              setValue("organizationId", value);
            }
          }}
          error={errors.organizationId && "This field is required"}
        />
      </div>
      <Select
        label="Role"
        {...register("role")}
        placeholder="Select Role"
        className='capitalize'
        data={[
          { value: UserRole.Admin, label: 'Admin' },
          { value: UserRole.Staff, label: 'Staff' },
        ]}
        maxDropdownHeight={250}
        withAsterisk
        onChange={(value) => {
          if (value) {
            setValue("role", value);
          }
        }}
        error={errors.role && "This field is required"}
      />
      <Button loading={loadingStateForInvite} mt='lg' mb='sm' type="submit">Send Invitation</Button>
    </form>
  );
}
