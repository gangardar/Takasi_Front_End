import { useEffect, useContext, useState } from "react";
import AuthContext from "../../services/contexts/authContext";
import usePassengerLocation from "../../services/queries/usePassengerLocation";
import useGeoLocation from "../../services/hook/useGeoLocation";

const useLocationUpdate = () => {
  const location = useGeoLocation();
  const [lat, setLat] = useState<string>();
  const [lng, setLng] = useState<string>();
  const { authResponse, dispatch } = useContext(AuthContext);
  const passenger = authResponse.user;
  const updateLocation = usePassengerLocation();

  useEffect(() => {
    if (location) {
      setLat(location.lat);
      setLng(location.long);
    }
  }, []);

  useEffect(() => {
    updateLocation.mutate({
      id: passenger.id,
      current_latitude: lat!,
      current_longitude: lng!,
    });
  }, [lat, lng, passenger.id, updateLocation]);

  useEffect(() => {
    if (updateLocation.data) {
      const updatedPassenger = updateLocation.data;

      dispatch({
        type: "LOGIN",
        payload: {
          ...authResponse,
          user: {
            ...authResponse.user,
            current_latitude: updatedPassenger.current_latitude,
            current_longitude: updatedPassenger.current_longitude,
          },
        },
      });
    }
  }, [updateLocation.data, dispatch, authResponse]);
};

export default useLocationUpdate;
