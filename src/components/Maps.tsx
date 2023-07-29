import React, { useCallback, useMemo, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOption = google.maps.MapOptions;

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const Map = ({ center, zoom }: MapProps) => {
  const mapRef = useRef<GoogleMap>();
  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const option = useMemo<MapOption>(
    () => ({
      mapId: "baef3660a9c97d22",
      disableDefaultUI: true,
      clickableIcon: false,
    }),
    []
  );
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDj40AQyK_j5oCfvLvBJOqZtUuTlLhVCKk",
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          options={option}
          onLoad={onLoad}
        ></GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Map;
