import { createStyles } from "@mantine/emotion";

export const tableStyles = createStyles((theme, _, u) => ({
  container: {
    backgroundColor: theme.white,

    [u.dark]: {
      backgroundColor: theme.colors.dark[7],
    },
  },

  tableHeader: {
    backgroundColor: theme.colors.gray[0],

    [u.dark]: {
      backgroundColor: theme.colors.dark[6],
    },
  },

  pagination: {
    color: theme.colors.dark[7],

    [u.dark]: {
      color: theme.colors.gray[2],
    },
  },

  rowHover: {
    "&:hover": {
      backgroundColor: theme.colors.gray[1],

      [u.dark]: {
        backgroundColor: theme.colors.dark[6],
      },
    },
  },

  skeletonBackground: {
    backgroundColor: theme.colors.gray[2],

    [u.dark]: {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));
