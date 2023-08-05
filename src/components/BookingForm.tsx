import { Autocomplete, StandaloneSearchBox } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FaLocationArrow } from "react-icons/fa";
import {
  FaLocationCrosshairs,
  FaLocationPin,
  FaLocationPinLock,
  FaMapLocationDot,
} from "react-icons/fa6";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface Props {
  Pan: () => void;
  DragLocation: () => void;
  PlaceTo: (position: google.maps.LatLngLiteral) => void;
}

const BookingForm = ({ Pan, PlaceTo, DragLocation }: Props) => {
  const inputRef = useRef<any>();
  //OffCanvas State
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  //Places Auto Complete
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const result = await getGeocode({ address: val });
    const { lat, lng } = getLatLng(result[0]);
    console.log(val);
    handleClose();

    PlaceTo({ lat, lng });
  };

  return (
    <>
      {/* Button to open the drawer */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
        <Button className="border-0 shadow" onClick={handleOpen} title="Menu">
          Book a Takasi.
        </Button>
      </div>

      {/* Slide-out drawer */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        backdrop={false}
        style={{ borderRadius: "20px 20px 0 0", height: "fit-content" }}
      >
        <Offcanvas.Header
          className="position-absolute top-0 end-0"
          closeButton
        ></Offcanvas.Header>
        <Offcanvas.Title className="p-3 mb-0">Get a ride</Offcanvas.Title>
        <Offcanvas.Body>
          <form>
            <div className="mb-3 d-flex">
              <input
                disabled={true}
                type="text"
                className="form-control p-2 flex-grow-1"
                placeholder="From:"
              />
              <i className="p-2 btn btn-outline-dark ms-1" onClick={Pan}>
                <FaLocationCrosshairs />
              </i>
            </div>
            <div className="mb-3">
              <label htmlFor="to" className="form-label">
                To:{" "}
              </label>

              <div className="mb-3 d-flex">
                <input
                  id="to"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={!ready}
                  type="text"
                  className="form-control form-control p-2 flex-grow-1"
                  placeholder="Search For Places"
                />
                <i
                  className="p-2 btn btn-outline-success ms-1"
                  onClick={() => {
                    DragLocation(), handleClose();
                  }}
                >
                  {" "}
                  <FaLocationArrow />
                </i>
              </div>
              <div>
                <ul className="list-group mt-1">
                  {status === "OK" &&
                    data.map(({ place_id, description }) => (
                      <li
                        key={place_id}
                        onClick={() => handleSelect(description)}
                        className="list-group-item list-group-item-info"
                      >
                        <i className="p-2">
                          <FaMapLocationDot />
                        </i>
                        {description}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleClose}>
                Start Trip
              </Button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default BookingForm;
