import { useContext, useEffect } from "react";
import AuthContext from "../auth/AuthPovider";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../../api/axiosConfig";

const useAxios = () => {
  const refresh = useRefreshToken();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const authInterceptor = axiosPrivate.interceptors.request.use(
      async (request) => {
        // await refresh();
        return request;

      },
      (error) => Promise.reject(error),
    );

    return () => {
      axiosPrivate.interceptors.request.eject(authInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxios;
