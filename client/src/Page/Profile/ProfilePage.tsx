import { useLazyQuery } from "@apollo/client";
import { LoadingOverlay, Space, TextInput } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import { AdminProfile, Permissions } from "interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { GetUser } from "query/profile/getUserAccount";
import { toast } from "react-toastify";
import ChangePassword from "./component/ChangePassword";
import ProfileForm from "./component/ProfileForm";
import { useDispatch } from "react-redux";
import { GetPermission } from "query/getPermission";
import { setPermission, setRole } from "Lib/Store/User/User.Slice";
import { useAppSelector } from "Lib/Store/hooks";

export default function ProfilePage() {
  const [admin, setAdmin] = useState<AdminProfile>();
  const dispatch = useDispatch();

  const [fetchPermissions, { data: permissionsData }] = useLazyQuery<{
    getpermissions: Permissions;
  }>(GetPermission, {
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      dispatch(setPermission(d.getpermissions));
    },
  });

  useEffect(() => {
    if (permissionsData) {
      console.log("Permissions data:", permissionsData);
    }
  }, [permissionsData]);

  const user = useAppSelector((state) => state.user);

  const [getCurrentUser, { loading, refetch }] = useLazyQuery(GetUser, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: (d) => {
      if (d.account) {
        const profile: AdminProfile = {
          account: {
            role: d.account.role,
            user: {
              email: d.account.user.email,
              id: d.account.user.id,
              name: d.account.user.name,
              username: d.account.user.username,
              organization: {
                name: d.account.user.organization?.name,
                id: d.account.user.organization?.id,
              },
              pharmacy: {
                id: d?.account?.user?.pharmacy?.id,
                name: d?.account?.user?.pharmacy?.name
              }
            },
          },
        };
        setAdmin(profile);
        dispatch(setRole(d.account.role));
      }
    },
  });

  useEffect(() => {
    getCurrentUser();
    refetch();
    fetchPermissions();
  }, [getCurrentUser, refetch, fetchPermissions, user]);

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader title="Profile" showCreateButton={false} />

      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      <h1 className="text-black">{admin?.account.role}</h1>

      <div className="w-full lg:w-4/6 xl:w-1/2 bg-white rounded-md py-6 px-6">
        <h2 className="m-0 mb-4">Account</h2>
        <div className="mb-4">
          <TextInput
            label="Email"
            disabled
            defaultValue={admin?.account.user.email}
          />
        </div>
        {admin?.account.user.organization?.name && (
          <div>
            <TextInput
              label="Organization"
              disabled
              defaultValue={admin?.account.user.organization?.name}
            />
            <Space h="md" />
          </div>
        )}

        <ProfileForm admin={admin} />

        <ChangePassword />
      </div>
    </section>
  );
}
