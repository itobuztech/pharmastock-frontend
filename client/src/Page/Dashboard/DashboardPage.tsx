import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import {
  AppShell,
  Drawer,
  Skeleton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

import HeaderComponent from "../../Components/Header/HeaderComponent";
import SidebarComponent from "./Components/Sidebar/SidebarComponent";
import "./_dashboardPage.scoped.scss";

function DashboardLoadingUi() {
  const { height } = useViewportSize();
  return <Skeleton height={height} />;
}

export default function DashboardPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { width } = useViewportSize();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

  return (
    <AppShell
      navbar={{
        width: 320,
        breakpoint: "sm",
        collapsed: { mobile: true, desktop: false },
      }}
      header={width > 768 ? undefined : { height: 60 }}
      className="transition-all duration-300"
      style={{
        backgroundColor: theme.colors.gray[isDark ? 9 : 0],
        color: theme.colors.gray[isDark ? 0 : 9],
      }}
    >
      {width <= 768 && (
        <AppShell.Header>
          <HeaderComponent handleMobileDrawer={open} sidebarOpened={opened} />
        </AppShell.Header>
      )}

      <AppShell.Navbar
        hidden={width <= 768}
        className="max-h-screen overflow-y-auto"
        style={{
          backgroundColor: theme.colors.gray[isDark ? 8 : 1],
          color: theme.colors.gray[isDark ? 1 : 8],
        }}
      >
        <SidebarComponent />
      </AppShell.Navbar>

      <Drawer
        opened={opened}
        onClose={close}
        styles={{
          body: {
            backgroundColor: theme.colors.gray[isDark ? 9 : 0],
            color: theme.colors.gray[isDark ? 0 : 9],
          },
        }}
      >
        <SidebarComponent />
      </Drawer>

      <AppShell.Main>
        <Suspense fallback={<DashboardLoadingUi />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
