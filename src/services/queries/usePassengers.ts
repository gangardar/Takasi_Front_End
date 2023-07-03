import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PassengerFormData } from "../../components/PassengerReg";

const usePassengers = () => {
  const fetchPassenger = () =>
    axios
      .get<PassengerFormData[]>("http://127.0.0.1:8000/api/passenger/", {
        params: {},
      })
      .then((res) => res.data);

  return useQuery<PassengerFormData[], Error>({
    queryKey: ["Passengers"],
    queryFn: fetchPassenger,
  });
};
export default usePassengers;
