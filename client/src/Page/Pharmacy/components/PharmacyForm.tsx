import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextInput, Text } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import {
  CreatePharmacyInput,
  UpdatePharmacyInput,
  Pharmacy,
} from "gql/graphql";
import { Permissions } from "interfaces/interfaces";
import { useAppSelector } from "Lib/Store/hooks";
import messagesData from "Lib/messages";
import { isValidPhoneNumber } from "libphonenumber-js";
import { PharmacyCreate } from "query/pharmacy/pharmacyCreate";
import { GetUpdatePharmacy } from "query/pharmacy/pharmacyUpdate";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  handleUserPermissions,
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
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}) {
  const navigate = useNavigate();
  const permission = useAppSelector((state) => state.user.permission);

  const schema = yup
    .object({
      name: yup
        .string()
        .required(messagesData.pharmacy.name.required)
        .max(100, messagesData.pharmacy.name.max)
        .trim(messagesData.pharmacy.name.trim)
        .matches(/^[a-zA-Z0-9 ]*$/, messagesData.pharmacy.name.matches),
      location: yup
        .string()
        .required(messagesData.pharmacy.location.required)
        .trim(messagesData.pharmacy.location.required)
        .matches(/^[a-zA-Z0-9 ]*$/, messagesData.pharmacy.location.matches),
      contactInfo: yup
        .string()
        .test("contactInfo", messagesData.pharmacy.contact.matches, (value) => {
          if (!value) {
            return true;
          }
          return isValidPhoneNumber(value, {
            defaultCountry: "IN",
            defaultCallingCode: "+91",
          });
        })
        .required(messagesData.pharmacy.contact.required),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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
      if (setNewPharmacyList) {
        setNewPharmacyList(response.data);
      }
    }
  };

  // Set Values
  useEffect(() => {
    if (pharmacyDetails) {
      setValue("name", pharmacyDetails.name);
      setValue("contactInfo", pharmacyDetails.contactInfo!);
      setValue("location", pharmacyDetails.location);
    }
  }, [pharmacyDetails, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {id && (
        <div className="mb-4">
          <TextInput
            label="Organization"
            placeholder="Name"
            value={pharmacyDetails?.organization?.name}
            disabled
          />
        </div>
      )}

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
        <TextInput
          label="Contact Info"
          placeholder="Contact Info"
          {...register("contactInfo")}
          withAsterisk
          disabled={!editForm}
        />
        <Text size="sm" mt={5} c="red.6">
          {errors.contactInfo?.message}
        </Text>
      </div>

      <div className="mb-4">
        <TextInput
          label="Location"
          placeholder="Location"
          {...register("location")}
          withAsterisk
          disabled={!editForm}
        />
        <Text size="sm" mt={5} c="red.6">
          {errors.location?.message}
        </Text>
      </div>

      <div className="text-right">
        {id ? (
          <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">
            
            {handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.PHARMACY_MANAGEMENT,
              USER_PERMISSION_CAPABILITIES.EDIT
            ) && (
              <>
              <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Cancel
            </Button>
                {editForm ? (
                  <ButtonComponent
                    type="submit"
                    loading={updatePharmacyLoading}
                  >
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
          <ButtonComponent type="submit" loading={createPharmacyLoading}>
            Create
          </ButtonComponent>
        )}
      </div>
    </form>
  );
}
