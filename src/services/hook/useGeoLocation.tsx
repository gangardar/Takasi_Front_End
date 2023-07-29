import React, { useEffect, useState } from "react";
const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {
      lat: "",
      long: "",
    },
  });

  const onSuccess = (location: any) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation((state) => ({
        ...state,
        loaded: true,
        error: {
          code: 0,
          message: "Browser location is not support!",
        },
      }));
    }

    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return location.coordinates;
};

export default useGeoLocation;
