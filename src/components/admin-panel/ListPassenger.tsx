import usePassengers from "../../services/queries/usePassengers";
import { useEffect, useState } from "react";
import PassengerAdminModal from "../PassengerAdminModal";
import setCSRFCookie from "../../services/csrf-Token";

const ListPassenger = () => {
  useEffect(() => {
    setCSRFCookie();
  }, []);
  const [selectedPassenger, setSelectedPassenger] = useState<any>();
  const [userId, setUserId] = useState<number>();
  const { data, error, isLoading } = usePassengers();

  if (error) return <p>{error.message}</p>;

  if (isLoading)
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    );

  return (
    <div>
      <select
        onChange={(event) => setUserId(parseInt(event.target.value))}
        className="form-select mb-3"
      >
        <option value="">Select Passenger</option>
        {Array.isArray(data) &&
          data.map((passenger) => (
            <option key={passenger.id} value={passenger.id}>
              {passenger.email}
            </option>
          ))}
      </select>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Location</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          {userId
            ? data
                .filter((passenger) => passenger.id === userId)
                .map((passenger) => (
                  <tr key={passenger.id}>
                    <th scope="row">{passenger.id}</th>
                    <td>{passenger.name}</td>
                    <td>{passenger.phone}</td>
                    <td>{passenger.email}</td>
                    <td>
                      <i className="bi bi-map"></i>
                    </td>
                    <th scope="row">
                      <button className="btn btn-danger">Delete</button>
                    </th>
                    <th scope="row">Update</th>
                  </tr>
                ))
            : data.map((passenger) => (
                <tr key={passenger.id}>
                  <th scope="row">{passenger.id}</th>
                  <td>{passenger.name}</td>
                  <td>{passenger.phone}</td>
                  <td>{passenger.email}</td>
                  <td>
                    <i className="bi bi-map"></i>
                  </td>
                  <th scope="row">
                    <button
                      onClick={() => {
                        setSelectedPassenger(passenger);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </th>
                  <th scope="row">Update</th>
                </tr>
              ))}
        </tbody>
      </table>
      <div>{<PassengerAdminModal passenger={selectedPassenger} />}</div>
    </div>
  );
};

export default ListPassenger;
