import useDriver from "../../services/queries/useDriver";
import { useState } from "react";

const ListDriver = () => {
  const [userId, setUserId] = useState<number>();
  const { data, error, isLoading } = useDriver();

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
        <option value="">Select user</option>
        {Array.isArray(data) &&
          data.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
      </select>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Profile</th>
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
                .filter((user) => user.id === userId)
                .map((user) => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>
                      <img
                        src={user.photo}
                        className="rounded-circle shadow-4"
                        style={{ width: "150px" }}
                        alt="Avatar"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                      <i className="bi bi-map"></i>
                    </td>
                    <th scope="row">
                      <button className="btn btn-danger">Delete</button>
                    </th>
                    <th scope="row">
                      <button className="btn btn-success">Update</button>
                    </th>
                  </tr>
                ))
            : data.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>
                    <img
                      src={user.photo}
                      className="rounded-circle shadow-4"
                      style={{ width: "50px" }}
                      alt="Avatar"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <i className="bi bi-map"></i>
                  </td>
                  <th scope="row">
                    <button className="btn btn-danger">Delete</button>
                  </th>
                  <th scope="row">
                    <button className="btn btn-success">Update</button>
                  </th>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDriver;
