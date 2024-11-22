import { Button } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { BiArrowBack } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function PageHeader({
  title,
  onClick,
  showBackButton,
  showCreateButton,
  buttonText,
}: {
  title: string;
  onClick?: () => void;
  showBackButton?: boolean;
  showCreateButton?: boolean;
  buttonText?: string;
}) {
  const navigate = useNavigate();
  const { width } = useViewportSize();

  return (
    <div className="sm:flex flex-wrap items-center justify-between mt-1 mb-5 lg:mb-8">
      <div className="flex flex-wrap items-center">
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
          size={width > 768 ? "md" : "sm"}
          onClick={onClick}
          className=" font-extrabold mt-3 sm:mt-0"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
