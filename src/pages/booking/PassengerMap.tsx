import React from "react";
import SideBar from "../../components/SideBar";
import MapsComponent from "../../components/Maps";
import BookingInitial from "../../components/BookingInitial";

const PassengerMap = () => {
  const center = {
    lat: 22.922459,
    lng: 96.5119287,
  };
  return (
    <>
      <MapsComponent center={center} zoom={15} />
      <SideBar />
      <BookingInitial />
    </>
  );
};

export default PassengerMap;
