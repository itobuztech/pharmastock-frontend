import { Link } from "react-router-dom";
import {
  ActionIcon,
  Burger,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { FiSun, FiMoon } from "react-icons/fi";
import { sidebarStyles } from "Page/Dashboard/Components/Sidebar/styles/sidebarStyles";

export default function HeaderComponent({
  handleMobileDrawer,
  sidebarOpened,
}: {
  handleMobileDrawer?: any;
  sidebarOpened?: boolean;
}) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const theme = useMantineTheme();
  const isDark = computedColorScheme === "dark";
  const { toggleColorScheme } = useMantineColorScheme();
  const { classes } = sidebarStyles();

  return (
    <nav className={`${classes.nav} lg:hidden shadow-md`}>
      <div className="mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link className="no-underline" to={"/dashboard"}>
              <span className={`${classes.brandText} text-2xl font-bold`}>
                Pharma Stock
              </span>
            </Link>
          </div>
          <div className="flex gap-5 items-center">
            {!sidebarOpened && (
              <div className="-mr-2 flex lg:hidden">
                <Burger
                  opened={sidebarOpened || false}
                  onClick={handleMobileDrawer}
                />
              </div>
            )}
            {!sidebarOpened && (
              <ActionIcon
                onClick={toggleColorScheme}
                size="lg"
                variant="default"
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </ActionIcon>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
