import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useLogoutUser from "../services/queries/useLogoutUser";
import AuthContext from "../services/contexts/authContext";
import { useNavigate } from "react-router-dom";

interface Props {
  showLogout: boolean;
  logoutToggel: () => void;
}

const LogoutModal = ({ showLogout, logoutToggel }: Props) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const logout = useLogoutUser();
  const [isLoggedOut, setLoggedOut] = useState(false);

  const handleClick = () => {
    logout.mutate("");
    logoutToggel();
  };

  useEffect(() => {
    if (logout.isSuccess) {
      // Set the flag to indicate logout is completed
      setLoggedOut(true);
      localStorage.clear();
      dispatch({
        type: "LOGOUT",
      });
      navigate("/");
      console.log("I was here");
    } else if (logout.isError) {
      // Handle any errors during logout, e.g., show an error message
      console.error("Error occurred during logout:", logout.error);
    }
  }, [logout.isSuccess, logout.isError, dispatch, navigate]);

  return (
    <Modal show={showLogout} onHide={logoutToggel} animation={true}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        Woohoo, Are you sure you want to <b>logout!</b>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClick}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
