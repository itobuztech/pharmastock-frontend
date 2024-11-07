import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetOrganizationDetails } from "query/organization/organizationDetails";
import { useParams } from "react-router-dom";
import { Organization, UserRole } from "gql/graphql";
import { Title, Skeleton, Card } from "@mantine/core";

import PageHeader from "Components/PageHeader";
import OrganizationForm from "./components/OrganizationForm";
import { ChildComponentProps } from "interfaces/interfaces";

export default function OrganizationDetails({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const { orgId } = useParams();
  const [editForm, setEditForm] = useState(false);

  const {
    data: orgDetails,
    refetch,
    loading,
  } = useQuery<{
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
      <div className="lg:flex gap-3">
        <div className="w-full lg:w-1/2 bg-white rounded-md py-6 px-6 shadow-sm">
          <OrganizationForm
            editForm={editForm}
            setEditForm={setEditForm}
            orgId={orgId}
            refetchItem={refetch}
            orgDetails={orgDetails}
            handleUserPermissions={handleUserPermissions}
          />
        </div>
        <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
          {loading ? (
            <Skeleton height={300} />
          ) : (
            <>
              {orgDetails?.organization?.User?.some(
                (user) => user.role?.userType === UserRole.Admin
              ) && (
                <Card className="mb-4">
                  <div className="mb-4">
                    <Title size="sm">Admin Emails</Title>
                    <ul className="w-full list-disc list-inside">
                      {orgDetails?.organization.User?.filter(
                        (user) => user.role?.userType === UserRole.Admin
                      ).map((user, index) => (
                        <li key={index} className="text-gray-700 truncate">
                          {user.email}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              )}
              {orgDetails?.organization?.User?.some(
                (user) => user.role?.userType === UserRole.Staff
              ) && (
                <Card radius="md">
                  <div className="mb-4">
                    <Title size="sm">Staff Emails</Title>
                    <ul className="w-full list-disc list-inside">
                      {orgDetails?.organization.User?.filter(
                        (user) => user.role?.userType === UserRole.Staff
                      ).map((user, index) => (
                        <li key={index} className="text-gray-700 truncate">
                          {user.email}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
