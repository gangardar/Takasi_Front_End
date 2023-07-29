import NavBar from "../components/NavBar";
import passenger from "../images/passenger.jpg";
import driver from "../images/driver.webp";
import { Link } from "react-router-dom";
import { useState } from "react";

const HomePage: React.FC = () => {
  const backgroundImageStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "40vh",
    width: "100%",
  };

  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <div className="vh-100" style={{ overflow: "hidden" }}>
      <NavBar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div
              className="position-relative rounded"
              style={{
                ...backgroundImageStyle,
                backgroundImage: `url(${passenger})`,
              }}
            >
              <div className="position-absolute bottom-0 end-0 mb-3 me-3">
                <Link to={"/passenger-login"} className="btn btn-info btn-lg">
                  Login as Passenger
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="position-relative rounded"
              style={{
                ...backgroundImageStyle,
                backgroundImage: `url(${driver})`,
              }}
            >
              <div className="position-absolute bottom-0 end-0 mb-3 me-3">
                <Link to={"/driver-login"} className="btn btn-dark btn-lg">
                  Login as Driver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div
          className="modal modal-dialog-centered"
          tabIndex={-1}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Welcome to Takasi</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  We're delighted to have you on board with us! At Takasi, we
                  strive to provide you with a seamless and convenient taxi
                  hailing experience like no other. Whether you're heading to
                  work, meeting friends, or exploring new places, our dedicated
                  team is here to ensure you reach your destination safely and
                  comfortably.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCloseModal}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
