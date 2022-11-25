import {Navigate, Outlet} from "react-router-dom";
export const AuthRoute = () => {
  const token = localStorage.getItem("TOKEN");
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
