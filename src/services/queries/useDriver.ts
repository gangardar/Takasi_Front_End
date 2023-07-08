import { useQuery } from "@tanstack/react-query";
import APIClient from "../api-client";
import { DriverFormData } from "../../components/driver_registration/DriverPersonal";

const apiClient = new APIClient<DriverFormData>("/driver");

const useDriver = () => {
  const fetchPassenger = () => apiClient.getAll();

  return useQuery<DriverFormData[], Error>({
    queryKey: ["drivers"],
    queryFn: fetchPassenger,
  });
};
export default useDriver;
