import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GetOrganizationDetails } from "query/organization/organizationDetails";
import { useNavigate, useParams } from "react-router-dom";
import { Organization, UpdateOrganizationInput } from "gql/graphql";
import { Button, Select, TextInput, Textarea } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UpdateOrganization } from "query/organization/organizationUpdate";
import { BiArrowBack } from "react-icons/bi";
import countryList from "react-select-country-list";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function OrganizationDetails() {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  const [editForm, setEditForm] = useState(false);

  const schema = yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      address: yup.string().required(),
      city: yup.string().required(),
      contact: yup.string().required(),
      country: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: orgDetails } = useQuery<{ organization: Organization }>(
    GetOrganizationDetails,
    {
      variables: {
        organizationId: orgId,
      },
    }
  );

  const [updateOrganization] = useMutation(UpdateOrganization);

  const onSubmit = async (data: UpdateOrganizationInput) => {
    try {
      const response = await updateOrganization({
        variables: { updateOrganizationInput: { ...data, id: orgId } },
      });
      console.log({ response });
      toast.success("Organization Updated Successfully");
    } catch (error: any) {
      toast.error(error.message);
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
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-8 px-8">
      <div className="flex flex-wrap items-center mt-3 mb-8">
        <Button
          variant="transparent"
          onClick={() => navigate(-1)}
          className="p-0 mr-4"
        >
          <BiArrowBack size={24} color="black" />
        </Button>
        <h1 className="text-blue-900 text-2xl font-bold m-0">Details</h1>
      </div>
      <div className="w-1/2 bg-white rounded-md py-6 px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-4 justify-between mb-6">
            <div className="flex-1">
              <TextInput
                label="Name"
                {...register("name")}
                readOnly={editForm ? false : true}
              />
              {errors.name && (
                <span className="text-red-500 mt-2 block text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex-1">
              <Textarea
                label="Description"
                {...register("description")}
                readOnly={editForm ? false : true}
              />
              {errors.description && (
                <span className="text-red-500 mt-2 block text-xs">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-between mb-6">
            <div className="flex-1">
              <TextInput
                label="Address"
                {...register("address")}
                readOnly={editForm ? false : true}
              />
              {errors.address && (
                <span className="text-red-500 mt-2 block text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex-1">
              <TextInput
                label="Contact"
                {...register("contact")}
                readOnly={editForm ? false : true}
              />
              {errors.contact && (
                <span className="text-red-500 mt-2 block text-xs">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-between mb-6">
            <div className="flex-1">
              <TextInput
                label="City"
                {...register("city")}
                readOnly={editForm ? false : true}
              />
              {errors.city && (
                <span className="text-red-500 mt-2 block text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex-1">
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Country"
                    data={options}
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                    searchable
                    label="Country"
                    readOnly={editForm ? false : true}
                  />
                )}
              />
              {errors.country && (
                <span className="text-red-500 mt-2 block text-xs">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-end mb-6">
            {/* <div className="text-right"> */}
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Cancel
            </Button>

            {editForm ? (
              <ButtonComponent type="submit">Update</ButtonComponent>
            ) : (
              <Button type="button" onClick={() => setEditForm(true)}>
                Edit
              </Button>
            )}
            {/* </div> */}
          </div>
        </form>
      </div>
    </section>
  );
}
