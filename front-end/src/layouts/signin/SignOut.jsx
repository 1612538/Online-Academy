import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const SignOut = () => {
  useEffect(() => {
    localStorage.removeItem("iduser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  }, []);
  return <Redirect to="/"></Redirect>;
};

export default SignOut;
