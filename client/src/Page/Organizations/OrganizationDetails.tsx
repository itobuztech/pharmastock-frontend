import React from "react";
import { useQuery } from "@apollo/client";
import { GetOrganizationDetails } from "query/organization/organizationDetails";
import { useParams } from "react-router-dom";
import { Organization } from "gql/graphql";
import { TextInput, Textarea } from "@mantine/core";

export default function OrganizationDetails() {
  const { orgId } = useParams();

  const { data: orgDetails } = useQuery<{ organization: Organization }>(
    GetOrganizationDetails,
    {
      variables: {
        organizationId: orgId,
      },
    }
  );

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-8 px-8">
      <div className="flex flex-wrap items-center justify-between mt-3 mb-8">
        <h1 className="text-blue-900 text-2xl font-bold m-0">Details</h1>
      </div>
      <form>
        <div className="flex flex-wrap w-1/2 gap-4 justify-between mb-6">
          <TextInput
            label="Name"
            value={orgDetails?.organization.name}
            readOnly
            className="flex-1"
          />
          <Textarea
            label="Description"
            value={orgDetails?.organization.description}
            readOnly
            className="flex-1"
          />
        </div>
        <div className="flex flex-wrap w-1/2 gap-4 justify-between mb-6">
          <TextInput
            label="Address"
            value={orgDetails?.organization.address}
            readOnly
            className="flex-1"
          />
          <TextInput
            label="Contact"
            value={orgDetails?.organization.contact}
            readOnly
            className="flex-1"
          />
        </div>
        <div className="flex flex-wrap w-1/2 gap-4 justify-between mb-6">
          <TextInput
            label="City"
            value={orgDetails?.organization.city}
            readOnly
            className="flex-1"
          />
          <TextInput
            label="Country"
            value={orgDetails?.organization.country}
            readOnly
            className="flex-1"
          />
        </div>
      </form>
    </section>
  );
}
