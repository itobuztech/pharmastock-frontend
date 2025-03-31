import { useQuery } from "@apollo/client";
import { Text, Flex } from "@mantine/core";
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
    <section className="min-h-screen bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="User Details"
        showBackButton={true}
        showCreateButton={false}
      />
      <div className="w-full lg:w-1/2 custom-shadow rounded-md py-6 px-6">
        <div className="mb-4">
          <Flex
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Text fw={700}>Organization: </Text>
            <Text>{userDetails?.userById.organization?.name}</Text>
          </Flex>
        </div>
        <div className="mb-4">
          <Flex
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Text fw={700}>Role: </Text>
            <Text>{userDetails?.userById.role.userType}</Text>
          </Flex>
        </div>
        <div className="mb-4">
          <Flex
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Text fw={700}>User Name:</Text>
            <Text>{userDetails?.userById.username}</Text>
          </Flex>
        </div>
        <div className="mb-4">
          <Flex
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Text fw={700}>Name:</Text>
            <Text>{userDetails?.userById.name}</Text>
          </Flex>
        </div>
        <div className="mb-4">
          <Flex
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Text fw={700}>Email:</Text>
            <Text>{userDetails?.userById.email}</Text>
          </Flex>
        </div>
      </div>
    </section>
  );
}
