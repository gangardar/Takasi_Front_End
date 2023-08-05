import React, { useContext, useEffect, useState } from "react";
import { FaAlignJustify, FaUserCircle, FaPencilAlt } from "react-icons/fa";
import { Button, Offcanvas } from "react-bootstrap";
import AuthContext from "../services/contexts/authContext";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import PassengerPhoto from "./PassengerPhoto";

const SideBar = () => {
  const navigate = useNavigate();
  const { authResponse } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const logoutToggel = () => {
    setShowLogout(!showLogout);
  };
  const ShowProfile = () => {
    setShowProfile(!showProfile);
  };

  useEffect(() => {
    if (!authResponse.isAuthenticated || authResponse.role !== "passenger") {
      navigate("/");
    }
  }, [authResponse]);

  const passenger = authResponse.user;

  return (
    <>
      <div
        className="position-fixed top-0  mt-3 ms-3 border-0 rounded-circle shadow"
        onClick={handleOpen}
        title="Menu"
      >
        <FaAlignJustify size={30} />
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="start">
        {logoutToggel && (
          <LogoutModal showLogout={showLogout} logoutToggel={logoutToggel} />
        )}
        {ShowProfile && (
          <PassengerPhoto showLogout={showProfile} logoutToggle={ShowProfile} />
        )}

        <Offcanvas.Header closeButton className="bg-dark">
          {" "}
          <Offcanvas.Title className="text-center fs-4 text-white">
            Welcome, {passenger?.name} {/* Display passenger's name */}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column align-items-center text-center bg-secondary bg-gradient">
          <div
            className="mb-4 position-relative rounded-circle bg-secondary d-flex justify-content-center align-items-center"
            style={{
              width: 100,
              height: 100,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {passenger?.photo ? (
              <img
                src={passenger.photo}
                alt={passenger.name}
                className="img-fluid rounded-circle"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <FaUserCircle className="text-info display-1" />
            )}
            <div
              className="position-absolute end-0 bottom-0"
              style={{ cursor: "pointer" }}
            >
              <i
                className="input form-control-file "
                onClick={() => {
                  ShowProfile();
                  console.log(showProfile);
                }}
              >
                <FaPencilAlt size={20} />
              </i>
            </div>
          </div>
          <ul className="list-unstyled">
            <li className="my-2">
              <a
                href="https://www.google.com"
                target="_blank"
                className="text-decoration-none fs-5 text-dark"
              >
                Booking History
              </a>
            </li>
            <li className="my-2">
              <a
                href="#edit-profile"
                className="text-decoration-none fs-5 text-dark"
              >
                Edit Profile
              </a>
            </li>
            <li className="my-2">
              <a
                href="#payments"
                className="text-decoration-none fs-5 text-dark"
              >
                Payments
              </a>
            </li>
            <li className="my-2">
              <a href="#help" className="text-decoration-none fs-5 text-dark">
                Help/Support
              </a>
            </li>
            <li className="my-2" onClick={() => logoutToggel()}>
              <a
                href="#logout"
                className="text-decoration-none fs-5 text-danger"
              >
                Logout
              </a>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
