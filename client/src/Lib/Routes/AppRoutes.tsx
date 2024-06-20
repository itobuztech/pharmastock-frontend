import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthGuard } from '../Guards/AuthGuard';
import routes from './Routes';

const NotFound = React.lazy(() => import('Page/NotFoundPage'));
const IndexPage = React.lazy(() => import('Page/Index'));

import { AuthRoutes } from 'Page/Auth/AuthRoutes';

const DashboardPage = React.lazy(() => import('Page/Dashboard/DashboardPage'));
const ProfilePage = React.lazy(() => import('Page/Profile/ProfilePage'));

export default function AppRoutes() {
  return (
    <div>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path={routes.home.path} element={<IndexPage />} />

          <Route path={routes.dashboard.path} element={<DashboardPage />}>
            <Route path={routes.dashboard.me.path} element={<AuthGuard />}>
              <Route path={routes.dashboard.me.path} element={(<ProfilePage />)} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
          {AuthRoutes}
          
        </Routes>
      </Suspense>
    </div>
  );
}
