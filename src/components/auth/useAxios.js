import { useContext, useEffect } from "react";
import AuthContext from "../auth/AuthPovider";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../../api/axiosConfig";

const useAxios = () => {
  const refresh = useRefreshToken();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const authInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer: ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const refreshInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;

        if (error.response.status === 403 && !originalRequest?.sent) {
          originalRequest.sent = true;
          const accessToken = await refresh();
          originalRequest.headers.Authorization = `Bearer: ${accessToken}`;
          return axiosPrivate(originalRequest);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(authInterceptor);
      axiosPrivate.interceptors.response.eject(refreshInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxios;
