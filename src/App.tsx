import { useEffect } from "react";
import DriverReg from "./pages/authentications/DriverReg";
import NavBar from "./components/NavBar";
import ListDriver from "./components/admin-panel/ListDriver";

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
      <NavBar />
      <ListDriver />
    </>
  );
}

export default App;
