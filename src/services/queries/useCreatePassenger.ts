import { useMutation } from "@tanstack/react-query";
import { PassengerFormData } from "../../components/PassengerReg";
import axios from "axios";

const useCreatePassenger = () => {
  return useMutation<PassengerFormData, Error, PassengerFormData>({
    mutationFn: (passenger: PassengerFormData) =>
      axios
        .post<PassengerFormData>(
          "http://127.0.0.1:8000/api/passenger/",
          passenger
        )
        .then((res) => res.data),

    onSuccess: (data, newdata) => {
      console.log(data);
      console.log(newdata);
    },
  });
};

export default useCreatePassenger;
