import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MantineProvider } from '@mantine/core';

import ScrollToTop from './Components/ScrollToTop';
import TrackRedirectLinks from './Components/TrackRedirectLinks';
import AppRoutes from './Lib/Routes/AppRoutes';

function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <MantineProvider>
        <ScrollToTop />
        <TrackRedirectLinks />
        <AppRoutes />
      </MantineProvider>
    </div>
  );
}

export default App;
