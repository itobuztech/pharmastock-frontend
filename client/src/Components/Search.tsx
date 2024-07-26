import { TextInput } from "@mantine/core";
import React from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";

export default function Search({
  onSubmit,
  searchInput,
  setSearchInput,
}: {
  onSubmit: () => void;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { handleSubmit } = useForm({
    mode: "onChange",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="w-full lg:w-1/2 xl:w-1/4 rounded-md mb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<BiSearch size={20} />}
          placeholder="Search"
          radius="md"
          value={searchInput}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
