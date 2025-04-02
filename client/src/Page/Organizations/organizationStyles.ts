import { createStyles } from "@mantine/emotion";

export const organizationStyles = createStyles((theme, _, u) => ({
  list: {
    color: theme.colors.gray[7],

    [u.dark]: {
      color: theme.white,
    },
  },
}));
