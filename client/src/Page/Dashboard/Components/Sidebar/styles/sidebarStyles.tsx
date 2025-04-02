import { createStyles } from "@mantine/emotion";

export const sidebarStyles = createStyles((theme, _, u) => ({
  brandText: {
    color: theme.black,
    [u.dark]: {
      color: theme.white,
    },
  },
  nav: {
    backgroundColor: theme.colors.gray[1],
    [u.dark]: {
      backgroundColor: theme.colors.dark[7]
    }
  },
}));
