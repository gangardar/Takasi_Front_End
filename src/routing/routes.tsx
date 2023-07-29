import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PassengerLoginPage from "../pages/authentications/PassengerLoginPage";
import DriverLoginPage from "../pages/authentications/DriverLoginPage";
import PassengerRegPage from "../pages/authentications/PassengerRegPage";
import DriverReg from "../pages/authentications/DriverReg";
import ListPassenger from "../components/admin-panel/ListPassenger";
import PassengerMap from "../pages/booking/PassengerMap";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/passenger-login", element: <PassengerLoginPage /> },
  { path: "/driver-login", element: <DriverLoginPage /> },
  { path: "/driver-register", element: <DriverReg /> },
  { path: "/passenger-register", element: <PassengerRegPage /> },
  { path: "/list-passenger", element: <ListPassenger /> },
  { path: "/passenger-dashboard", element: <PassengerMap /> },
]);

export default router;
