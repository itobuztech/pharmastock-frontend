import { createStyles } from '@mantine/emotion';

export const menuStyles = createStyles((theme, _, u) => ({
    menuLink: {
        color: theme.colors.gray[9],
        borderRadius: theme.radius.md,
        padding: theme.spacing.sm,

        '&:hover': {
            backgroundColor: theme.colors.blue[2],
        },

        [u.dark]: {
            color: theme.white,
            '&:hover': {
                backgroundColor: theme.colors.blue[8],
            },
        },
    },
    active: {
        backgroundColor: theme.colors.blue[3],
        [u.dark]: {
            backgroundColor: theme.colors.blue[5],
        },
    },
}));