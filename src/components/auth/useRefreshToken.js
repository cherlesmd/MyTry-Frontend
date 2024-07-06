import useAuth from "./useAuth";
import api from "../../api";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth;

  const refresh = async () => {
    const response = await api.post("auth/refresh-token", {
      headers: { Authorization: `Bearer ${auth.refreshToken}` },
    });

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
