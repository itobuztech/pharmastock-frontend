import { TextInput } from "@mantine/core";
import React from "react";
import { BiSearch } from "react-icons/bi";

export default function Search({
  searchInput,
  handleChange,
}: {
  searchInput: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full lg:w-1/2 xl:w-1/4 rounded-md mb-8">
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={<BiSearch size={20} />}
        value={searchInput}
        onChange={handleChange}
        placeholder="Search..."
        radius="md"
      />
    </div>
  );
}
