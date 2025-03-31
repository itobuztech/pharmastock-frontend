import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MenuLink({
  text,
  activeMenuPaths,
  link,
}: {
  readonly text: string;
  readonly activeMenuPaths?: string;
  readonly link: string;
}) {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    if (activeMenuPaths && location.pathname) {
      setIsActive(location.pathname.includes(activeMenuPaths));
    }
  }, [location.pathname, activeMenuPaths]);

  return (
    <Box
      component={Link}
      to={link}
      style={{
        backgroundColor: isActive
          ? isDark
            ? theme.colors.blue[5]
            : theme.colors.blue[3]
          : "transparent",
        color: isDark ? theme.white : theme.colors.gray[9],
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = isDark
          ? theme.colors.blue[7]
          : theme.colors.blue[2])
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = isActive
          ? isDark
            ? theme.colors.blue[8]
            : theme.colors.blue[1]
          : "transparent")
      }
      className={` flex items-center p-2 py-3 mb-1 transition-colors  duration-200  rounded-lg no-underline `}
    >
      <span className="mx-4 text-lg font-normal">{text}</span>
    </Box>
  );
}
