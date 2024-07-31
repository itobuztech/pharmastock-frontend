import { useMutation } from "@apollo/client";
import { Button, Select, Textarea, TextInput } from "@mantine/core";
import { createOrganizationInput, Permissions } from "interfaces/interfaces";
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
import { USER_PERMISSION_CAPABILITIES, USER_PERMISSION_FIELDS } from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";

export default function OrganizationForm({
  close,
  editForm,
  setEditForm,
  orgId,
  orgDetails,
  setNewOrgList,
  refetchItem,
  handleUserPermissions
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
    permission :Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}>) {
  const options = useMemo(() => countryList().getData(), []);
  const navigate = useNavigate();
  const permission = useAppSelector((state) => state.user.permission);
  const schema = yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      address: yup.string().required(),
      city: yup.string().required(),
      contact: yup
        .string()
        .matches(/^\d+$/, "Contact info must be a number")
        .required("Contact info is required"),
      country: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [addOrganization, { loading: addOrgLoading }] = useMutation(
    CreateOrganization,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Organization Added Successfully");
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
        toast.success("Organization Updated Successfully");
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
      setNewOrgList(response.data);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <TextInput
          label="Name"
          placeholder="Name"
          {...register("name")}
          disabled={!editForm}
          error={errors.name && "This field is required"}
        />
      </div>

      <div className="mb-4">
        <Textarea
          label="Description"
          placeholder="Description"
          {...register("description")}
          disabled={!editForm}
          error={errors.description && "This field is required"}
        />
      </div>

      <div className="mb-4">
        <TextInput
          label="Address"
          placeholder="Address"
          {...register("address")}
          disabled={!editForm}
          error={errors.address && "This field is required"}
        />
      </div>

      <div className="mb-4">
        <TextInput
          label="Contact"
          placeholder="Contact"
          {...register("contact")}
          disabled={!editForm}
          error={errors.contact && "This field is required"}
        />
      </div>

      <div className="mb-4">
        <TextInput
          label="City"
          placeholder="City"
          {...register("city")}
          disabled={!editForm}
          error={errors.city && "This field is required"}
        />
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
              error={errors.country && "This field is required"}
            />
          )}
        />
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
            {editForm && handleUserPermissions(permission , USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,USER_PERMISSION_CAPABILITIES.EDIT)? (
              <ButtonComponent type="submit" loading={updateOrgLoading}>
                Update
              </ButtonComponent>
            ) : (
              <Button type="button" onClick={() => setEditForm(true)}>
                Edit
              </Button>
            )}
          </div>
        ) : (
          <ButtonComponent type="submit" loading={addOrgLoading}>
            Create
          </ButtonComponent>
        )}
      </div>
    </form>
  );
}
