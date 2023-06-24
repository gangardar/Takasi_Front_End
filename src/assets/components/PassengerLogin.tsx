const PassengerLogin = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <form style={{ width: "70vw" }}>
        <div className="form-group mb-3">
          <label className="form-lable">User Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="ex@example.com"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-lable">Enter Your Password</label>
          <input
            type="password"
            className="form-control mx-sm-3"
            placeholder="Password"
          />
        </div>
        <div className="d-flex justify-content-end p-5">
          <button type="submit" className="btn btn-success btn-lg ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassengerLogin;
