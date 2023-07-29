import { useMutation } from "@tanstack/react-query";
import { PassengerLogin } from "../../components/PassengerLogin";
import APIClient from "../api-client";

const apiClient = new APIClient<PassengerLogin>("passenger/login");

const useLoginPassenger = () => {
  return useMutation<PassengerLogin, Error, PassengerLogin>({
    mutationFn: (passenger: PassengerLogin) => apiClient.post(passenger),

    onSuccess: (data, newdata) => {
      console.log(data);
      console.log(newdata);
    },
    onError: (error) => {
      return error.message;
    },
  });
};

export default useLoginPassenger;
