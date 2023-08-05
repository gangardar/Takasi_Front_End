import { useMutation } from "@tanstack/react-query";
import APIClient from "../api-client";

const apiClient = new APIClient<any>("all/auth");

const useRetrieveUser = () => {
  return useMutation<any, Error, any>({
    mutationFn: (apiToken: string) => apiClient.post(apiToken),

    onSuccess: (data, newdata) => {
      // Store the token in local storage
      console.log("somedata", data);

      console.log(newdata);
    },
    onError: (error) => {
      return error.message;
    },
  });
};

export default useRetrieveUser;
