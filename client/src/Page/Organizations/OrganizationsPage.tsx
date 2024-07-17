import React, { useEffect, useMemo, useState } from "react";
import "./Organizations.scoped.scss";
import {
  createOrganizationInput,
  OrganizationList,
} from "interfaces/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Flex,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ButtonComponent from "Components/Button/ButtonComponent";
import { Controller, useForm } from "react-hook-form";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import { CreateOrganization } from "query/organization/organizationCreate";
import { ORGANIZATIONS_LIST_QUERY } from "query/organization/organizationList";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { DeleteOrganization } from "query/organization/organizationDelete";
import PageHeader from "Components/PageHeader";
import ActionPopover from "Components/ActionPopover";
import ConfirmationModal from "Components/ConfirmationModal";

export default function OrganizationsPage() {
  // Organization listing. STARTS
  const [organization, setOrganization] =
    useState<OrganizationList["organizations"]>();
  const [newOrgList, setNewOrgList] = useState<createOrganizationInput>();
  const [totalCount, setTotalCount] =
    useState<OrganizationList["organizations"]["total"]>(1);
  const [activePage, setActivePage] = useState(1);
  const options = useMemo(() => countryList().getData(), []);
  const [opened, { open, close }] = useDisclosure(false);
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const navigate = useNavigate();
  const [deleteOrgId, setDeleteOrgId] = useState<string>();

  const schema = yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      address: yup.string().required(),
      city: yup.string().required(),
      contact: yup.string().required(),
      country: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [addOrganization, { loading: addOrgLoading }] =
    useMutation(CreateOrganization);
  const [deleteOrganization] = useMutation(DeleteOrganization);

  const onSubmit = async (data: createOrganizationInput) => {
    try {
      const response = await addOrganization({
        variables: { createOrganizationInput: data },
      });
      toast.success("Organization Added Successfully");
      reset();
      close();
      setNewOrgList(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const [organizationList, { refetch }] = useLazyQuery<OrganizationList>(
    ORGANIZATIONS_LIST_QUERY,
    {
      onCompleted: (d) => {
        if (d) {
          const orgs = d.organizations;
          const total = d.organizations.total;
          const paginationCount = Math.ceil(total / 10);

          setOrganization(orgs);
          setTotalCount(paginationCount);
        }
      },
    }
  );

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

  useEffect(() => {
    if (newOrgList) {
      refetch().then(({ data }) => {
        if (data) {
          const orgs = data.organizations;
          const total = data.organizations.total;
          const paginationCount = Math.ceil(total / 10);

          setOrganization(orgs);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newOrgList, refetch]);

  function screenSwitch(orgId: string) {
    navigate(`/dashboard/organizations/${orgId}`);
  }

  function handleDelete(orgId: string) {
    const deleteItem = organization?.organizations.find((x) => x.id === orgId);
    setDeleteOrgId(deleteItem?.id);
    deleteModalOpen();
  }

  async function getDeleteOrganization() {
    try {
      await deleteOrganization({
        variables: { deleteOrganizationInput: { id: deleteOrgId } },
      });
      refetch().then(({ data }) => {
        if (data) {
          const orgs = data.organizations;
          const total = data.organizations.total;
          const paginationCount = Math.ceil(total / 10);
          setOrganization(orgs);
          setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("Organization Deleted Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const rows = organizationListArr?.map((org, i) => (
    <Table.Tr key={org.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{org.name}</Table.Td>
      <Table.Td className="w-2/5">{org.description}</Table.Td>
      <Table.Td>{org.city}</Table.Td>
      <Table.Td>{org.address}</Table.Td>
      <Table.Td>
        <ActionPopover
          handleView={() => screenSwitch(org.id)}
          handleDelete={() => handleDelete(org.id)}
        />
      </Table.Td>
    </Table.Tr>
  ));

  // Organization listing. ENDS

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-8 px-8">
      <PageHeader
        title="Organizations List"
        showCreateButton={true}
        onClick={open}
      />

      <div className=" bg-white">
        {
          <Table horizontalSpacing="md" verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Sl No.</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>City</Table.Th>
                <Table.Th>Address</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
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
              onChange={setActivePage}
              mt="sm"
            />
          }
        </Flex>
        <Space h="md" />
      </div>

      <ConfirmationModal
        title="Organization"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteOrganization()}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Organization"
        centered
        size={"lg"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextInput placeholder="Name" {...register("name")} />
            {errors.name && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <Textarea placeholder="Description" {...register("description")} />
            {errors.description && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <TextInput placeholder="Address" {...register("address")} />
            {errors.address && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <TextInput placeholder="Contact" {...register("contact")} />
            {errors.contact && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <TextInput placeholder="City" {...register("city")} />
            {errors.city && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Country"
                  data={options}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  searchable
                />
              )}
            />
            {errors.country && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="text-right">
            <ButtonComponent type="submit" loading={addOrgLoading}>
              Create
            </ButtonComponent>
          </div>
        </form>
      </Modal>
    </section>
  );
}
