import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/PassengerSideBar";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../services/contexts/authContext";
import { LoadScriptProps, useLoadScript } from "@react-google-maps/api";
import MapSpinner from "../../components/map/MapSpinner";
import Maps from "../../components/map/Maps";
import useGeoLocation from "../../services/hook/useGeoLocation";

const libraries: LoadScriptProps["libraries"] = ["places"];

const PassengerMap = () => {
  //To Location Setting
  const navigate = useNavigate();
  const { authResponse } = useContext(AuthContext);

  useEffect(() => {
    if (!authResponse.isAuthenticated || authResponse.role !== "passenger") {
      return navigate("/");
      console.log(authResponse);
    }
  }, [authResponse]);

  if (!authResponse.isAuthenticated || authResponse.role !== "passenger") {
    return navigate("/");
    console.log(authResponse);
  }

  const center = {
    lat: parseFloat(authResponse.user.current_latitude),
    lng: parseFloat(authResponse.user.current_longitude),
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "Add your API key",
    libraries,
  });

  if (!isLoaded) return <MapSpinner />;
  return (
    <>
      <Maps center={center} />
      <SideBar />
    </>
  );
};

export default PassengerMap;
