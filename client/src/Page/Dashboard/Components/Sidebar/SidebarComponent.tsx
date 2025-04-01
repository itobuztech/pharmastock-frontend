import { Link } from "react-router-dom";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { FiSun, FiMoon } from "react-icons/fi";
import { GoOrganization } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import {
  MdOutlineLocalPharmacy,
  MdOutlineWarehouse,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { RiStockLine } from "react-icons/ri";
import { PiSignOut, PiUsersBold } from "react-icons/pi";

import routes from "Lib/Routes/Routes";
import MenuLink from "./MenuLink";
import { useAppSelector } from "Lib/Store/hooks";
import { USER_PERMISSION_FIELDS } from "enums/enums";
import { UserRole } from "gql/graphql";
import { sidebarStyles } from "./styles/sidebarStyles";

export default function SidebarComponent() {
  const permission = useAppSelector((state) => state.user.permission);
  const user = useAppSelector((state) => state.user);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const { classes } = sidebarStyles();

  const handleSliderOptionsVisible = (
    field: USER_PERMISSION_FIELDS
  ): boolean => {
    if (!permission || !permission[field]) {
      return false;
    }
    return permission[field]?.CAPABILITIES?.VIEW !== null;
  };

  return (
    <div
      className="flex flex-col h-full w-full"
      data-test-id="dashboard-sidebar"
    >
      <div className="flex items-center justify-between mx-6 mt-5 pb-4 lg:mt-6 border-b border-gray-300">
        <Link
          className="flex items-center no-underline"
          to={routes.dashboard.profile.path}
        >
          <span className={`ml-4 text-2xl font-bold ${classes.brandText}`}>
            Pharma Stock
          </span>
        </Link>

        <ActionIcon onClick={toggleColorScheme} size="lg" variant="default">
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </ActionIcon>
      </div>

      <nav className="mt-7 px-6 overflow-y-auto flex flex-col flex-grow">
        <MenuLink
          icon={<FaUser size={20} />}
          text="Profile"
          activeMenuPaths={routes.dashboard.profile.path}
          link={routes.dashboard.profile.path}
        />

        {user.role === UserRole.Superadmin &&
          handleSliderOptionsVisible(
            USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT
          ) && (
            <MenuLink
              icon={<GoOrganization size={20} />}
              text="Organizations"
              activeMenuPaths={routes.dashboard.organizations.path}
              link={routes.dashboard.organizations.path}
            />
          )}

        {handleSliderOptionsVisible(
          USER_PERMISSION_FIELDS.ITEM_CATEGORIES_MANAGEMENT
        ) && (
          <MenuLink
            icon={<BiCategoryAlt size={20} />}
            text="Categories"
            activeMenuPaths={routes.dashboard.categoryList.path}
            link={routes.dashboard.categoryList.path}
          />
        )}

        {handleSliderOptionsVisible(USER_PERMISSION_FIELDS.ITEM_MANAGEMENT) &&
          user.role !== UserRole.Staff && (
            <MenuLink
              icon={<MdProductionQuantityLimits size={20} />}
              text="Products"
              activeMenuPaths={routes.dashboard.productList.path}
              link={routes.dashboard.productList.path}
            />
          )}

        {handleSliderOptionsVisible(
          USER_PERMISSION_FIELDS.WAREHOUSE_MANAGEMENT
        ) &&
          user.role !== UserRole.Staff && (
            <MenuLink
              icon={<MdOutlineWarehouse size={20} />}
              text="Warehouses"
              activeMenuPaths={routes.dashboard.warehouseList.path}
              link={routes.dashboard.warehouseList.path}
            />
          )}

        {handleSliderOptionsVisible(
          USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN
        ) && (
          <MenuLink
            icon={<MdOutlineWarehouse size={20} />}
            text="Warehouse Stocks"
            activeMenuPaths={routes.dashboard.warehouseStock.path}
            link={routes.dashboard.warehouseStock.path}
          />
        )}

        {handleSliderOptionsVisible(
          USER_PERMISSION_FIELDS.PHARMACY_MANAGEMENT
        ) &&
          user.role !== UserRole.Staff && (
            <MenuLink
              icon={<MdOutlineLocalPharmacy size={20} />}
              text="Pharmacies"
              activeMenuPaths={routes.dashboard.pharmacies.path}
              link={routes.dashboard.pharmacies.path}
            />
          )}

        {(handleSliderOptionsVisible(
          USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN
        ) ||
          handleSliderOptionsVisible(
            USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_STAFF
          )) && (
          <MenuLink
            icon={<MdOutlineLocalPharmacy size={20} />}
            text="Pharmacy Stocks"
            activeMenuPaths={routes.dashboard.pharmaciesStock.path}
            link={routes.dashboard.pharmaciesStock.path}
          />
        )}

        <MenuLink
          icon={<RiStockLine size={20} />}
          text="Stocks History"
          activeMenuPaths={routes.dashboard.stocksHistory.path}
          link={routes.dashboard.stocksHistory.path}
        />

        {handleSliderOptionsVisible(USER_PERMISSION_FIELDS.USER_MANAGEMENT) && (
          <MenuLink
            icon={<PiUsersBold size={20} />}
            text="Users"
            activeMenuPaths={routes.dashboard.users.path}
            link={routes.dashboard.users.path}
          />
        )}
      </nav>

      <div className="mx-5 mt-8 lg:mt-0 py-2 lg:py-5 border-t border-gray-300">
        <MenuLink
          icon={<PiSignOut size={20} />}
          text="Logout"
          link={routes.logout.path}
        />
      </div>
    </div>
  );
}
