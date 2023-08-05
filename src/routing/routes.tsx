import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PassengerLoginPage from "../pages/authentications/PassengerLoginPage";
import DriverLoginPage from "../pages/authentications/DriverLoginPage";
import PassengerRegPage from "../pages/authentications/PassengerRegPage";
import DriverReg from "../pages/authentications/DriverReg";
import ListPassenger from "../components/admin-panel/ListPassenger";
import PassengerMap from "../pages/booking/PassengerMap";
import ListDriver from "../components/admin-panel/ListDriver";
import AdminAuth from "../components/admin-panel/AdminLogin";
import AdminLogout from "../components/admin-panel/AdminLogout";
import Layout from "../components/admin-panel/Layout";
import NotFoundPage from "../components/error_handling/NotFoundPage";
import DriverBikeDetails from "../components/driver_registration/DriverBikeDetails";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/passenger-login", element: <PassengerLoginPage /> },
  { path: "/driver-login", element: <DriverLoginPage /> },
  { path: "/driver-register", element: <DriverReg /> },
  { path: "/passenger-register", element: <PassengerRegPage /> },
  { path: "/passenger-dashboard", element: <PassengerMap /> },
  {
    path: "/driver-bike",
    element: <DriverBikeDetails onSubmit={(data) => console.log(data)} />,
  },
  {
    path: "/admin",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        path: "/admin/list-passenger",
        element: <ListPassenger />,
      },
      { path: "/admin/list-driver", element: <ListDriver /> },
      { path: "/admin/admin-login", element: <AdminAuth /> },
      { path: "/admin/admin-logout", element: <AdminLogout /> },
    ],
  },
]);

export default router;
