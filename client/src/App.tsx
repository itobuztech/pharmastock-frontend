import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "react-datepicker/dist/react-datepicker.css";

import ScrollToTop from "./Components/ScrollToTop";
import TrackRedirectLinks from "./Components/TrackRedirectLinks";
import AppRoutes from "./Lib/Routes/AppRoutes";

import { ApolloProvider } from "@apollo/client";
import client from "aplloClient";

const theme = createTheme({
  cursorType: "pointer",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ToastContainer />
        <MantineProvider theme={theme}>
          <ScrollToTop />
          <TrackRedirectLinks />
          <AppRoutes />
        </MantineProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
