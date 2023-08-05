import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.css";
import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routing/routes.tsx";
import AuthContext from "./services/contexts/authContext.ts";
import authReducer from "./services/reducers/authReducer.ts";

const savedAuthData = localStorage.getItem("authData");
const initialAuthState = savedAuthData
  ? JSON.parse(savedAuthData)
  : {
      isAuthenticated: false,
      user: null,
      role: "",
    };

// Create the AuthContext.Provider and wrap the components that need access to the authentication state.
const App = () => {
  const [authResponse, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ authResponse, dispatch }}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
