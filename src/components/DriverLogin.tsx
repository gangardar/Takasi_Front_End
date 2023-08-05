import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorModal from "./error_handling/ErrorModal";
import useLoginDriver from "../services/queries/useLoginDriver";
import useRetrieveUser from "../services/queries/useRetrieveUser";
import AuthContext from "../services/contexts/authContext";

const schema = z.object({
  email: z.string().email({
    message: "Invalid email. Please enter a valid email address",
  }),
  password: z.string().min(8),
});
export type DriverLogin = z.infer<typeof schema>;

const DriverLogin = () => {
  const { authResponse, dispatch } = useContext(AuthContext);
  const loginDriver = useLoginDriver();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DriverLogin>({ resolver: zodResolver(schema) });

  const retrieved = useRetrieveUser(); // Create an instance of useRetrieveUser hook

  useEffect(() => {
    // This is the correct place to handle the response from the login API
    if (loginDriver.isSuccess) {
      // Call the useRetrieveUser hook with an empty string (or appropriate API token)
      retrieved.mutate("");
    }
  }, [loginDriver.isSuccess]);

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

  if (authResponse.isAuthenticated) {
    console.log("authentication", authResponse);
    localStorage.setItem("authData", JSON.stringify(authResponse));
  }

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
        style={{ width: "70vw", marginBottom: "9rem" }}
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
        <div className="d-flex justify-content-end">
          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-success "
          >
            Submit
          </button>
        </div>
        <Link to={"/driver-register"}>Register New Driver</Link>
      </form>
    </div>
  );
};

export default DriverLogin;
