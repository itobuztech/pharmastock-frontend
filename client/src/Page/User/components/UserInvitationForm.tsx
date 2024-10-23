import { Controller, useForm } from "react-hook-form";
import { Button, Select, TextInput } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import useUserInvitation from "../Hooks/useUserInvitation";
import useOrganizationList from "Lib/customHooks/useOrganizationList";
import { UserRole } from "interfaces/interfaces";
import usePharmacyList from "Lib/customHooks/usePharmacyLists";

export default function UserInvitationForm({
  closeModal,
  refetch,
}: {
  closeModal: () => void;
  refetch: () => void;
}) {
  const { onSubmit, userInvitationSchema, loadingStateForInvite } =
    useUserInvitation({
      closeModal: closeModal,
      refetch: refetch,
    });
  const selectOrgItem = useOrganizationList();
  const selectPharmacyList = usePharmacyList();

  const [isStaff, setIsStaff] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userInvitationSchema),
    context: { isStaff },
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
      <div className="mb-4">
        <Select
          label="Role"
          {...register("role")}
          placeholder="Select Role"
          className="capitalize"
          data={[
            { value: UserRole.Admin, label: "Admin" },
            { value: UserRole.Staff, label: "Staff" },
          ]}
          maxDropdownHeight={250}
          withAsterisk
          onChange={(value) => {
            if (value) {
              setValue("role", value);
              setIsStaff(value === UserRole.Staff ? true : false);
            }
          }}
          error={errors.role && "This field is required"}
        />
      </div>

      {isStaff && (
        <div className="mb-4">
          <Controller
            name="pharmacyId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                withAsterisk
                data={selectPharmacyList}
                label="Select Pharmacy"
                placeholder="Select Pharmacy"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                error={errors.pharmacyId && "This field is required"}
              />
            )}
          />
        </div>
      )}
      <Button loading={loadingStateForInvite} mt="lg" mb="sm" type="submit">
        Send Invitation
      </Button>
    </form>
  );
}
