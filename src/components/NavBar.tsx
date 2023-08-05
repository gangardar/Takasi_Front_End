import { Link } from "react-router-dom";
import logo from "../images/periscope.webp";

function NavBar() {
  let theme = document.documentElement;
  return (
    <>
      <nav className="d-flex bg-secondary justify-content-between mb-3">
        <picture className="my-auto ms-3">
          <Link to={"/"}>
            <img className="logo" src={logo} />
          </Link>
        </picture>
        <div className="my-auto mx-2">
          <svg
            onClick={() => {
              if (theme.getAttribute("data-bs-theme") === "dark") {
                theme.setAttribute("data-bs-theme", "light");
              } else {
                theme.setAttribute("data-bs-theme", "dark");
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            id="logo"
            width="2em"
            height="3em"
            viewBox="0 0 36 36"
          >
            <path
              fill="currentColor"
              d="M29.2 26.72a12.07 12.07 0 0 1-6.3-22.28A13.68 13.68 0 0 0 19.49 4a14 14 0 0 0 0 28a13.82 13.82 0 0 0 10.9-5.34a11.71 11.71 0 0 1-1.19.06Z"
              className="clr-i-solid clr-i-solid-path-1"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
