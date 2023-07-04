import { useQuery } from "@tanstack/react-query";
import { PassengerFormData } from "../../components/PassengerReg";
import APIClient from "../api-client";

const apiClient = new APIClient<PassengerFormData>("/passenger");

const usePassengers = () => {
  const fetchPassenger = () => apiClient.getAll();

  return useQuery<PassengerFormData[], Error>({
    queryKey: ["Passengers"],
    queryFn: fetchPassenger,
  });
};
export default usePassengers;
