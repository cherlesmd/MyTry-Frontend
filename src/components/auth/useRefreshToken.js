import AuthContext from "../auth/AuthPovider";
import { axiosInstance } from "../../api/axiosConfig";
import { useContext } from "react";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/auth/refresh-token",
      });

      setAuth(true);

    } catch (error) {
      console.log(error);
      localStorage.clear();
      setAuth({});
    }
  };

  return refresh;
};

export default useRefreshToken;
