import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import useGeoLocation from "../../services/hook/useGeoLocation";
import BookingForm from "../BookingForm";

export type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionResult = google.maps.DirectionsResult;
type MapOption = google.maps.MapOptions;

interface Props {
  center: LatLngLiteral;
}

const Map = ({ center }: Props) => {
  const getLocation = useGeoLocation();
  //Set If a passenger can drage the marker
  const [isDrag, setDrag] = useState(false);
  const DragFromLocation = () => setDrag(!isDrag);

  //Set the Passenger Current Location and Pan there
  // const [isPan, setPan] = useState(false);

  const Pan = () => {
    mapRef.current?.panTo({
      lat: parseFloat(getLocation.lat),
      lng: parseFloat(getLocation.long),
    });
  };

  //Set the Pessenger To Location:
  const [placeTo, setPlaceTo] = useState<LatLngLiteral>();

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

  // useEffect(() => {
  //   if (isPan) {
  //     mapRef.current?.panTo(center);
  //   }
  // }, [isPan, center]);

  {
    placeTo && console.log(placeTo);
  }

  return (
    <>
      <div>
        {
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            options={option}
            onLoad={onLoad}
          >
            <MarkerF
              position={center}
              animation={google.maps.Animation.DROP}
              label={"A"}
            />
            {(placeTo || isDrag) && (
              <MarkerF
                draggable
                position={placeTo ? placeTo : center}
                label={"B"}
              />
            )}
          </GoogleMap>
        }
      </div>
      <div>
        <BookingForm
          DragLocation={DragFromLocation}
          Pan={Pan}
          PlaceTo={(position) => {
            setPlaceTo(position);
            mapRef.current?.panTo(position);
          }}
        />
      </div>
    </>
  );
};

export default Map;
