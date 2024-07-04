import React, { useEffect, useState } from "react";
import "./Pharmacy.scoped.scss";
import { Pharmacy } from "gql/graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  CreatePharmacyInput,
  CreatePharmacyResponse,
  OrganizationList,
} from "../../interfaces/interfaces";
import { CREATE_PHARMACY } from "./createPharmacyMutation";

import { toast } from "react-toastify";
import { ORGANIZATIONS_LIST_QUERY } from "Page/Organizations/OrganizationsQuery";

export default function PharmacyPage() {
  // Organization listing. STARTS
  const [organization, setOrganization] =
    useState<OrganizationList["organizations"]>();

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
  // Organization listing. ENDS

  // Pharmacy creation. STARTS
  const [pharmacy, setPharmacy] = useState<CreatePharmacyInput>({
    name: "",
    contact_info: "",
    location: "",
    organizationId: "",
  });

  const [pharmacyCreate] = useMutation<
    CreatePharmacyResponse,
    { createPharmacyInput: CreatePharmacyInput }
  >(CREATE_PHARMACY);

  const handleChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setPharmacy({
        ...pharmacy,
        [field]: event.target.value,
      });
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    pharmacyCreate({
      variables: {
        createPharmacyInput: {
          name: pharmacy.name,
          contact_info: pharmacy.contact_info,
          location: pharmacy.location,
          organizationId: "eff641da-aae1-4840-a6c8-42c28c294145",
        },
      },
      onCompleted: (d) => {
        if (d.createPharmacy) {
          toast.success("Pharmacy create successfully");
        }
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });
  };
  // Pharmacy creation. ENDS

  return (
    <section className="min-h-screen bg-gray-100 bg-opacity-50 flex items-center justify-center py-8">
      <div className="container max-w-lg mx-auto shadow-lg rounded-lg bg-white">
        <div className="p-6 bg-gray-100 border-t-2 border-indigo-400 rounded-t-lg bg-opacity-5">
          <h1 className="text-gray-600 text-center text-2xl font-bold">
            Pharmacy
          </h1>
        </div>
        <div className="space-y-6 p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col text-gray-500">
                <label className="text-lg font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  className="rounded-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Name"
                  onChange={handleChange("name")}
                />
              </div>
              <div className="flex flex-col text-gray-500">
                <label className="text-lg font-medium">Organization</label>
                <select
                  name="organizationId"
                  className="rounded-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  onChange={handleChange("organizationId")}
                >
                  <option value="" disabled>
                    Select Organization
                  </option>

                  {organization &&
                    organization.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col text-gray-500">
                <label className="text-lg font-medium">Contact Info</label>
                <input
                  type="text"
                  name="contact_info"
                  className="rounded-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Contact Info"
                  onChange={handleChange("contact_info")}
                />
              </div>
              <div className="flex flex-col text-gray-500">
                <label className="text-lg font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  className="rounded-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Location"
                  onChange={handleChange("location")}
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Create Pharmacy
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
