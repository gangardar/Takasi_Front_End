import { useMutation } from "@tanstack/react-query";
import APIClient from "../api-client";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";

const apiClient = new APIClient<FormData>("passenger/update");

const useCreateDriver = () => {
  const { authResponse, dispatch } = useContext(AuthContext);
  return useMutation<any, Error, FormData>({
    mutationFn: (driver: FormData) => apiClient.post(driver),

    onSuccess: async (data) => {
      console.log(data);
      dispatch({
        type: "LOGIN",
        payload: {
          isAuthenticated: true,
          user: data.passenger,
          role: data.role,
        },
      });
      if (authResponse.isAuthenticated) {
        console.log("authentication", authResponse);
        localStorage.setItem("authData", JSON.stringify(authResponse));
      }
    },
    onError: (error) => {
      return error.message;
    },
  });
};

export default useCreateDriver;
