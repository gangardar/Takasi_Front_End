import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../services/contexts/authContext";
import useLogoutUser from "../../services/queries/useLogoutUser";

const AdminLogout = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { authResponse, dispatch } = useContext(AuthContext);
  const logout = useLogoutUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authResponse.isAuthenticated) {
      return navigate("/admin/admin-login");
    }
  }, [authResponse]);

  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };

  const handleClick = () => {
    {
      logout.mutate("");
    }
    {
      Toggle();
    }
  };

  useEffect(() => {
    if (logout.isSuccess) {
      setIsLoggedOut(true); // Set the flag to indicate logout is completed
      localStorage.clear();
      dispatch({
        type: "LOGOUT",
      });
    }
  }, [logout.isSuccess, dispatch]);

  useEffect(() => {
    // After logout is completed and localStorage is cleared, navigate to login page
    if (isLoggedOut) {
      navigate("/admin/");
    }
  }, [isLoggedOut, navigate]);

  return (
    <Modal show={toggle} onHide={Toggle} animation={true}>
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

export default AdminLogout;
