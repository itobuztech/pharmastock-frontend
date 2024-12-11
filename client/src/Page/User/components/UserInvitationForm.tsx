import { Controller, useForm } from "react-hook-form";
import { Button, Select, TextInput } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import useUserInvitation from "../Hooks/useUserInvitation";
import { UserRole } from "interfaces/interfaces";
import ErrorMessage from "Components/Messeges/ErrorMessage";
import messagesData from "Lib/messages";
import useOrganizationList from "Lib/customHooks/useOrganizationList";
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
        <TextInput withAsterisk label="Email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <ErrorMessage message={messagesData.register.email.required} />
        )}
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
        />
        {errors.organizationId && (
          <ErrorMessage
            message={messagesData.register.organizationId.required}
          />
        )}
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
              setValue('pharmacyId', '');
            }
          }}
        />
        {errors.role && (
          <ErrorMessage message={messagesData.register.role.required} />
        )}
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
                  setValue('pharmacyId', String(value))
                }}
              />
            )}
          />
          {errors.pharmacyId && (
            <ErrorMessage message={messagesData.register.pharmacy.required} />
          )}
        </div>
      )}
      <Button loading={loadingStateForInvite} mt="lg" mb="sm" type="submit">
        Send Invitation
      </Button>
    </form>
  );
}
