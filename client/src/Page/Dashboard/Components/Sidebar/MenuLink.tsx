import { Box } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { menuStyles } from "./styles/MenuStyles";

export default function MenuLink({
  text,
  activeMenuPaths,
  link,
  icon,
}: {
  readonly text: string;
  readonly activeMenuPaths?: string;
  readonly link: string;
  readonly icon?: ReactNode;
}) {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const { classes, cx } = menuStyles();

  useEffect(() => {
    if (activeMenuPaths && location.pathname) {
      setIsActive(location.pathname.includes(activeMenuPaths));
    }
  }, [location.pathname, activeMenuPaths]);

  return (
    <Box
      component={Link}
      to={link}
      className={cx(
        classes.menuLink,
        { [classes.active]: isActive },
        "flex items-center no-underline transition-colors duration-200 bg-tranparent"
      )}
    >
      <div className="mt-1">{icon}</div>
      <div className="mx-4 text-lg font-normal">{text}</div>
    </Box>
  );
}
