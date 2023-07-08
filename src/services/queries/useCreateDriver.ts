import { useMutation } from "@tanstack/react-query";
import APIClient from "../api-client";
import { DriverFormData } from "../../components/driver_registration/DriverPersonal";

const apiClient = new APIClient<DriverFormData>("driver");

const useCreateDriver = () => {
  return useMutation<DriverFormData, Error, DriverFormData>({
    mutationFn: (driver: DriverFormData) => apiClient.post(driver),

    onSuccess: (data, newdata) => {
      console.log(data);
      console.log(newdata);
    },
  });
};

export default useCreateDriver;
