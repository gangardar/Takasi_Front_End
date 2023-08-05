import { useMutation } from "@tanstack/react-query";
import APIClient from "../api-client";

interface LocationUpdate {
  id: number;
  current_latitude: string;
  current_longitude: string;
}

const apiClient = new APIClient<LocationUpdate>("passenger/updateLocation");

const usePassengerLocation = () => {
  return useMutation<any, Error, LocationUpdate>({
    mutationFn: (passenger: LocationUpdate) => apiClient.post(passenger),

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      return error.message;
    },
  });
};

export default usePassengerLocation;
