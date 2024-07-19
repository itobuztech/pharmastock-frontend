import { useQuery } from "@apollo/client";
import { PasswordInput, TextInput } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import { User } from "interfaces/interfaces";
import { GetUserDetails } from "query/user/userDetails";
import React from "react";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();

  const { data: userDetails, refetch } = useQuery<{ user: User }>(
    GetUserDetails,
    {
      variables: {
        email: id,
      },
    }
  );

  console.log({ userDetails });

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
                // {...register("orgId")}
                // error={errors.orgId && "This field is required"}
                value={userDetails?.user.organization?.name}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1">
              <TextInput
                label="Role"
                placeholder="Role"
                // {...register("orgId")}
                disabled
                // error={errors.orgId && "This field is required"}
                // value={userDetails?.user.}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1">
            <TextInput
              label="User Name"
              placeholder="User Name"
              value={userDetails?.user.username}
              disabled
              // {...register("username")}
              // error={errors.username && "This field is required"}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Name"
              placeholder="Name"
              value={userDetails?.user.name}
              disabled
              // {...register("name")}
              // error={errors.name && "This field is required"}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1">
            <TextInput
              label="Email"
              placeholder="Email"
              value={userDetails?.user.email}
              disabled
              // {...register("email")}
              // disabled={!editForm}
              // error={errors.email && "This field is required"}
            />
          </div>
          <div className="flex-1">
            <PasswordInput
              label="Password"
              placeholder="Password"
              value="********"
              disabled
              // {...register("password")}
              // disabled={!editForm}
              // error={errors.password && "This field is required"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
