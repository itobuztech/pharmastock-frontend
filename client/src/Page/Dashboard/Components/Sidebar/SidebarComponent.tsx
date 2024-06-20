import React from 'react';
import routes from 'Lib/Routes/Routes';
import MenuLink from './MenuLink';
import { FaReact } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { dashboardRoutes } from 'Lib/Routes/DashboardRoutes';
export default function SidebarComponent() {
  return (
    <div 
      className='flex flex-col sm:flex-row sm:justify-around' 
      data-test-id="dashboard-sidebar">
      <div className='w-72 h-screen'>
        <Link className='flex items-center justify-start mx-6 mt-10 no-underline' to={dashboardRoutes.me.fullPath}>
          <FaReact size={'40px'}  />
          <span className='text-gray-600  ml-4 text-2xl font-bold'>
            React UI Kit
          </span>
        </Link>
        <nav className='mt-10 px-6 '>

          <MenuLink
            text='Profile'
            activeMenuPaths={routes.dashboard.me.path}
            link={routes.dashboard.me.path}
          />

          <MenuLink
            text='Logout'
            link={routes.logout.path}
          />
          
        </nav>
      </div>
    </div>
  );
}
