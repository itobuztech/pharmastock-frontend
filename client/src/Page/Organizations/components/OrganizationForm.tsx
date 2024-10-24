import { useMutation } from "@apollo/client";
import {
  Button,
  Select,
  Textarea,
  TextInput,
  Text,
  Divider,
  Title,
} from "@mantine/core";
import {
  createOrganizationInput,
  Permissions,
  UserRole,
} from "interfaces/interfaces";
import { CreateOrganization } from "query/organization/organizationCreate";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import countryList from "react-select-country-list";
import ButtonComponent from "Components/Button/ButtonComponent";
import { UpdateOrganization } from "query/organization/organizationUpdate";
import { Organization, UpdateOrganizationInput } from "gql/graphql";
import { useNavigate } from "react-router-dom";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import messagesData from "Lib/messages";

export default function OrganizationForm({
  close,
  editForm,
  setEditForm,
  orgId,
  orgDetails,
  setNewOrgList,
  refetchItem,
  handleUserPermissions,
}: Readonly<{
  close?: () => void;
  editForm?: boolean;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  orgId?: string;
  orgDetails?: {
    organization: Organization;
  };
  setNewOrgList?: React.Dispatch<
    React.SetStateAction<createOrganizationInput | undefined>
  >;
  refetchItem: () => void;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}>) {
  const options = useMemo(() => countryList().getData(), []);
  const navigate = useNavigate();
  const permission = useAppSelector((state) => state.user.permission);
  const schema = yup.object({
    name: yup
      .string()
      .required(messagesData.organization.name.required)
      .max(100, messagesData.organization.name.max)
      .trim(messagesData.organization.name.trim)
      .matches(/^[a-zA-Z0-9 ]*$/, messagesData.organization.name.matches),
    description: yup
      .string()
      .required(messagesData.organization.description.required)
      .trim(messagesData.organization.description.required),
    adminEmail: yup.string().when("$orgId", {
      is: (orgId: string | undefined) => !orgId,
      then: (schema) =>
        schema
          .required(messagesData.organization.adminEmail.required)
          .trim(messagesData.organization.adminEmail.required),
      otherwise: (schema) => schema.notRequired(),
    }),
    address: yup
      .string()
      .required(messagesData.organization.address.required)
      .trim(messagesData.organization.address.required),
    city: yup
      .string()
      .required(messagesData.organization.city.required)
      .matches(/^[a-zA-Z0-9 ]*$/, messagesData.organization.city.matches)
      .trim(messagesData.organization.city.required),
    contact: yup
      .string()
      .matches(/^\d+$/, messagesData.organization.contact.matches)
      .trim(messagesData.organization.contact.required)
      .required(messagesData.organization.contact.required),
    country: yup.string().required(messagesData.organization.country.required),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    context: { orgId },
  });

  const [addOrganization, { loading: addOrgLoading }] = useMutation(
    CreateOrganization,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Organization added successfully");
        reset();
        if (close) {
          close();
        }
        reset();
        refetchItem();
      },
    }
  );

  const [updateOrganization, { loading: updateOrgLoading }] = useMutation(
    UpdateOrganization,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Organization updated successfully");
        setEditForm(false);
        refetchItem();
      },
    }
  );

  const onSubmit = async (
    data: createOrganizationInput | UpdateOrganizationInput
  ) => {
    if (orgId) {
      updateOrganization({
        variables: { updateOrganizationInput: { ...data, id: orgId } },
      });
    } else {
      const response = await addOrganization({
        variables: { createOrganizationInput: data as createOrganizationInput },
      });
      if (setNewOrgList) {
        setNewOrgList(response.data);
      }
    }
  };

  useEffect(() => {
    if (orgDetails?.organization) {
      setValue("name", orgDetails?.organization.name);
      setValue("description", orgDetails?.organization.description);
      setValue("address", orgDetails?.organization.address);
      setValue("contact", orgDetails?.organization.contact);
      setValue("city", orgDetails?.organization.city);
      setValue("country", orgDetails?.organization.country);
    }
  }, [orgDetails?.organization, setValue]);

  // console.log('details', orgDetails?.organization.User?.map((e) => e.role?.name))

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <TextInput
            label="Name"
            placeholder="Name"
            {...register("name")}
            disabled={!editForm}
            withAsterisk
          />
          <Text size="sm" mt={5} c="red.6">
            {errors.name?.message}
          </Text>
        </div>

        <div className="mb-4">
          <Textarea
            label="Description"
            placeholder="Description"
            {...register("description")}
            disabled={!editForm}
            withAsterisk
          />
          <Text size="sm" mt={5} c="red.6">
            {errors.description?.message}
          </Text>
        </div>

        {!orgId && (
          <div className="mb-4">
            <TextInput
              label="Admin Email"
              placeholder="Admin Email"
              {...register("adminEmail")}
              withAsterisk
            />
            <Text size="sm" mt={5} c="red.6">
              {errors.adminEmail?.message}
            </Text>
          </div>
        )}

        <div className="mb-4">
          <TextInput
            label="Address"
            placeholder="Address"
            {...register("address")}
            disabled={!editForm}
            withAsterisk
          />
          <Text size="sm" mt={5} c="red.6">
            {errors.address?.message}
          </Text>
        </div>

        <div className="mb-4">
          <TextInput
            label="Contact"
            placeholder="Contact"
            {...register("contact")}
            disabled={!editForm}
            withAsterisk
          />
          <Text size="sm" mt={5} c="red.6">
            {errors.contact?.message}
          </Text>
        </div>

        <div className="mb-4">
          <TextInput
            label="City"
            placeholder="City"
            {...register("city")}
            disabled={!editForm}
            withAsterisk
          />
          <Text size="sm" mt={5} c="red.6">
            {errors.city?.message}
          </Text>
        </div>

        <div className="mb-4">
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Country"
                placeholder="Country"
                data={options}
                onChange={(value) => field.onChange(value)}
                value={field.value}
                searchable
                disabled={!editForm}
                withAsterisk
              />
            )}
          />
          <Text size="sm" mt={5} c="red.6">
            {errors.country?.message}
          </Text>
        </div>

        <div className="text-right">
          {orgId ? (
            <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">
              <Button
                type="button"
                onClick={() => navigate(-1)}
                variant="outline"
              >
                Cancel
              </Button>
              {handleUserPermissions(
                permission,
                USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,
                USER_PERMISSION_CAPABILITIES.EDIT
              ) && (
                <>
                  {editForm ? (
                    <ButtonComponent type="submit" loading={updateOrgLoading}>
                      Update
                    </ButtonComponent>
                  ) : (
                    <Button type="button" onClick={() => setEditForm(true)}>
                      Edit
                    </Button>
                  )}
                </>
              )}
            </div>
          ) : (
            <ButtonComponent type="submit" loading={addOrgLoading}>
              Create
            </ButtonComponent>
          )}
        </div>
      </form>

      {orgDetails?.organization?.User?.length && <Divider />}

      <div className="mt-5">
        {orgDetails?.organization?.User?.some(
          (user) => user.role?.userType === UserRole.Admin
        ) && (
          <div className="mb-4">
            <Title size="sm">Admin Emails</Title>
            <ul>
              {orgDetails?.organization.User?.filter(
                (user) => user.role?.userType === UserRole.Admin
              ).map((user, index) => (
                <li key={index}>{user.email}</li>
              ))}
            </ul>
          </div>
        )}

        {orgDetails?.organization?.User?.some(
          (user) => user.role?.userType === UserRole.Staff
        ) && (
          <div className="mb-4">
            <Title size="sm">Staff Emails</Title>
            <ul>
              {orgDetails?.organization.User?.filter(
                (user) => user.role?.userType === UserRole.Staff
              ).map((user, index) => (
                <li key={index}>{user.email}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
