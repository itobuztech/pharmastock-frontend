import React, { useEffect, useState } from "react";
import PageHeader from "Components/PageHeader";
import { useLazyQuery } from "@apollo/client";
import { GetUsersList } from "query/user/usersList";
import { toast } from "react-toastify";
import { UserData, Users } from "interfaces/interfaces";
import UserTable from "./components/UserTable";
import { LoadingOverlay } from "@mantine/core";
import EmptyList from "Components/EmptyList";

export default function UserList() {
  const [userList, setUserList] = useState<Users>();
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

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
  }, [fetchUserList, activePage, refetch]);

  console.log({ userList });

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader title="Users" showCreateButton={false} />

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
        />
      )}
    </section>
  );
}
