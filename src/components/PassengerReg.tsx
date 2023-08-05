import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCreatePassenger from "../services/queries/useCreatePassenger";
import setCSRFCookie from "../services/csrf-Token";
import { useEffect } from "react";
import useGeoLocation from "../services/hook/useGeoLocation";
import { Link } from "react-router-dom";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const schema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(4, { message: "The username must be 4 characters or more" })
    .max(50, { message: "Some thing is wrong" })
    .regex(
      /^[a-zA-Z ]+$/,
      "The username must contain only letters, numbers and underscore (_)"
    ),
  phone: z
    .string()
    .min(4, { message: "Please Enter a Phone Number Valid one" }),
  photo: z.string().optional(),
  age: z.number(),
  status: z.string().optional(),
  email: z.string().email({
    message: "Invalid email. Please enter a valid email address",
  }),
  password: z.string(),
  current_latitude: z.string().optional(),
  current_longitude: z.string().optional(),
});

export type PassengerFormData = z.infer<typeof schema>;

function PassengerReg() {
  const location = useGeoLocation();
  const createPassenger = useCreatePassenger();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PassengerFormData>({ resolver: zodResolver(schema) });

  return (
    <>
      <p className="h3 text-center text-info">Passenger Registeration</p>
      {createPassenger.error && (
        <div className="alert alert-danger">
          {createPassenger.error.message}
        </div>
      )}
      <form
        onSubmit={handleSubmit((data) => {
          createPassenger.mutate({
            name: data.name,
            phone: data.phone,
            age: data.age,
            status: "active",
            email: data.email,
            password: data.password,
            current_latitude: location.lat,
            current_longitude: location.long,
          });
          reset();
        })}
        className="m-4"
      >
        <div className="mb-3">
          <input
            className="form-control"
            {...register("name")}
            id="name"
            type="text"
            placeholder="Enter Your Name"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            {...register("phone")}
            id="phone"
            type="text"
            placeholder="Enter Your Phone"
          />
          {errors.phone && (
            <p className="text-danger">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            {...register("age", { valueAsNumber: true })}
            id="age"
            type="text"
            placeholder="Your Age"
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            {...register("email")}
            id="email"
            type="email"
            placeholder="Your Email Address"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            {...register("password")}
            id="password"
            type="password"
            placeholder="Please Enter Strong Password"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary btn">
            Submit
          </button>
        </div>
        <div>
          <Link to={"/passenger-login"} className="nav-link text-primary">
            Already have a account. <b>Login</b>
          </Link>
        </div>
      </form>
    </>
  );
}

export default PassengerReg;
