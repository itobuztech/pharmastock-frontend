import { useLazyQuery } from "@apollo/client";
import { LoadingOverlay, TextInput } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import { AdminProfile } from "interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { GetUser } from "query/profile/getUserAccount";
import { toast } from "react-toastify";
import ChangePassword from "./component/ChangePassword";
import ProfileForm from "./component/ProfileForm";
import { appStore } from "Lib/appStore";

export default function ProfilePage() {
  const [admin, setAdmin] = useState<AdminProfile>();
const store = appStore.get();
console.log(store);

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
            },
          },
        };
        setAdmin(profile);
      }
    },
  });

  useEffect(() => {
    getCurrentUser();
    refetch();
  }, [getCurrentUser, refetch]);

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
        <TextInput label="Email" disabled value={admin?.account.user.email} />

        <ProfileForm admin={admin} />

        <ChangePassword />
      </div>
    </section>
  );
}
