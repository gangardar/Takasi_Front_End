import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import setCSRFCookie from "../services/csrf-Token";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import useLoginDriver from "../services/queries/useLoginDriver";

const schema = z.object({
  email: z.string().email({
    message: "Invalid email. Please enter a valid email address",
  }),
  password: z.string().min(8),
});

export type DriverLogin = z.infer<typeof schema>;

const DriverLogin = () => {
  useEffect(() => {
    setCSRFCookie();
  }, []);
  const loginDriver = useLoginDriver();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DriverLogin>({ resolver: zodResolver(schema) });

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          loginDriver.mutate({
            email: data.email,
            password: data.password,
          });
        })}
        style={{ width: "70vw" }}
      >
        <div className="form-group mb-3">
          {loginDriver.error && <ErrorModal {...loginDriver.error} />}
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
          <Link to={"/driver-register"}>Register New Driver</Link>
        </div>
      </form>
    </div>
  );
};

export default DriverLogin;
