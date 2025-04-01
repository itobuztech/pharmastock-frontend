import { createStyles } from "@mantine/emotion";

export const dashboardStyles = createStyles((theme, _, u) => ({
  appShell: {
    transition: "all 0.3s ease",
    backgroundColor: theme.colors.gray[0],
    color: theme.colors.gray[9],

    [u.dark]: {
      color: theme.colors.gray[0],
      backgroundColor: theme.colors.gray[9],
    },
  },
  sidebar: {
    backgroundColor: theme.colors.gray[1],
    color: theme.colors.gray[8],

    [u.dark]: {
      backgroundColor: theme.colors.gray[8],
      color: theme.colors.gray[1],
    },
  },
  drawerBody: {
    backgroundColor: theme.colors.gray[0],
    color: theme.colors.gray[9],

    [u.dark]: {
      backgroundColor: theme.colors.gray[9],
      color: theme.colors.gray[0],
    },
  },
}));
