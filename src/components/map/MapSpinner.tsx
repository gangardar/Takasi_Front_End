import Spinner from "react-bootstrap/Spinner";

const MapSpinner = () => {
  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle">
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="primary" />
      </div>
    </>
  );
};

export default MapSpinner;
