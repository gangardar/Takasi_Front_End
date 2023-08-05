export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  role: string;
}

interface LoginUser {
  type: "LOGIN";
  payload: AuthState;
}

interface LogoutUser {
  type: "LOGOUT";
}

export type AuthAction = LoginUser | LogoutUser;

const authReducer = (
  authResponse: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      const user = action.payload.user;
      return {
        ...authResponse,
        isAuthenticated: true,
        user: user,
        role: user?.role,
      };
    case "LOGOUT":
      return { ...authResponse, isAuthenticated: false, user: null, role: "" };
    default:
      return authResponse;
  }
};

export default authReducer;
