import { useState } from "react";
import { FaAlignJustify, FaUserLarge } from "react-icons/fa6";
import { Button, Offcanvas } from "react-bootstrap";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <>
      <i
        className=" position-absolute top-0 start-3 ms-2 mt-3 "
        onClick={handleOpen}
      >
        <FaAlignJustify size={30} />
      </i>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-center">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          className="d-flex flex-column align-items-center text-center"
          onClick={handleClose}
        >
          <div
            className="mb-3 rounded-circle bg-white"
            style={{ width: 80, height: 80 }}
          >
            <i className="text-info display-1 shadow-2 text-center">
              <FaUserLarge />
            </i>
          </div>
          <ul className="list-unstyled">
            <li className="m-2">
              <a href="https://www.google.com" target="_blank">
                Booking History
              </a>
            </li>
            <li className="m-2">Edit Profile</li>
            <li className="m-2">Payments</li>
            <li className="m-2">Help/Support</li>
            <li className="m-2">Logout</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
