import React, { act, useEffect, useState } from "react";
import { useAppSelector } from "../../Lib/Store/hooks";
import "./Organizations.scoped.scss";
import { OrganizationList } from "interfaces/interfaces";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ORGANIZATIONS_LIST_QUERY } from "Page/Organizations/OrganizationsQuery";
import { Container, Flex, Pagination, Space, Table } from "@mantine/core";
import { take } from "lodash";

export default function OrganizationsPage() {
  // Organization listing. STARTS
  const [organization, setOrganization] =
    useState<OrganizationList["organizations"]>();
  const [totalCount, setTotalCount] =
    useState<OrganizationList["organizations"]["total"]>(1);

  const [organizationList] = useLazyQuery<OrganizationList>(
    ORGANIZATIONS_LIST_QUERY,
    {
      onCompleted: (d) => {
        if (d) {
          const orgs = d.organizations;
          const total = d.organizations.total;
          const pagiCount = Math.ceil(total / 10);

          setOrganization(orgs);
          setTotalCount(pagiCount);
        }
      },
    }
  );

  const [activePage, setPage] = useState(1);
  const organizationListArr = organization?.organizations || [];

  useEffect(() => {
    organizationList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [organizationList, activePage]);

  const rows = organizationListArr?.map((org, i) => (
    <Table.Tr key={org.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{org.name}</Table.Td>
      <Table.Td>{org.description}</Table.Td>
      <Table.Td>{org.city}</Table.Td>
      <Table.Td>{org.address}</Table.Td>
    </Table.Tr>
  ));

  // Organization listing. ENDS

  return (
    <section className="min-h-screen bg-gray-100 bg-opacity-50 flex items-center justify-center py-8">
      <div className="container max-w-2xl mx-auto shadow-lg rounded-lg bg-white">
        <div className="p-6 bg-indigo-600 rounded-t-lg">
          <h1 className="text-white text-center text-2xl font-bold">
            Organizations List
          </h1>
        </div>
        {
          <Container>
            <Table
              horizontalSpacing="md"
              verticalSpacing="md"
              stickyHeader
              stickyHeaderOffset={60}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Sl No.</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>City</Table.Th>
                  <Table.Th>Address</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Container>
        }
        <Space h="md" />
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          {
            <Pagination
              total={totalCount}
              value={activePage}
              onChange={setPage}
              mt="sm"
            />
          }
        </Flex>
        <Space h="md" />
      </div>
    </section>
  );
}
