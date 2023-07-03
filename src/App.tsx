import { useEffect } from "react";
import PassengerRegPage from "./pages/authentications/PassengerRegPage";

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
      <PassengerRegPage />
    </>
  );
}

export default App;
