import React, { useEffect, useState } from "react";
import PageHeader from "Components/PageHeader";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GetUsersList } from "query/user/usersList";
import { toast } from "react-toastify";
import { ChildComponentProps, UserData, Users } from "interfaces/interfaces";
import UserTable from "./components/UserTable";
import { Button, Flex, LoadingOverlay } from "@mantine/core";
import EmptyList from "Components/EmptyList";
import Search from "Components/Search";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import ConfirmationModal from "Components/ConfirmationModal";
import { useAppSelector } from "Lib/Store/hooks";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { DeleteUserBySuperAdmin } from "query/user/userDelete";

export default function UserList({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [userList, setUserList] = useState<Users>();
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [deletedId, setDeletedId] = useState<string>();
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const permission = useAppSelector((state) => state.user.permission);

  /* ====== User List Query ====== */
  const [fetchUserList, { refetch, loading }] = useLazyQuery<UserData>(
    GetUsersList,
    {
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: (d) => {
        if (d) {
          const users = d.users;
          const total = d.users.total;
          const paginationCount = Math.ceil(total / 10);

          setUserList(users);
          setTotalCount(paginationCount);
        }
      },
    }
  );

  /* ====== User Pagination Variable ====== */
  useEffect(() => {
    fetchUserList({
      variables: {
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: "",
      },
    });
  }, [fetchUserList, activePage, refetch, searchInput]);

  /* ====== Handle Search Function ====== */
  const handleSearch = useDebouncedCallback(async (searchInput: string) => {
    fetchUserList({
      variables: {
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: searchInput,
      },
    });
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  /* ====== User Delete Query ====== */
  const [deleteUser] = useMutation(DeleteUserBySuperAdmin, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      refetch().then(({ data }) => {
        if (data) {
          const users = data.users;
          const total = data.users.total;
          const paginationCount = Math.ceil(total / 10);

          setUserList(users);
          setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("User Deleted Successfully");
    },
  });

  /* ====== Handle Delete Function ====== */
  function handleDelete(itemId: string) {
    const deleteItem = userList?.users.find((x) => x.id === itemId);
    setDeletedId(deleteItem?.id);
    console.log(deleteItem?.id);
    deleteModalOpen();
  }

  function getDeleteUser() {
    deleteUser({
      variables: { deleteUserInput: { id: deletedId } },
    });
  }

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader title="Users" showCreateButton={false} />

      {/* ==== Search ==== */}
      <Flex>
        <Search
          handleChange={handleChange}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <Button ml='auto'>Invite User</Button>
      </Flex>

      {/* ==== Loading State ==== */}
      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      {/* ==== User Table Empty List and List ==== */}
      {!userList?.users?.length ? (
        <EmptyList />
      ) : (
        <UserTable
          activePage={activePage}
          setActivePage={setActivePage}
          totalCount={totalCount}
          userList={userList}
          handleDelete={handleDelete}
          handleUserPermissions={handleUserPermissions}
          showDeleteButton={handleUserPermissions(
            permission,
            USER_PERMISSION_FIELDS.USER_PERMISSION,
            USER_PERMISSION_CAPABILITIES.DELETE
          )}
        />
      )}

      {/* ==== Delete Confirmation Modal ==== */}
      <ConfirmationModal
        title="User"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteUser()}
      />
    </section>
  );
}
