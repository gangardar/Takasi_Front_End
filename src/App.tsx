import { useEffect } from "react";
import PassengerRegPage from "./pages/authentications/PassengerRegPage";
import DriverReg from "./pages/authentications/DriverReg";

let darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

function App() {
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
      <DriverReg />
    </>
  );
}

export default App;
