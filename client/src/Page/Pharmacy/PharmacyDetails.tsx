import React, { useEffect, useState } from "react";
import { Button, TextInput } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ButtonComponent from "Components/Button/ButtonComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GetPharmacyDetails } from "query/pharmacy/pharmacyDetails";
import { Pharmacy, UpdatePharmacyInput } from "gql/graphql";
import { GetUpdatePharmacy } from "query/pharmacy/pharmacyUpdate";

export default function PharmacyDetails() {
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup
    .object({
      name: yup.string().required(),
      contactInfo: yup.string().required(),
      location: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: pharmacyDetails } = useQuery<{ pharmacy: Pharmacy }>(
    GetPharmacyDetails,
    {
      variables: {
        pharmacyId: id,
      },
    }
  );

  console.log({ pharmacyDetails });

  const [updatePharmacy, { loading: updatePharmacyLoading }] =
    useMutation(GetUpdatePharmacy);

  const onSubmit = async (data: UpdatePharmacyInput) => {
    try {
      const response = await updatePharmacy({
        variables: { updatePharmacyInput: { ...data, id: id } },
      });
      console.log({ response });
      // toast.success("Organization Updated Successfully");
    } catch (error: any) {
      // toast.error(error.message);
    }
  };

  useEffect(() => {
    if (pharmacyDetails?.pharmacy) {
      setValue("name", pharmacyDetails?.pharmacy.name);
      setValue("contactInfo", pharmacyDetails?.pharmacy.contactInfo);
      setValue("location", pharmacyDetails?.pharmacy.location);
    }
  }, [pharmacyDetails?.pharmacy, setValue]);

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-8 px-8">
      <PageHeader
        title="Pharmacy Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-1/2 bg-white rounded-md py-6 px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextInput
              label="Name"
              placeholder="Name"
              {...register("name")}
              readOnly={editForm ? false : true}
            />
            {errors.name && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <TextInput
              label="Contact"
              placeholder="Contact Info"
              {...register("contactInfo")}
              readOnly={editForm ? false : true}
            />
            {errors.contactInfo && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <TextInput
              label="Location"
              placeholder="Location"
              {...register("location")}
              readOnly={editForm ? false : true}
            />
            {errors.location && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
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
        </form>
      </div>
    </section>
  );
}
