/* eslint-disable max-len */
import React from "react";
import { Link } from "react-router-dom";
import { Burger } from "@mantine/core";

export default function HeaderComponent({
  handleMobileDrawer,
  sidebarOpened,
}: {
  handleMobileDrawer?: any;
  sidebarOpened?: boolean;
}) {
  return (
    <div>
      <nav className="bg-white shadow lg:hidden">
        <div className="mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <Link className="no-underline" to={"/dashboard"}>
                <span className="text-black text-2xl font-bold">
                  Pharma Stock
                </span>
              </Link>
            </div>

            <div className="-mr-2 flex lg:hidden">
              <Burger
                opened={sidebarOpened || false}
                onClick={handleMobileDrawer}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
