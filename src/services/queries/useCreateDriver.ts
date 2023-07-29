import { useMutation } from "@tanstack/react-query";
import APIClient from "../api-client";
import { DriverFormData } from "../../components/driver_registration/DriverPersonal";
import { date } from "zod";

const apiClient = new APIClient<DriverFormData>("driver/register");

// const driverForm = async (data: DriverFormData) => {
//   const formData = new FormData();
//   formData.append("name", data.name);
//   formData.append("photo", data.photo[0]);
//   formData.append("email", data.email);
//   formData.append("lincenceNo", data.lincenceNo);
//   formData.append("phone", data.phone);
//   formData.append("status", "active");
//   formData.append("password", data.password);
//   formData.append("current_latitude", data.current_latitude);
//   formData.append("current_longitude", data.current_longitude);
//   formData.append("drivingLincence", data.drivingLincence[0]);
//   return formData;
// };

const useCreateDriver = () => {
  return useMutation<DriverFormData, Error, DriverFormData>({
    // mutationFn: (driverForm) => apiClient.post(driverForm),
    mutationFn: (driver) => apiClient.post(driver),

    onSuccess: (data, newdata) => {
      console.log(data);
      console.log(newdata);
    },
    onError: (error) => {
      return error.message;
    },
  });
};

export default useCreateDriver;
