import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useLoginPassenger from "../services/queries/useLoginPassenger";
import setCSRFCookie from "../services/csrf-Token";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";

const schema = z.object({
  email: z.string().email({
    message: "Invalid email. Please enter a valid email address",
  }),
  password: z.string().min(8),
});

export type PassengerLogin = z.infer<typeof schema>;

const PassengerLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setCSRFCookie();
  }, []);
  const loginPassenger = useLoginPassenger();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PassengerLogin>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (loginPassenger.isSuccess) navigate("/passenger-dashboard");
  }, [loginPassenger.isSuccess]);

  const onSubmit = (data: PassengerLogin) => {
    loginPassenger.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "70vw" }}>
        <div className="form-group mb-3">
          {loginPassenger.error && <ErrorModal {...loginPassenger.error} />}
          <label className="form-lable">User Email</label>
          <input
            {...register("email")}
            type="email"
            className="form-control"
            placeholder="ex@example.com"
          />
          {errors.email && (
            <p className="text-warinig">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group mb-3">
          <label className="form-lable">Enter Your Password</label>
          <input
            {...register("password")}
            type="password"
            className="form-control mx-sm-3"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-warning">{errors.password.message}</p>
          )}
        </div>
        <div className="d-flex justify-content-end p-5">
          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-success btn-lg "
          >
            Submit
          </button>
        </div>
        <Link to={"/passenger-register"}>Create New Account</Link>
      </form>
    </div>
  );
};

export default PassengerLogin;
