import React, { useContext, useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import NavAdmin from "./NavAdmin";
import AuthContext from "../../services/contexts/authContext";

const Layout = () => {
  const { authResponse } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authResponse.isAuthenticated) {
      const role = authResponse.role;
      if (role != "admin") {
        navigate("/");
      }
    }
  }, [authResponse.isAuthenticated]);

  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="container-fluid bg-dark min-vh-100 position-fixed">
      <div className="row g-0">
        {toggle && (
          <div className="col-2 bg-body-tertiary">
            <AdminSideBar />
          </div>
        )}
        <div className="col">
          <NavAdmin Toggle={Toggle} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
