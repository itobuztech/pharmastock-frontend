import React from "react";
import routes from "Lib/Routes/Routes";
import MenuLink from "./MenuLink";
import { Link } from "react-router-dom";
import { useAppSelector } from "Lib/Store/hooks";
import { USER_PERMISSION_FIELDS } from "enums/enums";
import { UserRole } from "gql/graphql";

export default function SidebarComponent() {
  const permission = useAppSelector((state) => state.user.permission);

  const handleSliderOptionsVisible = (
    field: USER_PERMISSION_FIELDS
  ): boolean => {
    return permission[field]?.CAPABILITIES?.VIEW !== null;
  };

  const user = useAppSelector((state) => state.user);

  return (
    <div
      className="flex flex-col sm:flex-row sm:justify-around"
      data-test-id="dashboard-sidebar"
    >
      <div className="w-72 h-screen">
        <Link
          className="flex items-center justify-start mx-6 mt-10 no-underline"
          to={routes.dashboard.profile.path}
        >
          <span className="text-black  ml-4 text-2xl font-bold">
            Pharma Stock
          </span>
        </Link>
        <nav className="mt-10 px-6 ">
          <MenuLink
            text="Profile"
            activeMenuPaths={routes.dashboard.profile.path}
            link={routes.dashboard.profile.path}
          />

          {user.role === UserRole.Superadmin &&
            handleSliderOptionsVisible(
              USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT
            ) && (
              <MenuLink
                text="Organizations"
                activeMenuPaths={routes.dashboard.organizations.path}
                link={routes.dashboard.organizations.path}
              />
            )}

          {handleSliderOptionsVisible(
            USER_PERMISSION_FIELDS.PHARMACY_MANAGEMENT
          ) && (
            <MenuLink
              text="Pharmacies"
              activeMenuPaths={routes.dashboard.pharmacies.path}
              link={routes.dashboard.pharmacies.path}
            />
          )}
          {handleSliderOptionsVisible(
            USER_PERMISSION_FIELDS.STOCK_MANAGEMENT
          ) && (
            <MenuLink
              text="Pharmacy Stocks"
              activeMenuPaths={routes.dashboard.pharmaciesStock.path}
              link={routes.dashboard.pharmaciesStock.path}
            />
          )}
          {handleSliderOptionsVisible(
            USER_PERMISSION_FIELDS.ITEM_CATEGORIES_MANAGEMENT
          ) && (
            <MenuLink
              text="Item Category"
              activeMenuPaths={routes.dashboard.createItemCategory.path}
              link={routes.dashboard.createItemCategory.path}
            />
          )}
          {handleSliderOptionsVisible(
            USER_PERMISSION_FIELDS.ITEM_MANAGEMENT
          ) && (
            <MenuLink
              text="Items"
              activeMenuPaths={routes.dashboard.itemList.path}
              link={routes.dashboard.itemList.path}
            />
          )}
          {handleSliderOptionsVisible(
            USER_PERMISSION_FIELDS.WAREHOUSE_MANAGEMENT
          ) && (
            <MenuLink
              text="Warehouse"
              activeMenuPaths={routes.dashboard.warehouseList.path}
              link={routes.dashboard.warehouseList.path}
            />
          )}
          {handleSliderOptionsVisible(
            USER_PERMISSION_FIELDS.STOCK_MANAGEMENT
          ) && (
            <MenuLink
              text="Warehouse Stocks"
              activeMenuPaths={routes.dashboard.warehouseStock.path}
              link={routes.dashboard.warehouseStock.path}
            />
          )}
          {handleSliderOptionsVisible(
            USER_PERMISSION_FIELDS.USER_MANAGEMENT
          ) && (
            <MenuLink
              text="Users"
              activeMenuPaths={routes.dashboard.users.path}
              link={routes.dashboard.users.path}
            />
          )}
          <MenuLink text="Logout" link={routes.logout.path} />
        </nav>
      </div>
    </div>
  );
}
