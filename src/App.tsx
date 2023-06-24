import { useEffect } from "react";
import PassengerReg from "./assets/components/PassengerReg";
import NavBar from "./assets/components/NavBar";

function App() {
  useEffect(() => {
    let darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
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
      <PassengerReg />
    </>
  );
}

export default App;
