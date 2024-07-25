import { useQuery } from "@apollo/client";
import { PasswordInput, TextInput } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import { UserById } from "interfaces/interfaces";
import { GetUserDetails } from "query/user/userDetails";
import React from "react";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();

  const { data: userDetails } = useQuery<{ userById: UserById }>(
    GetUserDetails,
    {
      variables: {
        userByIdId: id,
      },
    }
  );

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="User Details"
        showBackButton={true}
        showCreateButton={false}
      />
      <div className="w-full lg:w-1/2 bg-white rounded-md py-6 px-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1">
            <div className="flex-1">
              <TextInput
                label="Organization"
                placeholder="Organization"
                disabled
                value={userDetails?.userById.organization?.name}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1">
              <TextInput
                label="Role"
                placeholder="Role"
                disabled
                // value={userDetails?.userById.role}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1">
            <TextInput
              label="User Name"
              placeholder="User Name"
              value={userDetails?.userById.username}
              disabled
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Name"
              placeholder="Name"
              value={userDetails?.userById.name}
              disabled
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1">
            <TextInput
              label="Email"
              placeholder="Email"
              value={userDetails?.userById.email}
              disabled
            />
          </div>
          <div className="flex-1">
            <PasswordInput
              label="Password"
              placeholder="Password"
              value="********"
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}
