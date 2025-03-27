import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Box,
  LoadingOverlay,
  Space,
  TextInput,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import PageHeader from "Components/PageHeader";
import { AdminProfile, Permissions } from "interfaces/interfaces";
import { GetUser } from "query/profile/getUserAccount";
import ChangePassword from "./component/ChangePassword";
import ProfileForm from "./component/ProfileForm";
import { GetPermission } from "query/getPermission";
import { setPermission, setRole } from "Lib/Store/User/User.Slice";

export default function ProfilePage() {
  const [admin, setAdmin] = useState<AdminProfile>();
  const dispatch = useDispatch();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

  const [fetchPermissions] = useLazyQuery<{ getpermissions: Permissions }>(
    GetPermission,
    {
      onCompleted: (d) => {
        dispatch(setPermission(d.getpermissions));
      },
    }
  );

  const [getCurrentUser, { loading }] = useLazyQuery(GetUser, {
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
                name: d?.account?.user?.pharmacy?.name,
              },
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
    fetchPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="min-h-screen py-4 md:py-8 px-4 md:px-8">
      <PageHeader title="Profile" showCreateButton={false} />

      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      <h1
        style={{ color: isDark ? theme.colors.gray[3] : theme.colors.dark[9] }}
      >
        {admin?.account.role}
      </h1>

      <Box
        style={{
          backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[0],
          color: isDark ? theme.colors.gray[3] : theme.colors.dark[9],
        }}
        className="w-full lg:w-5/6 xl:w-2/3 2xl:w-1/2 custom-shadow rounded-md py-6 px-6 shadow-md"
      >
        <h2 className="m-0 mb-4">Account</h2>
        <div className="mb-4">
          <TextInput
            label="Email"
            disabled
            defaultValue={admin?.account.user.email}
            classNames={{ label: isDark ? "text-gray-400" : "text-black" }}
          />
        </div>
        {admin?.account.user.organization?.name && (
          <div>
            <TextInput
              label="Organization"
              disabled
              defaultValue={admin?.account.user.organization?.name}
              classNames={{ label: isDark ? "text-gray-400" : "text-black" }}
            />
            <Space h="md" />
          </div>
        )}

        <ProfileForm admin={admin} />

        <ChangePassword />
      </Box>
    </Box>
  );
}
