import {Navigate, Outlet} from "react-router-dom";
export const PrivateRoute = () => {
  const token = localStorage.getItem("TOKEN");
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};
