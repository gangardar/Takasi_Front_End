import React, { useState } from "react";
import AdminSideBar from "../components/admin-panel/AdminSideBar";
import NavAdmin from "../components/admin-panel/NavAdmin";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
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

export default AdminPage;
