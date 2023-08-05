import { Dispatch } from "react";
import { AuthAction, AuthState } from "../reducers/authReducer";
import React from "react";

interface AuthContextType {
  authResponse: AuthState;
  dispatch: Dispatch<AuthAction>;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
