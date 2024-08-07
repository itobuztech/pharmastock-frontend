import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetOrganizationDetails } from "query/organization/organizationDetails";
import { useParams } from "react-router-dom";
import { Organization } from "gql/graphql";
import PageHeader from "Components/PageHeader";
import OrganizationForm from "./components/OrganizationForm";
import { ChildComponentProps } from "interfaces/interfaces";

export default function OrganizationDetails({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const { orgId } = useParams();
  const [editForm, setEditForm] = useState(false);

  const { data: orgDetails, refetch } = useQuery<{
    organization: Organization;
  }>(GetOrganizationDetails, {
    variables: {
      organizationId: orgId,
    },
  });

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Organization Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-full lg:w-1/2 bg-white rounded-md py-6 px-6">
        <OrganizationForm
          editForm={editForm}
          setEditForm={setEditForm}
          orgId={orgId}
          refetchItem={refetch}
          orgDetails={orgDetails}
          handleUserPermissions={handleUserPermissions}
        />
      </div>
    </section>
  );
}
