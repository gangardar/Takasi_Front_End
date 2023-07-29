import { useMutation } from "@tanstack/react-query";
import APIClient from "../api-client";
import { DriverLogin } from "../../components/DriverLogin";

const apiClient = new APIClient<DriverLogin>("driver/login");

const useLoginDriver = () => {
  return useMutation<DriverLogin, Error, DriverLogin>({
    mutationFn: (passenger: DriverLogin) => apiClient.post(passenger),

    onSuccess: (data, newdata) => {
      console.log(data);
      console.log(newdata);
    },
    onError: (error) => {
      return error.message;
    },
  });
};

export default useLoginDriver;
