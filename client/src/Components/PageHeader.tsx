import { Button, useMantineTheme, useMantineColorScheme } from "@mantine/core";
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
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

  return (
    <div className="sm:flex flex-wrap items-center justify-between mt-1 mb-5 lg:mb-8">
      <div className="flex flex-wrap items-center">
        {showBackButton && (
          <Button
            variant="transparent"
            onClick={() => navigate(-1)}
            className="p-0 mr-4"
          >
            <BiArrowBack size={24} color={isDark ? theme.colors.gray[3] : theme.colors.dark[9]} />
          </Button>
        )}
        <h1
          style={{
            color: isDark ? theme.colors.gray[3] : theme.colors.blue[9],
            transition: "color 0.3s ease",
          }}
          className="text-2xl font-bold m-0"
        >
          {title}
        </h1>
      </div>
      {showCreateButton && (
        <Button
          leftSection={<BsPlusLg size={18} />}
          size={width > 768 ? "md" : "sm"}
          onClick={onClick}
          style={{
            backgroundColor: isDark ? theme.colors.blue[6] : theme.colors.blue[7],
            color: theme.white,
            transition: "background-color 0.3s ease",
          }}
          className="font-extrabold mt-3 sm:mt-0"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
