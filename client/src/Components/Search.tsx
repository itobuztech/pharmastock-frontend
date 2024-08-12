import { TextInput } from "@mantine/core";
import React from "react";
import { BiSearch, BiX } from "react-icons/bi";

export default function Search({
  searchInput,
  handleChange,
  setSearchInput,
}: {
  searchInput: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="w-7/12 lg:w-1/2 xl:w-1/4 rounded-md mb-8">
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={<BiSearch size={20} />}
        rightSection={
          searchInput ? (
            <BiX
              size={20}
              cursor="pointer"
              onClick={() => setSearchInput("")}
            />
          ) : (
            ""
          )
        }
        value={searchInput}
        onChange={handleChange}
        placeholder="Search..."
        radius="md"
      />
    </div>
  );
}
