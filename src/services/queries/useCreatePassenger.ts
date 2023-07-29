import { useMutation } from "@tanstack/react-query";
import { PassengerFormData } from "../../components/PassengerReg";
import APIClient from "../api-client";

const apiClient = new APIClient<PassengerFormData>("passenger/register");

const useCreatePassenger = () => {
  return useMutation<PassengerFormData, Error, PassengerFormData>({
    mutationFn: (passenger: PassengerFormData) => apiClient.post(passenger),

    onSuccess: (data, newdata) => {
      console.log(data);
      console.log(newdata);
    },
  });
};

export default useCreatePassenger;
