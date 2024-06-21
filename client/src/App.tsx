import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MantineProvider } from "@mantine/core";

import ScrollToTop from "./Components/ScrollToTop";
import TrackRedirectLinks from "./Components/TrackRedirectLinks";
import AppRoutes from "./Lib/Routes/AppRoutes";

import { ApolloProvider } from "@apollo/client";
import client from "aplloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ToastContainer />
        <MantineProvider>
          <ScrollToTop />
          <TrackRedirectLinks />
          <AppRoutes />
        </MantineProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
