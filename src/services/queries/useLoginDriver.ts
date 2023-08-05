import { useMutation } from "@tanstack/react-query";
import APIClient from "../api-client";
import { DriverLogin } from "../../components/DriverLogin";

const apiClient = new APIClient<DriverLogin>("driver/login");

const useLoginDriver = () => {
  return useMutation<any, Error, DriverLogin>({
    mutationFn: (passenger: DriverLogin) => apiClient.post(passenger),

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

export default useLoginDriver;
