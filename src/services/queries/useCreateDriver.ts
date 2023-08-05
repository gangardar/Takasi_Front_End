import { useMutation } from "@tanstack/react-query";
import APIClient from "../api-client";

const apiClient = new APIClient<FormData>("driver/register");

const useCreateDriver = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: (driver: FormData) => apiClient.post(driver),

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      return error.message;
    },
  });
};

export default useCreateDriver;
