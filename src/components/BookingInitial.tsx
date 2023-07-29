import React from "react";

const BookingInitial = () => {
  return (
    <>
      <div className="position-absolute top-0 end-0 me-2 mt-3 ">
        <div className="ms-2 font-monospace fw-bold fs-2  text-grey">
          <p className="$indigo">Takasi</p>
        </div>
      </div>
      <div className="fixed-bottom jumbotron">
        <div className="opacity-75 bg-white mb-3 border border-3 border-primary rounded mx-2">
          <div className="container-md g-3">
            <div className="row col-md-9 px-2">
              <label
                htmlFor="inputFrom"
                className="col-sm-2 col-form-label form-label"
              >
                From :
              </label>
              <input
                type="text"
                id="inputFrom"
                placeholder="Enter Your Stat Point..."
                className="form-control"
              />
            </div>
            <div className="row col-md-9 px-2 mb-3">
              <label
                htmlFor="inputTo"
                className="col-sm-2 col-form-label form-label"
              >
                To :
              </label>
              <input
                type="text"
                id="inputTo"
                placeholder="Enter Your Destination..."
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingInitial;
