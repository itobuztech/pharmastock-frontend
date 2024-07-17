import { useLazyQuery, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Select, TextInput } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import {
  CreatePharmacyInput,
  UpdatePharmacyInput,
  Pharmacy,
} from "gql/graphql";
import { OrganizationList } from "interfaces/interfaces";
import { ORGANIZATIONS_LIST_QUERY } from "query/organization/organizationList";
import { PharmacyCreate } from "query/pharmacy/pharmacyCreate";
import { GetUpdatePharmacy } from "query/pharmacy/pharmacyUpdate";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function PharmacyForm({
  close,
  setNewPharmacyList,
  pharmacyDetails,
  refetchPharmacyDetails,
  id,
  editForm,
  setEditForm,
}: {
  close: () => void;
  setNewPharmacyList?: React.Dispatch<
    React.SetStateAction<CreatePharmacyInput | undefined>
  >;
  pharmacyDetails?: Pharmacy;
  refetchPharmacyDetails?: () => void;
  id?: string;
  editForm?: boolean;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [organization, setOrganization] =
    useState<OrganizationList["organizations"]>();

  const schema = yup
    .object({
      name: yup.string().required(),
      location: yup.string().required(),
      contactInfo: yup
        .string()
        .matches(/^\d+$/, "Contact info must be a number")
        .required("Contact info is required"),
      organizationId: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Pharmacy create query
  const [pharmacyCreate, { loading: createPharmacyLoading }] = useMutation(
    PharmacyCreate,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        toast.success("Pharmacy Created Successfully");
        close();
        reset();
      },
    }
  );
  // Pharmacy update query
  const [updatePharmacy, { loading: updatePharmacyLoading }] = useMutation(
    GetUpdatePharmacy,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Pharmacy Updated Successfully");
        setEditForm(false);
        if (refetchPharmacyDetails) {
          refetchPharmacyDetails();
        }
      },
    }
  );

  const onSubmit = async (data: CreatePharmacyInput | UpdatePharmacyInput) => {
    if (id) {
      // ON update
      updatePharmacy({
        variables: { updatePharmacyInput: { ...data, id } },
      });
    } else {
      // ON create
      const response = await pharmacyCreate({
        variables: { createPharmacyInput: data as CreatePharmacyInput },
      });
      setNewPharmacyList(response.data);
    }
  };

  // Get Organization List
  const [organizationList] = useLazyQuery<OrganizationList>(
    ORGANIZATIONS_LIST_QUERY,
    {
      onCompleted: (d) => {
        if (d) {
          const orgs = d.organizations;
          setOrganization(orgs);
        }
      },
    }
  );

  useEffect(() => {
    organizationList();
  }, [organizationList]);

  const organizationListArr = organization?.organizations;

  const selectOrgItem = organizationListArr?.map((item) => ({
    value: item.id,
    label: item.name as string,
  }));

  // Set Values
  useEffect(() => {
    if (pharmacyDetails) {
      console.log("update", { pharmacyDetails });
      setValue("name", pharmacyDetails.name);
      setValue("contactInfo", pharmacyDetails.contactInfo!);
      setValue("location", pharmacyDetails.location);
      pharmacyDetails?.organization?.id &&
        setValue("organizationId", pharmacyDetails?.organization?.id);
    }
  }, [pharmacyDetails, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <TextInput
          label="Name"
          placeholder="Name"
          {...register("name")}
          error={errors.name && "This field is required"}
          disabled={!editForm}
        />
      </div>
      <div className="mb-4">
        <TextInput
          label="Contact Info"
          placeholder="Contact Info"
          {...register("contactInfo")}
          error={errors.contactInfo && "This field is required"}
          disabled={!editForm}
        />
      </div>
      <div className="mb-4">
        <TextInput
          label="Location"
          placeholder="Location"
          {...register("location")}
          error={errors.location && "This field is required"}
          disabled={!editForm}
        />
      </div>
      <div className="mb-4">
        <Controller
          name="organizationId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Select Organization"
              placeholder="Select Organization"
              data={selectOrgItem}
              maxDropdownHeight={300}
              // value={field.value}
              // onChange={(value) => field.onChange(value)}
              // value={values ? field.value : null}
              // onChange={(_value, option) => setValues(option)}
              onChange={(value) => {
                field.onChange(value);
                setValue("organizationId", value!);
              }}
              value={field.value}
              error={errors.organizationId && "This field is required"}
              disabled={!editForm}
            />
          )}
        />
      </div>
      <div className="text-right">
        {id ? (
          <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Cancel
            </Button>

            {editForm ? (
              <ButtonComponent type="submit" loading={updatePharmacyLoading}>
                Update
              </ButtonComponent>
            ) : (
              <Button type="button" onClick={() => setEditForm(true)}>
                Edit
              </Button>
            )}
          </div>
        ) : (
          <ButtonComponent type="submit" loading={createPharmacyLoading}>
            Create
          </ButtonComponent>
        )}
      </div>
    </form>
  );
}
