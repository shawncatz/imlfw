import * as ReactDOMClient from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { SnackbarProvider } from "notistack";

import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MOUNT_NODE = document.getElementById("root") as HTMLElement;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      staleTime: 5 * 1000,
      throwOnError: true,
    },
  },
});

export const Root = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        disableWindowBlurListener={true}
        TransitionProps={{ direction: "down" }}
        dense={true}
      >
        <Router>
          <CssBaseline />
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </HelmetProvider>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const rootNode = ReactDOMClient.createRoot(MOUNT_NODE!);
rootNode.render(<Root />);

// Hot reloadable translation json files
// if (module.hot) {
//   module.hot.accept(['./locales/i18n'], () => {
//     // No need to render the App again because i18next works with the hooks
//   });
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
