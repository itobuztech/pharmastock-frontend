import { Button } from "@mantine/core";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function PageHeader({
  title,
  onClick,
  showBackButton,
  showCreateButton,
}: {
  title: string;
  onClick?: () => void;
  showBackButton?: boolean;
  showCreateButton?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center justify-between mt-1 mb-8">
      <div className="flex flex-wrap items-center justify-between">
        {showBackButton && (
          <Button
            variant="transparent"
            onClick={() => navigate(-1)}
            className="p-0 mr-4"
          >
            <BiArrowBack size={24} color="black" />
          </Button>
        )}
        <h1 className="text-blue-900 text-2xl font-bold m-0">{title}</h1>
      </div>
      {showCreateButton && (
        <Button
          leftSection={<BsPlusLg size={18} />}
          color="rgba(37, 99, 235, 1)"
          size="md"
          onClick={onClick}
        >
          Create
        </Button>
      )}
    </div>
  );
}
