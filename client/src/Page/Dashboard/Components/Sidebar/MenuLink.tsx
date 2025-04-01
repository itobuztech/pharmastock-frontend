import { Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { menuStyles } from "./MenuStyles";

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
      className={cx(classes.menuLink, { [classes.active]: isActive }, 
        "flex items-center no-underline transition-colors duration-200 bg-tranparent")}
    >
      <span className="mx-4 text-lg font-normal">{text}</span>
    </Box>
  );
}
