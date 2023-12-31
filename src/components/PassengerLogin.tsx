import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import useLoginPassenger from "../services/queries/useLoginPassenger";
import ErrorModal from "./error_handling/ErrorModal";
import AuthContext from "../services/contexts/authContext";
import useRetrieveUser from "../services/queries/useRetrieveUser";

const schema = z.object({
  email: z.string().email({
    message: "Invalid email. Please enter a valid email address",
  }),
  password: z.string().min(8),
});

export type PassengerLogin = z.infer<typeof schema>;

const PassengerLogin = () => {
  const { authResponse, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginPassenger = useLoginPassenger();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PassengerLogin>({ resolver: zodResolver(schema) });

  const retrieved = useRetrieveUser(); // Create an instance of useRetrieveUser hook

  useEffect(() => {
    // This is the correct place to handle the response from the login API
    if (loginPassenger.isSuccess) {
      // Call the useRetrieveUser hook with an empty string (or appropriate API token)
      retrieved.mutate("");
    }
  }, [loginPassenger.isSuccess]);

  useEffect(() => {
    // Handle the success response from the useRetrieveUser hook
    if (retrieved.isSuccess) {
      const data = retrieved.data; // Access the data returned by useRetrieveUser
      const user = data.user;
      dispatch({
        type: "LOGIN",
        payload: {
          isAuthenticated: true,
          user: user,
          role: user?.role,
        },
      });
    }
  }, [retrieved.isSuccess, retrieved.data]);

  useEffect(() => {
    if (authResponse.isAuthenticated) {
      console.log("authentication", authResponse);
      localStorage.setItem("authData", JSON.stringify(authResponse));
      navigate("/passenger-dashboard");
    }
  }, [authResponse.isAuthenticated]);

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
          {loginPassenger.data && <ErrorModal {...loginPassenger.data} />}
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
        <div className="d-flex justify-content-end">
          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-success "
          >
            Submit
          </button>
        </div>
        <Link to={"/passenger-register"} className="nav-link">
          Create New Account
        </Link>
      </form>
    </div>
  );
};

export default PassengerLogin;
