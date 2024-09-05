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

      setAuth((prev) => {
        return { ...prev, accessToken: response.data.accessToken };
      });
      return response.data.accessToken;

    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
