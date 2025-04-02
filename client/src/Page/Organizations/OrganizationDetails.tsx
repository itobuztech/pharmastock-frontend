import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Title, Skeleton, Paper } from "@mantine/core";

import { GetOrganizationDetails } from "query/organization/organizationDetails";
import { Organization, UserRole } from "gql/graphql";
import PageHeader from "Components/PageHeader";
import OrganizationForm from "./components/OrganizationForm";
import { ChildComponentProps } from "interfaces/interfaces";
import { organizationStyles } from "./organizationStyles";

export default function OrganizationDetails({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const { orgId } = useParams();
  const [editForm, setEditForm] = useState(false);
  const { classes } = organizationStyles();

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
    <section className="min-h-screen bg-opacity-50 py-4 md:py-6 px-4 md:px-8">
      <PageHeader
        title="Organization Details"
        showBackButton={true}
        showCreateButton={false}
      />
      <div className="lg:flex gap-3">
        <div className="w-full lg:w-1/2">
          <Paper withBorder shadow="md" px={30} pt={30} mt={20} radius="md">
            <OrganizationForm
              editForm={editForm}
              setEditForm={setEditForm}
              orgId={orgId}
              refetchItem={refetch}
              orgDetails={orgDetails}
              handleUserPermissions={handleUserPermissions}
            />
          </Paper>
        </div>

        <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
          {loading ? (
            <Skeleton className="mt-5" height={300} />
          ) : (
            <>
              {orgDetails?.organization?.User?.some(
                (user) => user.role?.userType === UserRole.Admin
              ) && (
                <Paper
                  withBorder
                  shadow="md"
                  px={30}
                  pt={30}
                  pb={20}
                  mt={20}
                  radius="md"
                >
                  <Title size="sm">Admin Emails</Title>
                  <ul className="w-full list-disc list-inside">
                    {orgDetails?.organization.User?.filter(
                      (user) => user.role?.userType === UserRole.Admin
                    ).map((user, index) => (
                      <li key={index} className={`${classes.list} truncate`}>
                        {user.email}
                      </li>
                    ))}
                  </ul>
                </Paper>
              )}
              {orgDetails?.organization?.User?.some(
                (user) => user.role?.userType === UserRole.Staff
              ) && (
                <Paper
                  withBorder
                  shadow="md"
                  px={30}
                  pt={30}
                  pb={20}
                  mt={10}
                  radius="md"
                >
                  <div className="mb-4">
                    <Title size="sm">Staff Emails</Title>
                    <ul className="w-full list-disc list-inside">
                      {orgDetails?.organization.User?.filter(
                        (user) => user.role?.userType === UserRole.Staff
                      ).map((user, index) => (
                        <li key={index} className={`${classes.list} truncate`}>
                          {user.email}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Paper>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
