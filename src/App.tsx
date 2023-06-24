import { useEffect } from "react";
import PassengerRegPage from "./assets/pages/authentications/PassengerRegPage";
import PassengerLoginPage from "./assets/pages/authentications/PassengerLoginPage";

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
      <PassengerLoginPage />
    </>
  );
}

export default App;
