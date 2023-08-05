import { useMutation } from "@tanstack/react-query";
import APIClient from "../api-client";
import { AdminLogin } from "../../components/admin-panel/AdminLogin";

const apiClient = new APIClient<AdminLogin>("admin/login");

const useLoginAdmin = () => {
  return useMutation<any, Error, AdminLogin>({
    mutationFn: (passenger: AdminLogin) => apiClient.post(passenger),

    onSuccess: (data, newdata) => {
      // Store the token in local storage
      localStorage.setItem("apiToken", data.token);

      console.log(data.token);
      console.log(newdata);
    },
    onError: (error) => {
      return error.message;
    },
  });
};

export default useLoginAdmin;
