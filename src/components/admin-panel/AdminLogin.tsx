import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useLoginAdmin from "../../services/queries/useLoginAdmin";
import ErrorModal from "../error_handling/ErrorModal";
import useRetrieveUser from "../../services/queries/useRetrieveUser";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../services/contexts/authContext";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({
    message: "Invalid email. Please enter a valid email address",
  }),
  password: z.string().min(8),
});

export type AdminLogin = z.infer<typeof schema>;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { authResponse, dispatch } = useContext(AuthContext);
  const [hasBeenAuthenticated, setHasBeenAuthenticated] = useState(
    authResponse.isAuthenticated
  );

  const loginAdmin = useLoginAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AdminLogin>({ resolver: zodResolver(schema) });

  const retrieved = useRetrieveUser(); // Create an instance of useRetrieveUser hook

  useEffect(() => {
    // This is the correct place to handle the response from the login API
    if (loginAdmin.isSuccess) {
      // Call the useRetrieveUser hook with an empty string (or appropriate API token)
      retrieved.mutate("");
    }
  }, [loginAdmin.isSuccess]);

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
      navigate("/admin");
    }
  }, [authResponse.isAuthenticated]);

  useEffect(() => {
    if (authResponse.isAuthenticated && hasBeenAuthenticated) {
      navigate("/admin/admin-logout");
    }
  }, [hasBeenAuthenticated]);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#e1f5fe" }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          loginAdmin.mutate({
            email: data.email,
            password: data.password,
          });
        })}
        className="p-4 bg-white rounded shadow"
        style={{ width: "55vw", marginBottom: "9rem", background: "#e1f5fe" }}
      >
        <div className="mb-3">
          {loginAdmin.error && <ErrorModal {...loginAdmin.error} />}
          <label htmlFor="email" className="form-label">
            User Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="form-control"
            id="email"
            placeholder="ex@example.com"
          />
          {errors.email && (
            <p className="text-warning">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Enter Your Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-warning">{errors.password.message}</p>
          )}
        </div>
        <div className="d-flex justify-content-end mt-4">
          <button disabled={!isValid} type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
