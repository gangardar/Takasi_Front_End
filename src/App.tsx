import { useEffect } from "react";
import DriverReg from "./pages/authentications/DriverReg";
import NavBar from "./components/NavBar";
import ListDriver from "./components/admin-panel/ListDriver";
import PassengerMap from "./pages/booking/PassengerMap";
import PassengerRegPage from "./pages/authentications/PassengerRegPage";
import PassengerLoginPage from "./pages/authentications/PassengerLoginPage";
import ListPassenger from "./components/admin-panel/ListPassenger";
import axios from "axios";

let darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

function App() {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (darkThemeMq.matches) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
    console.log(darkThemeMq);
  }, []);

  return (
    <>
      <PassengerRegPage />
    </>
  );
}

export default App;
