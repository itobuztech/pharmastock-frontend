import React from "react";
import PageHeader from "Components/PageHeader";

export default function UserList() {
  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader title="Users" showCreateButton={false} />
    </section>
  );
}
