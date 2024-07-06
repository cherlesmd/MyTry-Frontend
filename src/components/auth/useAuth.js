import { useContext } from "react";
import AuthContext from "./AuthPovider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
