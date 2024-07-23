import React from "react";
import routes from "Lib/Routes/Routes";
import MenuLink from "./MenuLink";
import { Link } from "react-router-dom";

export default function SidebarComponent() {
  return (
    <div
      className="flex flex-col sm:flex-row sm:justify-around"
      data-test-id="dashboard-sidebar"
    >
      <div className="w-72 h-screen">
        <Link
          className="flex items-center justify-start mx-6 mt-10 no-underline"
          to={`/${routes.dashboard}`}
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

          <MenuLink
            text="Organizations"
            activeMenuPaths={routes.dashboard.organizations.path}
            link={routes.dashboard.organizations.path}
          />

          <MenuLink
            text="Pharmacies"
            activeMenuPaths={routes.dashboard.pharmacies.path}
            link={routes.dashboard.pharmacies.path}
          />

          <MenuLink
            text="Pharmacy Stocks"
            activeMenuPaths={routes.dashboard.pharmaciesStock.path}
            link={routes.dashboard.pharmaciesStock.path}
          />

          <MenuLink
            text="Item Category"
            activeMenuPaths={routes.dashboard.createItemCategory.path}
            link={routes.dashboard.createItemCategory.path}
          />

          <MenuLink
            text="Items"
            activeMenuPaths={routes.dashboard.itemList.path}
            link={routes.dashboard.itemList.path}
          />

          <MenuLink
            text="Warehouse"
            activeMenuPaths={routes.dashboard.warehouseList.path}
            link={routes.dashboard.warehouseList.path}
          />

          <MenuLink
            text="Warehouse Stocks"
            activeMenuPaths={routes.dashboard.warehouseStock.path}
            link={routes.dashboard.warehouseStock.path}
          />

          <MenuLink
            text="Users"
            activeMenuPaths={routes.dashboard.users.path}
            link={routes.dashboard.users.path}
          />

          <MenuLink text="Logout" link={routes.logout.path} />
        </nav>
      </div>
    </div>
  );
}
